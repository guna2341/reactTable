import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  FileText,
  Users,
  CheckSquare,
  TrendingUp,
  AlertCircle,
  Plus,
  Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Learning Units',
      value: '24',
      change: '+3 this week',
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Total Questions',
      value: '156',
      change: '+12 this week',
      icon: FileText,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Active Students',
      value: '89',
      change: '+5 this week',
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Pending Reviews',
      value: '7',
      change: '2 urgent',
      icon: AlertCircle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'unit_created',
      message: 'New learning unit "Advanced Mathematics" created',
      time: '2 hours ago',
      user: 'Admin User',
    },
    {
      id: 2,
      type: 'question_submitted',
      message: '5 new questions submitted for review',
      time: '4 hours ago',
      user: 'Content Creator',
    },
    {
      id: 3,
      type: 'review_completed',
      message: 'Question review completed by 3 reviewers',
      time: '6 hours ago',
      user: 'Review Team',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage content, questions, and monitor platform activity
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/content/create')}   >
            <Plus className="h-4 w-4 mr-2" />
            Create Unit
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => navigate('/content/create')}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Create Learning Unit</div>
                  <div className="text-sm text-muted-foreground">
                    Add new content with questions
                  </div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => navigate('/reviews')}
            >
              <div className="flex items-center gap-3">
                <div className="bg-warning/10 p-2 rounded-lg">
                  <CheckSquare className="h-4 w-4 text-warning" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Review Questions</div>
                  <div className="text-sm text-muted-foreground">
                    7 questions pending approval
                  </div>
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => navigate('/users')}
            >
              <div className="flex items-center gap-3">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Manage Users</div>
                  <div className="text-sm text-muted-foreground">
                    Add reviewers and students
                  </div>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-1">
                  <TrendingUp className="h-3 w-3 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}