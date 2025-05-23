import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_form/Form";
import { Input } from "@/components/_form/Input";
import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { useCreateProjectFromUrl } from "@/hooks/api";
import { useToast } from "@/hooks/useToast";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  url: z
    .string()
    .url("Please enter a valid URL")
    .refine(
      (url) => {
        // Check for YouTube Shorts URLs
        const youtubeShortRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/|youtu\.be\/shorts\/)([a-zA-Z0-9_-]{11})(\?.*)?$/;

        // Check for Instagram Reels URLs
        const instagramReelRegex =
          /^(https?:\/\/)?(www\.)?(instagram\.com\/reels?\/|instagram\.com\/reel\/)([a-zA-Z0-9_-]+)(\?.*)?$/;

        // Check for TikTok URLs
        const tiktokRegex =
          /^(https?:\/\/)?(www\.)?(tiktok\.com\/@[\w.-]+\/video\/|vm\.tiktok\.com\/)([0-9]+)(\?.*)?$/;

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
});

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const createProjectMutation = useCreateProjectFromUrl();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Extract source platform from URL
      const { url, name } = values;
      let source = "";

      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        source = "YouTube";
      } else if (url.includes("instagram.com")) {
        source = "Instagram";
      } else if (url.includes("tiktok.com") || url.includes("vm.tiktok.com")) {
        source = "TikTok";
      }

      await createProjectMutation.mutateAsync({
        name,
        url,
        source,
      });

      form.reset();

      toast({
        title: "Project created",
        description: "Your project has been created and is being processed",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error creating your project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h1>Create New Project</h1>
        </CardTitle>
        <CardDescription>
          Enter a video URL to extract transcription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Video" {...field} />
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
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending
                ? "Creating..."
                : "Create Project"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewProject;
