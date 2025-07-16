import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with your actual data fetching
const getAssessmentDetails = (id) => {
  // In a real app, you would fetch this data based on the ID
  return {
    id,
    title: "React Fundamentals Summary",
    type: "summary",
    dateCompleted: "2023-11-10T14:30:00",
    score: 4,
    totalQuestions: 5,
    questions: [
      {
        id: "1",
        text: "What is JSX in React?",
        options: [
          { id: "a", text: "JavaScript XML" },
          { id: "b", text: "JavaScript Extension" },
          { id: "c", text: "Java Syntax Extension" }
        ],
        correctAnswer: "a",
        userAnswer: "a"
      },
      {
        id: "2",
        text: "What hook is used for side effects?",
        options: [
          { id: "a", text: "useState" },
          { id: "b", text: "useEffect" },
          { id: "c", text: "useContext" }
        ],
        correctAnswer: "b",
        userAnswer: "b"
      }
    ]
  };
};

export function AssessmentResultDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get from navigation state or fetch with fallback
  const assessment = location.state?.assessment || getAssessmentDetails(id) || {
    questions: [],
    score: 0,
    totalQuestions: 0,
    title: "Assessment",
    type: "unknown",
    dateCompleted: new Date().toISOString()
  };

  const percentage = Math.round((assessment.score / assessment.totalQuestions) * 100);
  const passed = percentage >= 70;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Button variant="outline" onClick={() => navigate("/assessment-results")}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Results
      </Button>

      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle>Assessment Results</CardTitle>
          <CardDescription>{assessment.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Result Summary */}
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className={`p-4 rounded-full ${passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {passed ? (
                <CheckCircle className="h-12 w-12" />
              ) : (
                <AlertCircle className="h-12 w-12" />
              )}
            </div>
            <h2 className="text-2xl font-bold">
              {passed ? "Congratulations!" : "Keep Practicing!"}
            </h2>
            <div className="text-center">
              <p className="text-lg">You scored {assessment.score} out of {assessment.totalQuestions}</p>
              <Progress value={percentage} className="h-3 mt-4 w-64" />
              <p className="text-muted-foreground mt-2">{percentage}%</p>
            </div>
            <Badge variant={passed ? "success" : "destructive"}>
              {passed ? "Passed" : "Not Passed"}
            </Badge>
          </div>

          {/* Question Review */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Question Review</h3>
            {(assessment.questions || []).map((question, index) => { // Safeguard with fallback array
              const isCorrect = question.userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className="border-0 shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Question {index + 1}</span>
                      {isCorrect ? (
                        <Badge variant="success">Correct</Badge>
                      ) : (
                        <Badge variant="destructive">Incorrect</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-3">{question.text}</p>
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <div
                          key={option.id}
                          className={`p-3 rounded-lg border ${
                            option.id === question.correctAnswer
                              ? "bg-green-50 border-green-200"
                              : option.id === question.userAnswer && !isCorrect
                              ? "bg-red-50 border-red-200"
                              : "bg-muted/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {option.id === question.correctAnswer ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : option.id === question.userAnswer && !isCorrect ? (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border border-gray-300" />
                            )}
                            <span>{option.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/assessment-results")}>
            Back to Results
          </Button>
          <Button onClick={() => navigate(`/assessment/${assessment.id}`)}>
            Retake Assessment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AssessmentResultDetailPage;