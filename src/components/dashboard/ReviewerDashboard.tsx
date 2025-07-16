import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckSquare,
  Clock,
  MessageSquare,
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Edit,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ReviewerDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Pending Reviews',
      value: '7',
      change: '2 urgent',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Completed Today',
      value: '12',
      change: '+4 from yesterday',
      icon: CheckSquare,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Questions Flagged',
      value: '3',
      change: 'Need attention',
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      title: 'Comments Made',
      value: '25',
      change: 'This week',
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const pendingQuestions = [
    {
      id: 1,
      question: 'What is the square root of 144?',
      unit: 'Mathematics Fundamentals',
      type: 'MCQ',
      submittedBy: 'Content Creator A',
      priority: 'high',
      submittedAt: '2 hours ago',
      reviewsCompleted: 1,
      reviewsNeeded: 3,
    },
    {
      id: 2,
      question: 'Explain the water cycle in detail.',
      unit: 'Environmental Science',
      type: 'Long Answer',
      submittedBy: 'Content Creator B',
      priority: 'medium',
      submittedAt: '4 hours ago',
      reviewsCompleted: 0,
      reviewsNeeded: 3,
    },
    {
      id: 3,
      question: 'Match the following chemical elements with their symbols.',
      unit: 'Chemistry Basics',
      type: 'Match Following',
      submittedBy: 'Admin User',
      priority: 'low',
      submittedAt: '1 day ago',
      reviewsCompleted: 2,
      reviewsNeeded: 3,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'MCQ':
        return 'bg-primary/10 text-primary';
      case 'Long Answer':
        return 'bg-secondary/10 text-secondary';
      case 'Match Following':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviewer Dashboard</h1>
          <p className="text-muted-foreground">
            Review and approve questions to maintain quality standards
          </p>
        </div>
        <Button onClick={() => navigate('/reviews')}>
          <CheckSquare className="h-4 w-4 mr-2" />
          Start Reviewing
        </Button>
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

      {/* Pending Questions */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Questions Awaiting Review</CardTitle>
          <CardDescription>
            Review questions and provide feedback to maintain quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingQuestions.map((question) => (
            <div
              key={question.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={getPriorityColor(question.priority)}>
                      {question.priority} priority
                    </Badge>
                    <Badge variant="outline" className={getQuestionTypeColor(question.type)}>
                      {question.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {question.reviewsCompleted}/{question.reviewsNeeded} reviews completed
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-1">{question.question}</h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Unit: {question.unit}</span>
                    <span>•</span>
                    <span>By: {question.submittedBy}</span>
                    <span>•</span>
                    <span>{question.submittedAt}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="success" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="warning" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={() => navigate('/reviews')}>
              View All Pending Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}