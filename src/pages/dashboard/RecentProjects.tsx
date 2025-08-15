import { ColumnDef } from "@tanstack/react-table";
import { Copy, Download, Filter, Search, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { getProjectStatusLabel } from "@/modules/project/libs/getProjectStatusLabel";

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
import DataTable from "@/components/Table/DataTable";
import {
  useDeleteProject,
  useDuplicateProject,
  useProjects,
} from "@/hooks/api";
import { useShareProject } from "@/hooks/useShareProject";
import {
  Project,
  ProjectStatus,
  ProjectStatusColors,
  ProjectTypeLabels,
} from "@/types";

export const RecentProjects = () => {
  const columns: ColumnDef<Project>[] = [
    {
      accessorKey: "name",
      header: "Project Name",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <Link
            to={`/project/${project.id}`}
            className="font-medium hover:underline"
          >
            {project.name}
          </Link>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <Badge
            className="whitespace-nowrap"
            variant={ProjectStatusColors[project.status]}
          >
            {getProjectStatusLabel(project)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Project Type",
      cell: ({ row }) => {
        const project = row.original;
        return (
          <Badge className="whitespace-nowrap">
            {ProjectTypeLabels[project.type]}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const project = row.original;
        return (
          <div className="flex justify-end gap-2">
            {project.status === ProjectStatus.COMPLETED && (
              <>
                <IconButton asChild variant="ghost">
                  <a
                    href={project.sourceUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download size={16} />
                  </a>
                </IconButton>
                <IconButton
                  onClick={() => shareProject(project)}
                  variant="ghost"
                >
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
        );
      },
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all",
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const { data, isLoading, error } = useProjects(page, limit);
  const projects = data?.data || [];
  const totalProjects = data?.total || 0;

  const { shareProject } = useShareProject();

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
                  onClick={() => setStatusFilter(ProjectStatus.QUEUED)}
                >
                  Queued
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter(ProjectStatus.IN_PROGRESS)}
                >
                  In Progress
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
        {error ? (
          <div className="py-8 text-center text-error">
            Error loading projects. Please try again.
          </div>
        ) : filteredProjects?.length === 0 && !isLoading ? (
          <div className="py-8 text-center text-gray-500">
            No projects found. Create a new project to get started.
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredProjects || []}
            rowCount={totalProjects}
            pagination={pagination}
            onPaginationChange={(updater) => {
              const newPagination =
                typeof updater === "function" ? updater(pagination) : updater;
              setPagination(newPagination);
              setPage(newPagination.pageIndex + 1);
              setLimit(newPagination.pageSize);
            }}
            isLoading={isLoading}
            emptyState={
              <div className="py-8 text-center text-gray-500">
                No projects found. Create a new project to get started.
              </div>
            }
          />
        )}
      </CardContent>
    </Card>
  );
};
