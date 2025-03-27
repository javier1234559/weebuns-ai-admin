import { useState, useId } from "react";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import uploadApi from "@/services/upload/uploadApi";
import { toast } from "sonner";
import WaveAudio from "@/components/feature/WaveAudio";

interface UploadAudioProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

const UploadAudio = ({ value, onChange }: UploadAudioProps) => {
  const uploadId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(value);

  const handleDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        setIsUploading(true);
        const result = await uploadApi.uploadFile(file);
        const url = result.data.appUrl;
        setAudioUrl(url);
        onChange(url);
        toast.success("Audio uploaded successfully");
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload audio");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".ogg"],
    },
    maxFiles: 1,
    onDrop: handleDrop,
    onError: (error) => {
      console.log("Error:", error);
      toast.error("Invalid audio file");
    },
  });

  const handleRemove = async () => {
    if (!value) {
      setAudioUrl(null);
      onChange(null);
      return;
    }

    try {
      setIsUploading(true);
      const key = value.split("/").pop();
      if (key) await uploadApi.deleteFile(key);
      setAudioUrl(null);
      onChange(null);
      toast.success("Audio removed successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to remove audio");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      {...getRootProps()}
      id={`upload-audio-container-${uploadId}`}
      className="border-dashed border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors"
    >
      <input {...getInputProps()} id={`upload-audio-input-${uploadId}`} />
      {audioUrl ? (
        <div
          className="relative w-full flex items-center justify-center wave-audio-container"
          onClick={(e) => e.stopPropagation()}
        >
          <WaveAudio audioUrl={audioUrl} onDelete={handleRemove} />
        </div>
      ) : (
        <div className="flex flex-col items-center p-6">
          <UploadCloud size={40} className="text-gray-500 mb-2" />
          <p className="text-sm text-gray-500">
            {isUploading
              ? "Uploading..."
              : "Drag & drop or click to upload audio"}
          </p>
          <p className="text-xs text-gray-400 mt-1">Supports MP3, WAV, OGG</p>
        </div>
      )}
    </div>
  );
};

export default UploadAudio;
