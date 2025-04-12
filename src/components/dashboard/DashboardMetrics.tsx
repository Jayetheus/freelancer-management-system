import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  Users,
  Briefcase,
  Clock,
  DollarSign,
  Award,
  Calendar,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: React.ReactNode;
  description?: string;
}

const MetricCard = ({
  title,
  value,
  trend = 0,
  icon,
  description = "",
}: MetricCardProps) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
        {trend !== 0 && (
          <div className="flex items-center mt-4">
            {trend > 0 ? (
              <div className="flex items-center text-emerald-600">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">{trend}%</span>
              </div>
            ) : (
              <div className="flex items-center text-rose-600">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">{Math.abs(trend)}%</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground ml-2">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardMetrics = () => {
  // Mock data - in a real application, this would come from an API or props
  const metrics = [
    {
      title: "Active Freelancers",
      value: 124,
      trend: 12,
      icon: <Users className="h-5 w-5 text-primary" />,
      description: "8 new this week",
    },
    {
      title: "Ongoing Projects",
      value: 42,
      trend: 8,
      icon: <Briefcase className="h-5 w-5 text-primary" />,
      description: "3 due this week",
    },
    {
      title: "Pending Approvals",
      value: 18,
      trend: -5,
      icon: <Clock className="h-5 w-5 text-primary" />,
      description: "12 time sheets, 6 expenses",
    },
    {
      title: "Budget Utilization",
      value: "78%",
      trend: 3,
      icon: <DollarSign className="h-5 w-5 text-primary" />,
      description: "$245,000 of $315,000",
    },
    {
      title: "Top Performers",
      value: 15,
      icon: <Award className="h-5 w-5 text-primary" />,
      description: "Rated 4.8+ out of 5",
    },
    {
      title: "Upcoming Deadlines",
      value: 7,
      trend: -15,
      icon: <Calendar className="h-5 w-5 text-primary" />,
      description: "Within next 7 days",
    },
  ];

  return (
    <div className="w-full bg-background p-4">
      <h2 className="text-xl font-semibold mb-4">Dashboard Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardMetrics;
