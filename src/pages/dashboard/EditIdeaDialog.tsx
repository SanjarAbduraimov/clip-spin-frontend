import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  ListsToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useState, useEffect } from "react";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { useUpdateProject } from "@/hooks/api";
import { Project } from "@/types";

export const EditIdeaDialog = ({
  project,
  button,
}: {
  project: Project;
  button: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const updateProjectMutation = useUpdateProject();

  const [markdown, setMarkdown] = useState(project.transcription?.text || "");

  const handleSave = () => {
    updateProjectMutation
      .mutateAsync({
        id: project.id,
        data: {
          input_summary: markdown,
          title: project.name,
        },
      })
      .then(() => setOpen(false));
  };

  useEffect(() => {
    if (project.transcription) {
      setMarkdown(project.transcription.text);
    }
  }, [project]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>
        {project.transcription?.text && (
          <MDXEditor
            markdown={markdown}
            onChange={(md) => setMarkdown(md)}
            className="max-h-[400px] overflow-auto"
            plugins={[
              toolbarPlugin({
                toolbarClassName: "my-classname",
                toolbarContents: () => (
                  <>
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                    <ListsToggle />
                  </>
                ),
              }),
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
            ]}
          />
        )}
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={updateProjectMutation.isPending}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
