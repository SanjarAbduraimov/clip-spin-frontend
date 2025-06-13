import { useEffect, useState } from "react";

import { Textarea } from "@/components/_form/Textarea";
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

export const EditIdeaDialog = ({
  initialScript,
  projectId,
  button,
}: {
  initialScript: string;
  projectId: string;
  button: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const updateProjectMutation = useUpdateProject();

  const [script, setScript] = useState(initialScript);

  const handleSave = () => {
    updateProjectMutation
      .mutateAsync({
        id: projectId,
        data: {
          input_summary: script,
        },
      })
      .then(() => setOpen(false));
  };

  useEffect(() => {
    setScript(initialScript);
  }, [initialScript]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>
        <Textarea value={script} onChange={(e) => setScript(e.target.value)} />
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
