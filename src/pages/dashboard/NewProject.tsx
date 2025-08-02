import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { CircleAlert, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { projectSettingsService } from "@/modules/project/services/projectSettingsService";
import { useSubscriptionPlans } from "@/modules/subscription/hooks/useSubscription";
import { PurchaseCredits } from "@/modules/subscription/ui/PurchaseCredits";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { Input } from "@/components/_form/Input";
import { Alert, AlertDescription, AlertTitle } from "@/components/Alert";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/Tooltip";
import { useCreateProjectFromUrl } from "@/hooks/api";
import { useToast } from "@/hooks/useToast";
import { ProjectType } from "@/types";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  url: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        // Check for YouTube Shorts URLs
        const youtubeShortRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/|youtu\.be\/shorts\/)([a-zA-Z0-9_-]{11})(\/?)([?#].*)?$/;

        // Check for Instagram Reels URLs
        const instagramReelRegex =
          /^(https?:\/\/)?(www\.)?(instagram\.com\/reels?\/|instagram\.com\/reel\/)([a-zA-Z0-9_-]+)(\/?)([?#].*)?$/;

        // Check for TikTok URLs
        const tiktokRegex =
          /^(https?:\/\/)?(www\.)?(tiktok\.com\/@[\w.-]+\/video\/|vm\.tiktok\.com\/)([0-9]+)(\/?)([?#].*)?$/;

        return (
          youtubeShortRegex.test(url) ||
          instagramReelRegex.test(url) ||
          tiktokRegex.test(url)
        );
      },
      {
        message: "URL must be from YouTube Shorts, Instagram Reels, or TikTok",
      },
    ),
  type: z.enum([
    ProjectType.slide_show,
    ProjectType.text_audiogram,
    ProjectType.talking_head,
    ProjectType.professional,
  ]),
});

interface NewProjectProps {
  projectType: ProjectType;
}

const NewProject = ({ projectType }: NewProjectProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [createdProjectData, setCreatedProjectData] = useState<{
    name: string;
    type: ProjectType;
    id: string;
  } | null>(null);

  const { authenticated, user, invalidateUserSubscription } = useAuthContext();

  const createProjectMutation = useCreateProjectFromUrl();

  const { data: plans } = useSubscriptionPlans();
  const plan = plans?.[0];

  const nameRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const projectSettings = projectSettingsService.getFromLocalDb();

      return {
        name: projectSettings?.name || "",
        url: projectSettings?.sourceUrl || "",
        type: projectSettings?.type || ProjectType.slide_show,
      };
    },
  });

  const type = form.watch("type");

  useEffect(() => {
    form.setValue("type", projectType);
  }, [projectType]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { url, name } = values;

      if (!authenticated || !user) {
        const videoCreationURL = `/dashboard/ai-generation`;
        projectSettingsService.saveToLocalDb({
          name,
          sourceUrl: url,
          type: values.type,
        });
        navigate(`/auth/sign-in?redirect=${videoCreationURL}`);
        return;
      }

      const project = await createProjectMutation.mutateAsync({
        name,
        url,
        type,
      });

      await invalidateUserSubscription();

      // Set success state
      setProjectCreated(true);
      setCreatedProjectData({
        name,
        type,
        id: project._id,
      });

      form.reset();

      toast({
        title: "Project created",
        description:
          "Your project has been created and is being processed. You can check the progress in the recent projects section below.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error creating your project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSeeProgress = (id: string) => {
    navigate(`/project/${id}`);
  };

  const handleCreateAnother = () => {
    setProjectCreated(false);
    setCreatedProjectData(null);
    nameRef.current?.focus();
    form.reset();
  };

  const handleUpgradeClick = () => {
    if (!user?.subscription) {
      navigate("/pricing");
    } else {
      setOpen(true);
    }
  };

  return (
    <Card id="new-project">
      <CardHeader>
        <CardTitle asChild>
          <h1 className="flex items-center gap-2">
            Generate new video with AI
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sparkles-icon lucide-sparkles"
            >
              <defs>
                <linearGradient
                  id="aiGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>

                <linearGradient
                  id="strokeGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path
                fill="url(#aiGradient)"
                stroke="url(#strokeGradient)"
                strokeWidth="0.5"
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
              />
              <path stroke="#4f46e5" d="M20 3v4" />
              <path stroke="#4f46e5" d="M22 5h-4" />
              <path stroke="#7c3aed" d="M4 17v2" />
              <path stroke="#7c3aed" d="M5 18H3" />
            </svg>
          </h1>
        </CardTitle>
        <CardDescription>Enter a video URL to be inspired from</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Video" {...field} ref={nameRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    Video URL{" "}
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <QuestionMarkCircledIcon />
                      </TooltipTrigger>
                      <TooltipContent className="w-[200px]">
                        <div className="flex flex-col gap-2">
                          <p>What video URLs work?</p>
                          <p>
                            TikTok, YouTube Shorts, Instagram Reels (must be
                            public) Max input video length: 1 minutes
                          </p>
                          <p>
                            Why might it fail? Private videos, expired links, or
                            unsupported platforms Format tips: Paste full
                            shareable URL, not embed or shortened links
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Youtube Shorts, Instagram Reels, TikTok"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <div
                      className="flex flex-col gap-4 overflow-auto sm:flex-row"
                      role="radiogroup"
                    >
                      <div className="relative w-full md:min-w-[250px] md:max-w-[300px]">
                        <input
                          type="radio"
                          id="slide-show"
                          className="peer sr-only"
                          checked={field.value === ProjectType.slide_show}
                          onChange={() =>
                            field.onChange(ProjectType.slide_show)
                          }
                          value={ProjectType.slide_show}
                        />
                        <label
                          htmlFor="slide-show"
                          className="flex cursor-pointer flex-col items-start rounded-lg border p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
                        >
                          <div className="absolute right-2 top-8">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {plan?.prices[ProjectType.slide_show] || 0}{" "}
                              Credits
                            </span>
                          </div>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <rect width="18" height="14" x="3" y="3" rx="2" />
                              <line x1="3" x2="21" y1="9" y2="9" />
                            </svg>
                          </div>
                          <div className="">
                            <h3 className="flex items-center gap-1 text-lg font-medium">
                              Slide Show{" "}
                              <Tooltip>
                                <TooltipTrigger type="button">
                                  <QuestionMarkCircledIcon
                                    width={16}
                                    height={16}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="w-[200px]">
                                  An AI avatar delivers your script
                                  face-to-camera with clean visuals. Great for
                                  explainers, pitches, and intros.{" "}
                                  <a
                                    href="https://clipspin-api.qisqa.link/api/files/839ecd1a-ba37-480f-88be-cd7049b91978.mp4"
                                    target="_blank"
                                    className="text-primary"
                                    rel="noreferrer"
                                  >
                                    Example
                                  </a>
                                </TooltipContent>
                              </Tooltip>
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Create a video with animated slides
                            </p>
                          </div>
                          <div
                            className={`absolute right-2 top-2 h-4 w-4 rounded-full ${field.value === ProjectType.slide_show ? "bg-primary" : "border-muted border"}`}
                          />
                        </label>
                      </div>

                      <div className="relative w-full md:min-w-[250px] md:max-w-[300px]">
                        <input
                          type="radio"
                          id="text-audiogram"
                          className="peer sr-only"
                          checked={field.value === ProjectType.text_audiogram}
                          onChange={() =>
                            field.onChange(ProjectType.text_audiogram)
                          }
                          value={ProjectType.text_audiogram}
                        />
                        <label
                          htmlFor="text-audiogram"
                          className="flex cursor-pointer flex-col items-start rounded-lg border p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
                        >
                          <div className="absolute right-2 top-8">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {plan?.prices[ProjectType.text_audiogram] || 0}{" "}
                              Credits
                            </span>
                          </div>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="M17.5 22h.5c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" />
                              <polyline points="14 2 14 8 20 8" />
                              <path d="M10 20v-1a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0Z" />
                              <path d="M6 20v-1a2 2 0 1 0-4 0v1a2 2 0 1 0 4 0Z" />
                              <path d="M2 19v-3a6 6 0 0 1 12 0v3" />
                            </svg>
                          </div>
                          <div className="">
                            <h3 className="flex items-center gap-1 text-lg font-medium">
                              Text Audiogram{" "}
                              <Tooltip>
                                <TooltipTrigger type="button">
                                  <QuestionMarkCircledIcon
                                    width={16}
                                    height={16}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="w-[200px]">
                                  Fast-paced vertical videos with bold captions,
                                  emojis, and B-roll—perfect for Reels, Shorts,
                                  and TikToks.{" "}
                                  <a
                                    href="https://clipspin-api.qisqa.link/api/files/65efc9b8-5479-4ce6-b745-b9611d9b6b97 (2).mp4"
                                    target="_blank"
                                    className="text-primary"
                                    rel="noreferrer"
                                  >
                                    Example
                                  </a>
                                </TooltipContent>
                              </Tooltip>
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Create an audio-focused video with text
                            </p>
                          </div>
                          <div
                            className={`absolute right-2 top-2 h-4 w-4 rounded-full ${field.value === ProjectType.text_audiogram ? "bg-primary" : "border-muted border"}`}
                          />
                        </label>
                      </div>

                      <div className="relative w-full md:min-w-[250px] md:max-w-[300px]">
                        <input
                          type="radio"
                          id="talking-head"
                          className="peer sr-only"
                          checked={field.value === ProjectType.talking_head}
                          onChange={() =>
                            field.onChange(ProjectType.talking_head)
                          }
                          value={ProjectType.talking_head}
                        />
                        <label
                          htmlFor="talking-head"
                          className="flex cursor-pointer flex-col items-start rounded-lg border p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
                        >
                          <div className="absolute right-2 top-8">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {plan?.prices[ProjectType.talking_head] || 0}{" "}
                              Credits
                            </span>
                          </div>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <circle cx="12" cy="8" r="5" />
                              <path d="M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2" />
                            </svg>
                          </div>
                          <div className="">
                            <h3 className="flex items-center gap-1 text-lg font-medium">
                              Talking Head{" "}
                              <Tooltip>
                                <TooltipTrigger type="button">
                                  <QuestionMarkCircledIcon
                                    width={16}
                                    height={16}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="w-[200px]">
                                  Text-based motion videos with voiceover. Ideal
                                  for quotes, insights, and thought-leadership
                                  clips.{" "}
                                  <a
                                    href="https://clipspin-api.qisqa.link/api/files/ClipSpin Template 4.mp4"
                                    target="_blank"
                                    className="text-primary"
                                    rel="noreferrer"
                                  >
                                    Example
                                  </a>
                                </TooltipContent>
                              </Tooltip>
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Create a video with a presenter speaking directly
                              to camera
                            </p>
                          </div>
                          <div
                            className={`absolute right-2 top-2 h-4 w-4 rounded-full ${field.value === ProjectType.talking_head ? "bg-primary" : "border-muted border"}`}
                          />
                        </label>
                      </div>

                      <div className="relative w-full md:min-w-[250px] md:max-w-[300px]">
                        <input
                          type="radio"
                          id="professional"
                          className="peer sr-only"
                          checked={field.value === ProjectType.professional}
                          onChange={() =>
                            field.onChange(ProjectType.professional)
                          }
                          value={ProjectType.professional}
                        />
                        <label
                          htmlFor="professional"
                          className="flex cursor-pointer flex-col items-start rounded-lg border p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
                        >
                          <div className="absolute right-2 top-8">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {plan?.prices[ProjectType.professional] || 0}{" "}
                              Credits
                            </span>
                          </div>
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-primary"
                            >
                              <path d="m22 8-6 4 6 4V8Z" />
                              <rect
                                width="14"
                                height="12"
                                x="2"
                                y="6"
                                rx="2"
                                ry="2"
                              />
                            </svg>
                          </div>
                          <div className="">
                            <h3 className="text-lg font-medium">
                              Professional Editor{" "}
                              <Tooltip>
                                <TooltipTrigger type="button">
                                  <QuestionMarkCircledIcon
                                    width={16}
                                    height={16}
                                  />
                                </TooltipTrigger>
                                <TooltipContent className="w-[200px]">
                                  Create a high-quality professional video
                                  production{" "}
                                  <a
                                    href="https://api.app.clipspin.ai/api/files/professional-editor-example.mp4"
                                    target="_blank"
                                    className="text-primary"
                                    rel="noreferrer"
                                  >
                                    Example
                                  </a>
                                </TooltipContent>
                              </Tooltip>
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Create a high-quality professional video
                              production
                            </p>
                          </div>
                          <div
                            className={`absolute right-2 top-2 h-4 w-4 rounded-full ${field.value === ProjectType.professional ? "bg-primary" : "border-muted border"}`}
                          />
                        </label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {((user?.subscription &&
              plan?.prices[type] &&
              user.subscription?.total_credits < plan?.prices[type]) ||
              !user?.subscription) && (
              <Alert variant="destructive" className="flex items-start">
                <div className="mr-4">
                  <CircleAlert size={20} className="text-error" />
                </div>
                <div>
                  <AlertTitle>Not enough credits</AlertTitle>
                  <AlertDescription>
                    You don&apos;t have enough credits to create this project.
                    Please upgrade your subscription.
                  </AlertDescription>
                </div>
                <div className="ml-auto">
                  <Button
                    onClick={handleUpgradeClick}
                    type="button"
                    variant="outline"
                  >
                    Upgrade
                  </Button>
                </div>
              </Alert>
            )}
            <Button type="submit" disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending
                ? "Creating..."
                : "Create Project"}
            </Button>
          </form>
        </Form>
        {projectCreated && createdProjectData && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 stroke-green-800" strokeWidth={3} />
            <AlertTitle className="text-green-800">
              Project Created Successfully!
            </AlertTitle>
            <AlertDescription className="text-green-700">
              Your project &quot;{createdProjectData.name}&quot; has been
              created and is being processed. You can check the progress in the
              recent projects section below. Check your dashboard in 10 minutes.
              <div className="mt-4 flex gap-3">
                <Button
                  onClick={() => handleSeeProgress(createdProjectData.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  See the progress
                </Button>
                <Button onClick={handleCreateAnother} variant="outline">
                  Create Another Project
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <PurchaseCredits open={open} onOpenChange={setOpen} />
    </Card>
  );
};

export default NewProject;
