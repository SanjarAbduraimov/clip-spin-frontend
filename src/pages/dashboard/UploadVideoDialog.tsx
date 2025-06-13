import { UploadIcon } from "lucide-react";
import { useState, useRef, ChangeEvent } from "react";

import { Input } from "@/components/_form/Input/Input";
import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { useUploadProjectFile } from "@/hooks/api";
import { useToast } from "@/hooks/useToast";
import { Project } from "@/types";

export const UploadVideoDialog = ({
  project,
  button,
}: {
  project: Project;
  button: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const uploadFileMutation = useUploadProjectFile(project.id);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !project.id) return;

    setUploading(true);

    try {
      await uploadFileMutation.mutateAsync(selectedFile);

      toast({
        title: "Video uploaded",
        description: "The video has been uploaded successfully",
      });

      setOpen(false);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload the video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:bg-gray-50">
            <UploadIcon className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium">
              Drag and drop your video file here
            </p>
            <p className="mt-1 text-xs text-gray-500">or</p>
            <Button
              variant="outline"
              onClick={handleBrowseClick}
              className="mt-2"
            >
              Browse Files
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              className="hidden"
            />
          </div>
          {selectedFile && (
            <div className="rounded-md bg-gray-50 p-3">
              <p className="truncate text-sm font-medium">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleUpload} disabled={uploading || !selectedFile}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
