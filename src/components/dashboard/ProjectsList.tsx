import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Project {
  id: string;
  name: string;
  status: "active" | "completed" | "on-hold" | "cancelled";
  startDate: string;
  endDate: string;
  budget: number;
  budgetUtilization: number;
  assignedFreelancers: {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
  }[];
}

const statusColors = {
  active: "bg-green-500 hover:bg-green-600",
  completed: "bg-blue-500 hover:bg-blue-600",
  "on-hold": "bg-yellow-500 hover:bg-yellow-600",
  cancelled: "bg-red-500 hover:bg-red-600",
};

const statusVariants = {
  active: "success",
  completed: "default",
  "on-hold": "warning",
  cancelled: "destructive",
} as const;

const ProjectsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data for projects
  const projects: Project[] = [
    {
      id: "1",
      name: "Website Redesign",
      status: "active",
      startDate: "2023-10-15",
      endDate: "2023-12-30",
      budget: 15000,
      budgetUtilization: 45,
      assignedFreelancers: [
        {
          id: "101",
          name: "Jane Cooper",
          initials: "JC",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
        },
        {
          id: "102",
          name: "Robert Fox",
          initials: "RF",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
        },
      ],
    },
    {
      id: "2",
      name: "Mobile App Development",
      status: "on-hold",
      startDate: "2023-09-01",
      endDate: "2024-02-28",
      budget: 45000,
      budgetUtilization: 30,
      assignedFreelancers: [
        {
          id: "103",
          name: "Esther Howard",
          initials: "EH",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=esther",
        },
        {
          id: "104",
          name: "Cameron Williamson",
          initials: "CW",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cameron",
        },
        {
          id: "105",
          name: "Brooklyn Simmons",
          initials: "BS",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brooklyn",
        },
      ],
    },
    {
      id: "3",
      name: "Content Marketing Campaign",
      status: "completed",
      startDate: "2023-08-15",
      endDate: "2023-11-15",
      budget: 8000,
      budgetUtilization: 100,
      assignedFreelancers: [
        {
          id: "106",
          name: "Leslie Alexander",
          initials: "LA",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=leslie",
        },
      ],
    },
    {
      id: "4",
      name: "Brand Identity Design",
      status: "active",
      startDate: "2023-11-01",
      endDate: "2024-01-15",
      budget: 12000,
      budgetUtilization: 25,
      assignedFreelancers: [
        {
          id: "107",
          name: "Dianne Russell",
          initials: "DR",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dianne",
        },
        {
          id: "108",
          name: "Guy Hawkins",
          initials: "GH",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guy",
        },
      ],
    },
    {
      id: "5",
      name: "E-commerce Integration",
      status: "cancelled",
      startDate: "2023-07-01",
      endDate: "2023-10-30",
      budget: 20000,
      budgetUtilization: 15,
      assignedFreelancers: [
        {
          id: "109",
          name: "Jenny Wilson",
          initials: "JW",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jenny",
        },
      ],
    },
  ];

  // Filter projects based on search query and status filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl font-bold">Ongoing Projects</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Assigned Freelancers</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[project.status]}>
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {formatDate(project.startDate)} -{" "}
                          {formatDate(project.endDate)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {project.assignedFreelancers
                            .slice(0, 3)
                            .map((freelancer) => (
                              <Avatar
                                key={freelancer.id}
                                className="border-2 border-white h-8 w-8"
                              >
                                <AvatarImage
                                  src={freelancer.avatar}
                                  alt={freelancer.name}
                                />
                                <AvatarFallback>
                                  {freelancer.initials}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                        </div>
                        {project.assignedFreelancers.length > 3 && (
                          <span className="text-xs text-gray-500 ml-1">
                            +{project.assignedFreelancers.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {formatCurrency(project.budget)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {project.budgetUtilization}%
                          </span>
                        </div>
                        <Progress
                          value={project.budgetUtilization}
                          className="h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No projects found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsList;
