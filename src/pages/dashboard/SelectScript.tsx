import { ArrowRight, Edit } from "lucide-react";
import { useEffect, useState } from "react";

import { Alert, AlertTitle } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Project } from "@/types";

export const SelectScript = ({ project }: { project: Project }) => {
  const [activeScriptIndex, setActiveScriptIndex] = useState<number>(0);

  const [currentScript, setCurrentScript] = useState<string>("");

  useEffect(() => {
    setCurrentScript(project.suggestedIdeas[activeScriptIndex]);
  }, [activeScriptIndex]);

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">
        Select Script to generate video
      </h3>
      <div className="flex flex-col gap-4 overflow-auto" role="radiogroup">
        {project.suggestedIdeas.map((idea, index) => (
          <div className="relative w-full">
            <input
              id={`script-${index}`}
              type="radio"
              className="peer sr-only"
              checked={activeScriptIndex === index}
              onChange={() => setActiveScriptIndex(index)}
              value={index}
            />
            <label
              htmlFor={`script-${index}`}
              className="flex cursor-pointer flex-col items-start rounded-lg border p-4 transition-all hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary/5"
            >
              <div className="">
                <h3 className="mb-1 flex items-center gap-1 text-base font-medium">
                  Script #{index + 1}
                </h3>
                <p className="text-muted-foreground line-clamp-1 text-sm">
                  {idea}
                </p>
              </div>
              <div
                className={`absolute right-2 top-2 h-4 w-4 rounded-full ${activeScriptIndex === index ? "bg-primary" : "border-muted border"}`}
              />
            </label>
          </div>
        ))}
      </div>
      <Alert className="mt-4 bg-bg-quaternary">
        <div className="mb-2 flex items-baseline justify-between">
          <AlertTitle className="text-lg">Script</AlertTitle>
          <Button variant="link" size="link" iconRight={<Edit size={16} />}>
            Edit
          </Button>
        </div>
        {currentScript}
      </Alert>

      <Button
        className="ml-auto mt-2 flex"
        size="sm"
        iconRight={<ArrowRight size={16} />}
      >
        Generate Video
      </Button>
    </div>
  );
};
