import { ArrowRight, Check, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Input } from "@/components/_form/Input";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { Skeleton } from "@/components/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { usePresenters, useProject, useUpdateProject } from "@/hooks/api";
import { useToast } from "@/hooks/useToast";
import { PresenterType } from "@/types";

const PresenterSelection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedType, setSelectedType] = useState<PresenterType>("ai");
  const [selectedPresenterId, setSelectedPresenterId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading: projectLoading } = useProject(
    projectId || "",
  );
  const { data: presenters, isLoading: presentersLoading } =
    usePresenters(selectedType);
  const updateProjectMutation = useUpdateProject();

  const handleSelectPresenter = (presenterId: string) => {
    setSelectedPresenterId(presenterId);
  };

  const handleContinue = async () => {
    if (!projectId || !selectedPresenterId) return;

    try {
      await updateProjectMutation.mutateAsync({
        id: projectId,
        data: {
          presenterSettings: {
            type: selectedType,
            presenterId: selectedPresenterId,
          },
        },
      });

      toast({
        title: "Presenter selected",
        description: "Your presenter has been selected successfully",
      });

      navigate(`/project/${projectId}/output-settings`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save presenter selection. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isLoading = projectLoading || presentersLoading;

  const filteredPresenters = presenters?.filter(
    (presenter) =>
      presenter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      presenter.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Select Presenter</h1>
        <p className="mt-2 text-gray-500">Choose a presenter for your video</p>
      </div>

      {/* Render content based on loading and project state */}
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-md rounded-lg" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Generate skeleton items with stable keys */}
            {[
              "presenter-skeleton-1",
              "presenter-skeleton-2",
              "presenter-skeleton-3",
              "presenter-skeleton-4",
              "presenter-skeleton-5",
              "presenter-skeleton-6",
              "presenter-skeleton-7",
              "presenter-skeleton-8",
            ].map((key) => (
              <Skeleton key={key} className="h-64 w-full rounded-lg" />
            ))}
          </div>
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
        <div>
          <Tabs
            defaultValue="ai"
            onValueChange={(value) => setSelectedType(value as PresenterType)}
          >
            <TabsList className="mb-8">
              <TabsTrigger value="ai">AI Presenters</TabsTrigger>
              <TabsTrigger value="human">Human Presenters</TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <div className="relative max-w-md">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
                <Input
                  placeholder={`Search ${selectedType} presenters...`}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="ai" className="mt-0">
              {!filteredPresenters?.length ? (
                <div className="rounded-lg bg-gray-50 py-8 text-center">
                  <p className="text-gray-500">
                    No AI presenters found matching your search
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredPresenters.map((presenter) => (
                    <Card
                      key={presenter.id}
                      className={`cursor-pointer transition-all ${
                        selectedPresenterId === presenter.id
                          ? "ring-2 ring-blue-500"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => handleSelectPresenter(presenter.id)}
                    >
                      <div className="relative">
                        <img
                          src={presenter.thumbnailUrl}
                          alt={presenter.name}
                          className="aspect-[3/4] w-full rounded-t-lg object-cover"
                        />
                        {selectedPresenterId === presenter.id && (
                          <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1 text-white">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-medium">{presenter.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {presenter.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {presenter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {presenter.tags.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                              +{presenter.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="human" className="mt-0">
              {!filteredPresenters?.length ? (
                <div className="rounded-lg bg-gray-50 py-8 text-center">
                  <p className="text-gray-500">
                    No human presenters found matching your search
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredPresenters.map((presenter) => (
                    <Card
                      key={presenter.id}
                      className={`cursor-pointer transition-all ${
                        selectedPresenterId === presenter.id
                          ? "ring-2 ring-blue-500"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => handleSelectPresenter(presenter.id)}
                    >
                      <div className="relative">
                        <img
                          src={presenter.thumbnailUrl}
                          alt={presenter.name}
                          className="aspect-[3/4] w-full rounded-t-lg object-cover"
                        />
                        {selectedPresenterId === presenter.id && (
                          <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1 text-white">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-medium">{presenter.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {presenter.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {presenter.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {presenter.tags.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                              +{presenter.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={!selectedPresenterId || updateProjectMutation.isPending}
            >
              Continue
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresenterSelection;
