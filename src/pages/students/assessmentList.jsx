import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  BookOpen, 
  ChevronRight,
  Calendar,
  FileText
} from 'lucide-react';

// Mock data for assessments with batch type added
const assessments = [
  {
    id: 'math-midterm',
    title: 'Mathematics Midterm Assessment',
    subject: 'Mathematics',
    description: 'Covers algebra, geometry, and basic trigonometry concepts',
    duration: 60, // minutes
    totalQuestions: 25,
    dueDate: '2024-03-15',
    batchType: 'Summary'
  },
  {
    id: 'science-quiz1',
    title: 'Science Quiz - Physics Fundamentals',
    subject: 'Science',
    description: 'Basic concepts of motion, force, and energy',
    duration: 30,
    totalQuestions: 15,
    dueDate: '2024-03-10',
    batchType: 'Questions Bank'
  },
  {
    id: 'history-chapter2',
    title: 'History Chapter 2 Review',
    subject: 'History',
    description: 'World War II and its aftermath',
    duration: 45,
    totalQuestions: 20,
    dueDate: '2024-03-20',
    batchType: 'Summary'
  }
];

export function AssessmentListPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assessments</h1>
          <p className="text-muted-foreground">
            View and attempt all your assigned tests and quizzes
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">{assessment.title}</h3>
                    <Badge variant="secondary" className="capitalize">
                      {assessment.batchType}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground">{assessment.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      <span>{assessment.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{assessment.duration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Due {assessment.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3 min-w-[200px]">
                  <Button 
                    onClick={() => navigate(`/assessment/${assessment.id}`)}
                    className="gap-1"
                  >
                    Start Assessment
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}