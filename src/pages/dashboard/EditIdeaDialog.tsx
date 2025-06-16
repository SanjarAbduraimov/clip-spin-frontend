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

export const EditIdeaDialog = ({
  initialScript,
  button,
  onSave,
}: {
  initialScript: string;
  button: React.ReactNode;
  onSave: (script: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [script, setScript] = useState(initialScript);

  useEffect(() => {
    setScript(initialScript);
  }, [initialScript]);

  const handleSave = () => {
    onSave(script);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>
        <Textarea
          textareaClassName="h-[200px]"
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
