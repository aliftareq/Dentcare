/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { http } from "@/lib/http";

interface ImageUploadProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  imageLoadingState: boolean;
  setUploadedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setImageLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUpload = ({
  imageFile,
  setImageFile,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }

    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedImageUrl("");

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  async function uploadImageToCloudinary(file: File) {
    setImageLoadingState(true);

    const data = new FormData();
    data.append("my_file", file);

    try {
      const response = await http.post("/api/upload-image", data);

      if (response?.data?.success) {
        setUploadedImageUrl(
          response.data.result.secure_url || response.data.result.url || ""
        );
      } else {
        setUploadedImageUrl("");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploadedImageUrl("");
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const localPreviewUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(localPreviewUrl);

    return () => {
      URL.revokeObjectURL(localPreviewUrl);
    };
  }, [imageFile]);

  useEffect(() => {
    if (!imageFile) return;
    uploadImageToCloudinary(imageFile);
  }, [imageFile]);

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20">
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageChange}
          accept="image/*"
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-dashed bg-muted/30 transition hover:bg-muted/50"
          >
            <UploadCloudIcon className="h-6 w-6 text-muted-foreground" />
          </Label>
        ) : imageLoadingState ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed bg-muted/30 p-2">
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200" />
          </div>
        ) : (
          <>
            <div className="h-20 w-20 overflow-hidden rounded-md border-2 border-dashed bg-muted/30">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 z-10 h-5 w-5 rounded-full bg-black/70 p-0 text-white hover:bg-black/80 hover:text-white"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-3 w-3" />
              <span className="sr-only">Remove File</span>
            </Button>
          </>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">Image</p>
        <p className="text-xs text-muted-foreground">Click to upload image</p>
        {imageFile && !imageLoadingState ? (
          <p className="max-w-55 truncate text-xs text-muted-foreground">
            {imageFile.name}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUpload;