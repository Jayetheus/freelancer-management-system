import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckIcon,
  XIcon,
  EyeIcon,
  ClockIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";

interface ApprovalItem {
  id: string;
  freelancerName: string;
  freelancerAvatar?: string;
  projectName: string;
  submissionType: "time" | "expense" | "deliverable";
  date: string;
  amount?: number;
  description?: string;
  status: "pending" | "approved" | "rejected";
}

const ApprovalsQueue = () => {
  // Mock data for approvals
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: "1",
      freelancerName: "Jane Cooper",
      freelancerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      projectName: "Website Redesign",
      submissionType: "time",
      date: "2023-06-15",
      amount: 8,
      description: "Frontend development and responsive design implementation",
      status: "pending",
    },
    {
      id: "2",
      freelancerName: "Alex Morgan",
      freelancerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      projectName: "Mobile App Development",
      submissionType: "expense",
      date: "2023-06-14",
      amount: 125.5,
      description: "Software licenses for development tools",
      status: "pending",
    },
    {
      id: "3",
      freelancerName: "Michael Brown",
      freelancerAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      projectName: "Content Marketing Campaign",
      submissionType: "deliverable",
      date: "2023-06-13",
      description: "Final draft of blog posts and social media content",
      status: "pending",
    },
    {
      id: "4",
      freelancerName: "Sarah Wilson",
      freelancerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      projectName: "Website Redesign",
      submissionType: "time",
      date: "2023-06-12",
      amount: 6,
      description: "Backend API integration",
      status: "pending",
    },
    {
      id: "5",
      freelancerName: "David Lee",
      freelancerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      projectName: "Mobile App Development",
      submissionType: "expense",
      date: "2023-06-11",
      amount: 75.25,
      description: "Cloud hosting services",
      status: "pending",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Handle approval action
  const handleApprove = (id: string) => {
    setApprovals(
      approvals.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item,
      ),
    );
  };

  // Handle rejection action
  const handleReject = (id: string) => {
    setApprovals(
      approvals.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item,
      ),
    );
    setIsDetailsOpen(false);
  };

  // View details of an approval item
  const viewDetails = (item: ApprovalItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  // Filter approvals by type
  const timeSubmissions = approvals.filter(
    (item) => item.submissionType === "time" && item.status === "pending",
  );
  const expenseClaims = approvals.filter(
    (item) => item.submissionType === "expense" && item.status === "pending",
  );
  const deliverables = approvals.filter(
    (item) =>
      item.submissionType === "deliverable" && item.status === "pending",
  );

  // Get icon based on submission type
  const getSubmissionIcon = (type: string) => {
    switch (type) {
      case "time":
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      case "expense":
        return <DollarSignIcon className="h-4 w-4 text-green-500" />;
      case "deliverable":
        return <FileTextIcon className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  // Format amount based on submission type
  const formatAmount = (item: ApprovalItem) => {
    if (item.submissionType === "time" && item.amount) {
      return `${item.amount} hours`;
    } else if (item.submissionType === "expense" && item.amount) {
      return `$${item.amount.toFixed(2)}`;
    }
    return "";
  };

  // Render approval item
  const renderApprovalItem = (item: ApprovalItem) => (
    <div
      key={item.id}
      className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/50"
    >
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={item.freelancerAvatar} alt={item.freelancerName} />
          <AvatarFallback>{item.freelancerName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{item.freelancerName}</div>
          <div className="text-sm text-muted-foreground">
            {item.projectName}
          </div>
          <div className="flex items-center mt-1">
            {getSubmissionIcon(item.submissionType)}
            <span className="ml-1 text-xs">
              {item.submissionType.charAt(0).toUpperCase() +
                item.submissionType.slice(1)}
              {formatAmount(item) && ` - ${formatAmount(item)}`}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="text-xs">
          {new Date(item.date).toLocaleDateString()}
        </Badge>
        <div className="flex space-x-1">
          <Button size="sm" variant="ghost" onClick={() => viewDetails(item)}>
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-green-600"
            onClick={() => handleApprove(item.id)}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600"
            onClick={() => viewDetails(item)}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All ({approvals.filter((a) => a.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="time">
              Time ({timeSubmissions.length})
            </TabsTrigger>
            <TabsTrigger value="expense">
              Expenses ({expenseClaims.length})
            </TabsTrigger>
            <TabsTrigger value="deliverable">
              Deliverables ({deliverables.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[400px] overflow-y-auto">
            {approvals.filter((a) => a.status === "pending").length > 0 ? (
              approvals
                .filter((a) => a.status === "pending")
                .map(renderApprovalItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending approvals
              </div>
            )}
          </TabsContent>

          <TabsContent value="time" className="max-h-[400px] overflow-y-auto">
            {timeSubmissions.length > 0 ? (
              timeSubmissions.map(renderApprovalItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending time submissions
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="expense"
            className="max-h-[400px] overflow-y-auto"
          >
            {expenseClaims.length > 0 ? (
              expenseClaims.map(renderApprovalItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending expense claims
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="deliverable"
            className="max-h-[400px] overflow-y-auto"
          >
            {deliverables.length > 0 ? (
              deliverables.map(renderApprovalItem)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No pending deliverables
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Approval Details</DialogTitle>
              <DialogDescription>
                Review the details before approving or rejecting.
              </DialogDescription>
            </DialogHeader>

            {selectedItem && (
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={selectedItem.freelancerAvatar}
                      alt={selectedItem.freelancerName}
                    />
                    <AvatarFallback>
                      {selectedItem.freelancerName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {selectedItem.freelancerName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedItem.projectName}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Type</div>
                    <div className="flex items-center">
                      {getSubmissionIcon(selectedItem.submissionType)}
                      <span className="ml-1">
                        {selectedItem.submissionType.charAt(0).toUpperCase() +
                          selectedItem.submissionType.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium">Date</div>
                    <div>
                      {new Date(selectedItem.date).toLocaleDateString()}
                    </div>
                  </div>

                  {selectedItem.amount && (
                    <div className="col-span-2">
                      <div className="text-sm font-medium">Amount</div>
                      <div>{formatAmount(selectedItem)}</div>
                    </div>
                  )}

                  <div className="col-span-2">
                    <div className="text-sm font-medium">Description</div>
                    <div className="text-sm">{selectedItem.description}</div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between sm:justify-end">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleReject(selectedItem?.id || "");
                  alert(
                    `Rejected submission from ${selectedItem?.freelancerName}`,
                  );
                }}
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  handleApprove(selectedItem?.id || "");
                  setIsDetailsOpen(false);
                  alert(
                    `Approved submission from ${selectedItem?.freelancerName}`,
                  );
                }}
              >
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ApprovalsQueue;
