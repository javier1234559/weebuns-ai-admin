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

const AVATAR_WIDTH = 100;
const AVATAR_HEIGHT = 100;
const ASPECT_RATIO = AVATAR_WIDTH / AVATAR_HEIGHT;

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
  canvas.width = AVATAR_WIDTH;
  canvas.height = AVATAR_HEIGHT;
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
    AVATAR_WIDTH,
    AVATAR_HEIGHT,
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => blob && resolve(blob), "image/jpeg");
  });
};

const UploadAvatarImage = ({ value, onChange }: UploadImageProps) => {
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
        const file = new File([croppedImage], "cropped-avatar.jpg", {
          type: "image/jpeg",
        });
        const result = await uploadApi.uploadFile(file);
        const imageUrl = result.data.appUrl;
        setPreview(imageUrl);
        onChange(imageUrl);
        setIsDialogOpen(false);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Failed to crop/upload:", error);
        toast.error("Failed to process image");
      } finally {
        setIsUploading(false);
      }
    }
  }, [preview, croppedAreaPixels, onChange]);

  return (
    <div
      {...getRootProps()}
      id={`upload-avatar-image-container-${uploadId}`}
      className="border-dashed size-28 border-2 border-gray-300 rounded-full p-1 cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input
        {...getInputProps()}
        id={`upload-avatar-image-input-${uploadId}`}
      />
      {preview ? (
        <div
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-full"
          />
          <Button
            variant="destructive"
            size="icon"
            type="button"
            className="absolute top-1 right-1 p-1 !size-6 rounded-full"
            onClick={handleRemove}
          >
            <X />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <UploadCloud size={40} className="text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">
            Drag & drop or click to upload
          </p>
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle className="sr-only">Crop Image</DialogTitle>
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <div className="relative h-64">
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

export default UploadAvatarImage;
