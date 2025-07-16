import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Clock,
  Trophy,
  Target,
  Play,
  CheckCircle,
  TrendingUp,
  FileText,
  AlertCircle,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Assessments Completed',
      value: '5',
      total: '12',
      percentage: 42,
      icon: CheckCircle,
      color: 'text-success',
    },
    {
      title: 'Average Score',
      value: '78%',
      description: '+3% from last month',
      icon: Trophy,
      color: 'text-accent',
    },
    {
      title: 'Time Spent',
      value: '14h',
      description: 'On assessments this month',
      icon: Clock,
      color: 'text-primary',
    },
    {
      title: 'Highest Score',
      value: '94%',
      description: 'Algebra Midterm',
      icon: Target,
      color: 'text-secondary',
    },
  ];

  const upcomingAssessments = [
    {
      id: 1,
      title: 'Mathematics Midterm',
      type: 'Exam',
      dueDate: '2023-11-15',
      duration: '90 min',
      status: 'Not Started',
      preparation: 30,
    },
    {
      id: 2,
      title: 'English Essay',
      type: 'Assignment',
      dueDate: '2023-11-20',
      duration: 'Take-home',
      status: 'In Progress',
      preparation: 65,
    },
    {
      id: 3,
      title: 'Science Quiz',
      type: 'Quiz',
      dueDate: '2023-11-10',
      duration: '30 min',
      status: 'Not Started',
      preparation: 0,
    },
  ];

  const recentResults = [
    { assessment: 'Algebra Quiz', score: 88, date: '3 days ago', type: 'Quiz' },
    { assessment: 'Literature Analysis', score: 76, date: '1 week ago', type: 'Assignment' },
    { assessment: 'Chemistry Test', score: 82, date: '2 weeks ago', type: 'Test' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment Dashboard</h1>
          <p className="text-muted-foreground">
            Track your assessment progress and upcoming evaluations
          </p>
        </div>
        <Button onClick={() => navigate('/assessments')} variant="hero">
          <FileText className="h-4 w-4 mr-2" />
          View All Assessments
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.total && (
                <div className="mt-2">
                  <Progress value={stat.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.value} of {stat.total} completed
                  </p>
                </div>
              )}
              {stat.description && (
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Assessments */}
        <Card className="lg:col-span-2 bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Prepare for your next evaluations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssessments.map((assessment) => (
              <div
                key={assessment.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{assessment.title}</h3>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">
                      {assessment.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {assessment.dueDate}
                    </span>
                    <span>•</span>
                    <span>Duration: {assessment.duration}</span>
                    <span>•</span>
                    <span>Status: {assessment.status}</span>
                  </div>
                  {assessment.preparation > 0 && (
                    <div className="mt-2">
                      <Progress value={assessment.preparation} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {assessment.preparation}% prepared
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  variant={assessment.preparation > 0 ? "default" : "outline"}
                  onClick={() => navigate(`/assessments/${assessment.id}`)}
                >
                  {assessment.preparation > 0 ? 'Continue Prep' : 'Start Prep'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Your latest assessment performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{result.assessment}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{result.type}</span>
                    <span>•</span>
                    <span>{result.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    result.score >= 90 ? 'text-success' :
                    result.score >= 80 ? 'text-accent' :
                    result.score >= 70 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {result.score}%
                  </div>
                  {result.score < 70 && (
                    <div className="text-xs text-muted-foreground flex items-center justify-end mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Needs review
                    </div>
                  )}
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}