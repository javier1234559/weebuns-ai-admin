import { useState, useCallback, useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { UploadCloud, X } from "lucide-react";
import Cropper, { Area } from "react-easy-crop";
import { useDropzone } from "react-dropzone";
import uploadApi from "@/services/upload/uploadApi";
import { toast } from "sonner";

const BANKING_QR_WIDTH = 500;
const BANKING_QR_HEIGHT = 500;
const ASPECT_RATIO = BANKING_QR_WIDTH / BANKING_QR_HEIGHT;

interface UploadImageProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = BANKING_QR_WIDTH;
  canvas.height = BANKING_QR_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not found");
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    BANKING_QR_WIDTH,
    BANKING_QR_HEIGHT,
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => blob && resolve(blob), "image/jpeg");
  });
};

const UploadBankingImage = ({ value, onChange }: UploadImageProps) => {
  const uploadId = useId();
  const [preview, setPreview] = useState<string | null>(value);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: handleDrop,
    onError: (error) => {
      console.log("Error:", error);
    },
  });

  const handleRemove = async () => {
    if (!value) {
      setPreview(null);
      onChange(null);
      return;
    }

    try {
      setIsUploading(true);
      const key = value.split("/").pop();
      if (key) await uploadApi.deleteFile(key);
      setPreview(null);
      onChange(null);
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to remove image");
    } finally {
      setPreview(null);
      setIsUploading(false);
    }
  };

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCropConfirm = useCallback(async () => {
    if (preview && croppedAreaPixels) {
      try {
        setIsUploading(true);
        const croppedImage = await getCroppedImg(preview, croppedAreaPixels);

        // Generate filename with formatted date and time
        const now = new Date();
        const formattedDate = now
          .toISOString()
          .slice(0, 19)
          .replace(/[T]/g, "-")
          .replace(/[:]/g, "-");
        const uniqueFilename = `banking-qr-${formattedDate}.jpg`;

        const file = new File([croppedImage], uniqueFilename, {
          type: "image/jpeg",
        });
        const result = await uploadApi.uploadFile(file);
        const imageUrl = result.data.appUrl;
        setPreview(imageUrl);
        onChange(imageUrl);
        setIsDialogOpen(false);
        toast.success("QR code uploaded successfully");
      } catch (error) {
        console.error("Failed to crop/upload:", error);
        toast.error("Failed to process QR code");
      } finally {
        setIsUploading(false);
      }
    }
  }, [preview, croppedAreaPixels, onChange]);

  return (
    <div
      {...getRootProps()}
      id={`upload-banking-image-container-${uploadId}`}
      className="border-dashed w-[500px] h-[500px] border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input
        {...getInputProps()}
        id={`upload-banking-image-input-${uploadId}`}
      />
      {preview ? (
        <div
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={preview}
            alt="Banking QR Preview"
            className="w-full h-full object-contain"
          />
          <Button
            variant="destructive"
            size="icon"
            type="button"
            className="absolute top-2 right-2 p-1"
            onClick={handleRemove}
          >
            <X />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <UploadCloud size={64} className="text-gray-500 mb-4" />
          <p className="text-lg text-gray-500">
            Drag & drop or click to upload QR code
          </p>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle className="sr-only">Crop QR Code</DialogTitle>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <div className="relative h-[500px]">
            {preview && (
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={ASPECT_RATIO}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(val) => setZoom(val[0])}
          />
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCropConfirm} disabled={isUploading}>
              {isUploading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadBankingImage;
