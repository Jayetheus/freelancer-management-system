import React from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import DashboardMetrics from "./dashboard/DashboardMetrics";
import FreelancersList from "./dashboard/FreelancersList";
import ProjectsList from "./dashboard/ProjectsList";
import ApprovalsQueue from "./dashboard/ApprovalsQueue";

const Home = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r p-4">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">BBD FMS</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="py-2 px-3 bg-primary/10 text-primary rounded-md font-medium flex items-center">
            <span className="mr-3">Dashboard</span>
          </div>

          <div className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md font-medium flex items-center">
            <span className="mr-3">Freelancers</span>
          </div>

          <div className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md font-medium flex items-center">
            <span className="mr-3">Projects</span>
          </div>

          <div className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md font-medium flex items-center">
            <span className="mr-3">Approvals</span>
          </div>

          <div className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md font-medium flex items-center">
            <span className="mr-3">Reports</span>
          </div>

          <div className="py-2 px-3 text-muted-foreground hover:bg-muted rounded-md font-medium flex items-center">
            <span className="mr-3">Settings</span>
          </div>
        </nav>

        <div className="mt-auto pt-4">
          <div className="flex items-center p-2 rounded-md hover:bg-muted">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@bbd.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="relative w-64 md:w-80">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>

            <Separator orientation="vertical" className="h-8" />

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@bbd.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <Button>
                <User className="mr-2 h-4 w-4" />
                Add Freelancer
              </Button>
            </div>

            {/* Dashboard Metrics */}
            <DashboardMetrics />

            {/* Freelancers List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Active Freelancers</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <FreelancersList />
            </div>

            {/* Projects List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <ProjectsList />
            </div>

            {/* Approvals Queue */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Pending Approvals</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <ApprovalsQueue />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
