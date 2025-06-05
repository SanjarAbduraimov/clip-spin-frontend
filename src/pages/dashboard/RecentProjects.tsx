import { Copy, Download, Filter, Search, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { Input } from "@/components/_form/Input";
import { Badge } from "@/components/Badge";
import { Button, IconButton } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Skeleton } from "@/components/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table/Table";
import {
  useDeleteProject,
  useDuplicateProject,
  useProjects,
} from "@/hooks/api";
import { Project, ProjectStatus, ProjectStatusColors } from "@/types";

export const RecentProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all",
  );

  const { data: projects, isLoading, error } = useProjects();

  const deleteProjectMutation = useDeleteProject();
  const duplicateProjectMutation = useDuplicateProject();

  const { authenticated } = useAuthContext();

  if (!authenticated) return null;

  const handleDeleteProject = (id: string) => {
    // Using a safer approach than window.confirm
    const confirmDelete = () => {
      deleteProjectMutation.mutate(id);
    };

    // TODO: Replace with a proper confirmation dialog component
    // eslint-disable-next-line no-alert
    if (window.confirm("Are you sure you want to delete this project?")) {
      confirmDelete();
    }
  };

  const handleDuplicateProject = (project: Project) => {
    duplicateProjectMutation.mutate(project);
  };

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Recent projects</CardTitle>
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(ProjectStatus.PENDING)}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(ProjectStatus.CANCELLED)}
                >
                  Cancelled
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(ProjectStatus.COMPLETED)}
                >
                  Complete
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(ProjectStatus.FAILED)}
                >
                  Failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {(() => {
          // Use a function to determine what content to render based on conditions
          if (isLoading) {
            return (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map(() => (
                  <div
                    key={`skeleton-item-${Math.random().toString(36).substr(2, 9)}`}
                    className="flex items-center space-x-4"
                  >
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            );
          }
          if (error) {
            return (
              <div className="py-8 text-center text-error">
                Error loading projects. Please try again.
              </div>
            );
          }
          if (filteredProjects?.length === 0) {
            return (
              <div className="py-8 text-center text-gray-500">
                No projects found. Create a new project to get started.
              </div>
            );
          }
          return (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/project/${project.id}`}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={ProjectStatusColors[project.status]}>
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {project.status === ProjectStatus.COMPLETED && (
                          <>
                            <IconButton variant="ghost">
                              <Download size={16} />
                            </IconButton>
                            <IconButton variant="ghost">
                              <Share2 size={16} />
                            </IconButton>
                          </>
                        )}
                        <IconButton
                          variant="ghost"
                          onClick={() => handleDuplicateProject(project)}
                        >
                          <Copy size={16} />
                        </IconButton>
                        <IconButton
                          variant="ghost"
                          className="text-red-500"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        })()}
      </CardContent>
    </Card>
  );
};
