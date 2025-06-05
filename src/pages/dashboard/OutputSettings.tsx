import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Label } from "@/components/_form/Label";
import { RadioGroup, RadioGroupItem } from "@/components/_form/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_form/Select";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Skeleton } from "@/components/Skeleton";
import { useProject, useUpdateProject } from "@/hooks/api";
import { useToast } from "@/hooks/useToast";
import { AspectRatio, AudioQuality, Resolution, VideoFormat } from "@/types";

const OutputSettings = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [resolution, setResolution] = useState<Resolution>("1080p");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [audioQuality, setAudioQuality] = useState<AudioQuality>("high");
  const [format, setFormat] = useState<VideoFormat>("MP4");

  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading } = useProject(projectId || "");
  const updateProjectMutation = useUpdateProject();

  // Initialize form with existing project settings if available
  useEffect(() => {
    if (project?.outputSettings) {
      setResolution(project.outputSettings.resolution);
      setAspectRatio(project.outputSettings.aspectRatio);
      setAudioQuality(project.outputSettings.audioQuality);
      setFormat(project.outputSettings.format);
    }
  }, [project]);

  const handleSaveAndGenerate = async () => {
    if (!projectId) return;

    try {
      // First save the output settings
      await updateProjectMutation.mutateAsync({
        id: projectId,
        data: {
          outputSettings: {
            resolution,
            aspectRatio,
            audioQuality,
            format,
          },
        },
      });

      toast({
        title: "Video generation started",
        description:
          "Your video is being generated. You will be notified when it's ready.",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start video generation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Output Settings</h1>
        <p className="mt-2 text-gray-500">
          Customize your video output settings
        </p>
      </div>

      {/* Render content based on loading and project state */}
      {isLoading && (
        <div className="mx-auto max-w-3xl space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      )}

      {!isLoading && !project && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">Project not found</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Return to Dashboard
          </Button>
        </div>
      )}

      {!isLoading && project && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Video Output Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base">Resolution</Label>
                <p className="mb-2 text-sm text-gray-500">
                  Select the resolution for your generated video
                </p>
                <RadioGroup
                  value={resolution}
                  onValueChange={(value) => setResolution(value as Resolution)}
                  className="flex gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="720p"
                      id="720p"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="720p"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-lg font-medium">720p</span>
                      <span className="text-xs text-gray-500">HD</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="1080p"
                      id="1080p"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="1080p"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-lg font-medium">1080p</span>
                      <span className="text-xs text-gray-500">Full HD</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="4K"
                      id="4k"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="4k"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span className="text-lg font-medium">4K</span>
                      <span className="text-xs text-gray-500">Ultra HD</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base">Aspect Ratio</Label>
                <p className="mb-2 text-sm text-gray-500">
                  Choose the aspect ratio that fits your needs
                </p>
                <RadioGroup
                  value={aspectRatio}
                  onValueChange={(value) =>
                    setAspectRatio(value as AspectRatio)
                  }
                  className="flex gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="16:9"
                      id="16:9"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="16:9"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-9 w-16 rounded bg-gray-200" />
                      <span className="text-sm font-medium">16:9</span>
                      <span className="text-xs text-gray-500">Landscape</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="9:16"
                      id="9:16"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="9:16"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-16 w-9 rounded bg-gray-200" />
                      <span className="text-sm font-medium">9:16</span>
                      <span className="text-xs text-gray-500">Portrait</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="1:1"
                      id="1:1"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="1:1"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 h-12 w-12 rounded bg-gray-200" />
                      <span className="text-sm font-medium">1:1</span>
                      <span className="text-xs text-gray-500">Square</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="4:5"
                      id="4:5"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="4:5"
                      className="border-muted hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="h-12.5 mb-2 w-10 rounded bg-gray-200" />
                      <span className="text-sm font-medium">4:5</span>
                      <span className="text-xs text-gray-500">Portrait</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="audio-quality" className="text-base">
                    Audio Quality
                  </Label>
                  <p className="mb-2 text-sm text-gray-500">
                    Select the audio quality for your video
                  </p>
                  <Select
                    value={audioQuality}
                    onValueChange={(value) =>
                      setAudioQuality(value as AudioQuality)
                    }
                  >
                    <SelectTrigger id="audio-quality">
                      <SelectValue placeholder="Select audio quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format" className="text-base">
                    Video Format
                  </Label>
                  <p className="mb-2 text-sm text-gray-500">
                    Choose the output format for your video
                  </p>
                  <Select
                    value={format}
                    onValueChange={(value) => setFormat(value as VideoFormat)}
                  >
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select video format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MP4">MP4</SelectItem>
                      <SelectItem value="MOV">MOV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleSaveAndGenerate}
                disabled={updateProjectMutation.isPending}
              >
                <Play size={16} className="mr-2" />
                Generate Video
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OutputSettings;
