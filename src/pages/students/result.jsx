import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Make sure this import exists
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, ChevronLeft, BookOpen, FileText } from "lucide-react";
import { format } from "date-fns";

// Mock data - replace with your actual data source
const completedAssessments = [
  {
    id: "react-summary-1",
    title: "React Fundamentals Summary",
    type: "summary",
    dateCompleted: "2023-11-10T14:30:00",
    score: 4,
    totalQuestions: 5,
    passed: true
  },
  {
    id: "react-bank-1",
    title: "React Question Bank",
    type: "question-bank",
    dateCompleted: "2023-11-05T16:45:00",
    score: 7,
    totalQuestions: 10,
    passed: true
  },
  {
    id: "advanced-react-1",
    title: "Advanced React Patterns",
    type: "question-bank",
    dateCompleted: "2023-10-28T11:20:00",
    score: 5,
    totalQuestions: 8,
    passed: false
  }
];

export function AssessmentResultPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/assessments")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Assessments
        </Button>
        <h1 className="text-2xl font-bold">Completed Assessments</h1>
        <div></div> {/* Spacer for alignment */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {completedAssessments.map((assessment) => {
          const percentage = Math.round((assessment.score / assessment.totalQuestions) * 100);
          
          return (
            <Card key={assessment.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                  <Badge variant={assessment.type === "summary" ? "secondary" : "default"}>
                    {assessment.type === "summary" ? "Summary" : "Question Bank"}
                  </Badge>
                </div>
                <CardDescription>
                  Completed on {format(new Date(assessment.dateCompleted), "MMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Score:</span>
                  <span className="font-bold">
                    {assessment.score}/{assessment.totalQuestions}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" /> {/* Fixed: Using Progress component */}
                <div className="flex items-center justify-between">
                  <span>Percentage:</span>
                  <span className={`font-bold ${
                    assessment.passed ? "text-green-600" : "text-red-600"
                  }`}>
                    {percentage}%
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant={assessment.passed ? "success" : "destructive"}>
                  {assessment.passed ? "Passed" : "Not Passed"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(`/assessment-result/${assessment.id}`, {
                      state: { assessment }
                    })
                  }
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default AssessmentResultPage; // Ensure default export exists