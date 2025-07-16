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
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function StudentDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Units Completed',
      value: '12',
      total: '24',
      percentage: 50,
      icon: CheckCircle,
      color: 'text-success',
    },
    {
      title: 'Average Score',
      value: '85%',
      description: '+5% from last month',
      icon: Trophy,
      color: 'text-accent',
    },
    {
      title: 'Study Time',
      value: '24h',
      description: 'This week',
      icon: Clock,
      color: 'text-primary',
    },
    {
      title: 'Current Streak',
      value: '7 days',
      description: 'Keep it up!',
      icon: Target,
      color: 'text-secondary',
    },
  ];

  const availableUnits = [
    {
      id: 1,
      title: 'Mathematics Fundamentals',
      description: 'Basic arithmetic and number systems',
      progress: 75,
      questionsCount: 15,
      difficulty: 'Beginner',
      estimatedTime: '45 min',
    },
    {
      id: 2,
      title: 'English Literature',
      description: 'Poetry analysis and comprehension',
      progress: 30,
      questionsCount: 20,
      difficulty: 'Intermediate',
      estimatedTime: '60 min',
    },
    {
      id: 3,
      title: 'Science Basics',
      description: 'Introduction to physics and chemistry',
      progress: 0,
      questionsCount: 25,
      difficulty: 'Beginner',
      estimatedTime: '90 min',
    },
  ];

  const recentScores = [
    { unit: 'Algebra Basics', score: 92, date: '2 days ago' },
    { unit: 'Reading Comprehension', score: 88, date: '1 week ago' },
    { unit: 'Chemistry Elements', score: 76, date: '2 weeks ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Continue your learning journey and track your progress
          </p>
        </div>
        <Button onClick={() => navigate('/learn')}>
          <BookOpen className="h-4 w-4 mr-2" />
          Browse Units
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
        {/* Continue Learning */}
        <Card className="lg:col-span-2 bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableUnits.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{unit.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{unit.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{unit.questionsCount} questions</span>
                    <span>•</span>
                    <span>{unit.difficulty}</span>
                    <span>•</span>
                    <span>{unit.estimatedTime}</span>
                  </div>
                  {unit.progress > 0 && (
                    <div className="mt-2">
                      <Progress value={unit.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {unit.progress}% complete
                      </p>
                    </div>
                  )}
                </div>
                <Button
                  variant={unit.progress > 0 ? "default" : "outline"}
                  onClick={() => navigate(`/learn/${unit.id}`)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {unit.progress > 0 ? 'Continue' : 'Start'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Performance */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Scores</CardTitle>
            <CardDescription>Your latest assessment results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentScores.map((score, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{score.unit}</p>
                  <p className="text-xs text-muted-foreground">{score.date}</p>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${
                    score.score >= 90 ? 'text-success' :
                    score.score >= 80 ? 'text-accent' :
                    score.score >= 70 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {score.score}%
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              View All Results
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}