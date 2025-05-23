import { Edit2, Save, Download, ArrowRight, Clock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Textarea } from "@/components/_form/Textarea";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Skeleton } from "@/components/Skeleton";
import {
  useProject,
  useTranscription,
  useUpdateTranscription,
  useExportTranscription,
} from "@/hooks/api";
import { useToast } from "@/hooks/useToast";
import { formatDuration } from "@/lib/utils";

const TranscriptionReview = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading: projectLoading } = useProject(
    projectId || "",
  );
  const { data: transcription, isLoading: transcriptionLoading } =
    useTranscription(projectId || "");
  const updateTranscriptionMutation = useUpdateTranscription();
  const exportTranscriptionMutation = useExportTranscription();

  useEffect(() => {
    if (transcription) {
      setEditedText(transcription.text);
    }
  }, [transcription]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSaveTranscription = async () => {
    if (!projectId || !transcription) return;

    try {
      await updateTranscriptionMutation.mutateAsync({
        projectId,
        transcriptionData: {
          text: editedText,
        },
      });

      setIsEditing(false);
      toast({
        title: "Transcription saved",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save transcription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExportTranscription = async () => {
    if (!projectId) return;

    try {
      await exportTranscriptionMutation.mutateAsync({
        projectId,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export transcription. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    navigate(`/project/${projectId}/presenter-selection`);
  };

  const isLoading = projectLoading || transcriptionLoading;

  // Find the current segment based on video time
  const currentSegment = transcription?.timestamps.find(
    (segment) => currentTime >= segment.start && currentTime <= segment.end,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transcription Review</h1>
        <p className="mt-2 text-gray-500">
          Review and edit the transcription before generating your video
        </p>
      </div>

      {/* Render content based on loading and data state */}
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      )}

      {!isLoading && (!project || !transcription) && (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">
            Project or transcription not found
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            Return to Dashboard
          </Button>
        </div>
      )}

      {!isLoading && project && transcription && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Original Video</span>
                  {project.originalDuration && (
                    <div className="flex items-center text-sm font-normal text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {formatDuration(project.originalDuration)}
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Render video based on available sources */}
                {project.sourceUrl && (
                  <div className="aspect-video overflow-hidden rounded-lg bg-black">
                    <video
                      ref={videoRef}
                      src={project.sourceUrl}
                      controls
                      className="h-full w-full"
                      onTimeUpdate={handleTimeUpdate}
                    >
                      <track kind="captions" src="" label="English" />
                    </video>
                  </div>
                )}
                {!project.sourceUrl && project.sourceFile && (
                  <div className="aspect-video overflow-hidden rounded-lg bg-black">
                    <video
                      ref={videoRef}
                      src={project.sourceFile}
                      controls
                      className="h-full w-full"
                      onTimeUpdate={handleTimeUpdate}
                    >
                      <track kind="captions" src="" label="English" />
                    </video>
                  </div>
                )}
                {!project.sourceUrl && !project.sourceFile && (
                  <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
                    <p className="text-gray-500">Video preview not available</p>
                  </div>
                )}
              </CardContent>
              {currentSegment && (
                <CardFooter className="border-t bg-gray-50 p-4">
                  <div className="w-full">
                    <p className="mb-1 text-sm text-gray-500">
                      Current segment ({formatDuration(currentSegment.start)} -{" "}
                      {formatDuration(currentSegment.end)})
                    </p>
                    <p className="text-sm font-medium">
                      &quot;{currentSegment.text}&quot;
                    </p>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Transcription</CardTitle>
                <div className="flex gap-2">
                  {isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveTranscription}
                      disabled={updateTranscriptionMutation.isPending}
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportTranscription}
                        disabled={exportTranscriptionMutation.isPending}
                      >
                        <Download size={16} className="mr-2" />
                        Export
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="min-h-[300px]"
                  />
                ) : (
                  <div className="min-h-[300px] whitespace-pre-wrap rounded-lg bg-gray-50 p-4">
                    {transcription.text}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleContinue}>
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptionReview;
