import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Clock,
  DollarSign,
  Edit,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Freelancer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  availability: "Available" | "Busy" | "Unavailable";
  hourlyRate: number;
  rating: number;
}

const FreelancersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for freelancers
  const mockFreelancers: Freelancer[] = [
    {
      id: "1",
      name: "Jane Cooper",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      skills: ["React", "TypeScript", "UI/UX"],
      availability: "Available",
      hourlyRate: 45,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Alex Morgan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      skills: ["Node.js", "MongoDB", "Express"],
      availability: "Busy",
      hourlyRate: 55,
      rating: 4.5,
    },
    {
      id: "3",
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      skills: ["Python", "Django", "Data Analysis"],
      availability: "Available",
      hourlyRate: 50,
      rating: 4.9,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      skills: ["Angular", "JavaScript", "CSS"],
      availability: "Unavailable",
      hourlyRate: 40,
      rating: 4.2,
    },
    {
      id: "5",
      name: "David Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      skills: ["PHP", "Laravel", "MySQL"],
      availability: "Available",
      hourlyRate: 35,
      rating: 4.6,
    },
    {
      id: "6",
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      skills: ["React", "Node.js", "MongoDB"],
      availability: "Busy",
      hourlyRate: 60,
      rating: 4.7,
    },
    {
      id: "7",
      name: "Robert Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      skills: ["Java", "Spring", "Hibernate"],
      availability: "Available",
      hourlyRate: 65,
      rating: 4.4,
    },
  ];

  // Filter freelancers based on search query and filters
  const filteredFreelancers = mockFreelancers.filter((freelancer) => {
    const matchesSearch =
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesSkill =
      skillFilter === "all" ||
      freelancer.skills.some(
        (skill) => skill.toLowerCase() === skillFilter.toLowerCase(),
      );

    const matchesAvailability =
      availabilityFilter === "all" ||
      freelancer.availability.toLowerCase() ===
        availabilityFilter.toLowerCase();

    return matchesSearch && matchesSkill && matchesAvailability;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFreelancers.length / itemsPerPage);
  const paginatedFreelancers = filteredFreelancers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Get all unique skills for filter dropdown
  const allSkills = Array.from(
    new Set(mockFreelancers.flatMap((f) => f.skills)),
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle view profile action
  const handleViewProfile = (id: string) => {
    console.log(`View profile for freelancer with ID: ${id}`);
    // Navigate to profile page or open modal
  };

  // Handle edit action
  const handleEdit = (id: string) => {
    console.log(`Edit freelancer with ID: ${id}`);
    // Navigate to edit page or open edit modal
  };

  // Handle assign to project action
  const handleAssignToProject = (id: string) => {
    console.log(`Assign freelancer with ID: ${id} to project`);
    // Open project assignment modal
  };

  // Render availability badge with appropriate color
  const renderAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "Available":
        return <Badge className="bg-green-500">{availability}</Badge>;
      case "Busy":
        return <Badge className="bg-yellow-500">{availability}</Badge>;
      case "Unavailable":
        return <Badge className="bg-red-500">{availability}</Badge>;
      default:
        return <Badge>{availability}</Badge>;
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Freelancers</h2>
            <Button variant="outline" className="ml-auto">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or skills..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {allSkills.map((skill) => (
                    <SelectItem key={skill} value={skill.toLowerCase()}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={availabilityFilter}
                onValueChange={setAvailabilityFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Freelancer</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Hourly Rate</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFreelancers.length > 0 ? (
                  paginatedFreelancers.map((freelancer) => (
                    <TableRow key={freelancer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={freelancer.avatar}
                              alt={freelancer.name}
                            />
                            <AvatarFallback>
                              {freelancer.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{freelancer.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {freelancer.skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-100"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {renderAvailabilityBadge(freelancer.availability)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{freelancer.hourlyRate}/hr</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                          <span>{freelancer.rating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProfile(freelancer.id)}
                          >
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEdit(freelancer.id)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleAssignToProject(freelancer.id)
                                }
                              >
                                <Briefcase className="h-4 w-4 mr-2" />
                                Assign to Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      No freelancers found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredFreelancers.length,
                )}{" "}
                of {filteredFreelancers.length} freelancers
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ),
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FreelancersList;
