import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    FileText,
    Video,
    Image as ImageIcon,
    BookOpen,
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Link,
    Download,
    Share2,
    Bookmark,
    Printer,
    Edit,
    Eye,
    Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const contentUnits = [
    {
        id: '1',
        code: 'MATH-101',
        title: 'Introduction to Algebra',
        description: 'Basic algebraic concepts and operations',
        content: `
      <h1>Chapter 1: Basic Concepts</h1>
      <p>Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.</p>
      <h2>1.1 Variables and Constants</h2>
      <ul>
        <li><strong>Variable:</strong> A symbol (usually a letter) that represents a number that may change.</li>
        <li><strong>Constant:</strong> A fixed value that does not change.</li>
      </ul>
      <h2>1.2 Expressions and Equations</h2>
      <ul>
        <li><strong>Expression:</strong> A combination of variables, numbers and operations.</li>
        <li><strong>Equation:</strong> A statement that two expressions are equal.</li>
      </ul>
    `,
        contentType: 'html',
        explanation: 'Covers the basics of algebra including variables, constants, expressions, and equations.',
        language: 'en',
        status: 'published',
        questionsCount: 12,
        studentsEnrolled: 45,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        createdBy: 'Dr. Smith',
        correct: "no",
        attachments: [
            { name: 'Worksheet.pdf', type: 'pdf', size: '2.4 MB' },
            { name: 'Practice Problems.docx', type: 'doc', size: '1.8 MB' }
        ],
        relatedResources: [
            { id: '2', title: 'Advanced Algebra Concepts', type: 'video' },
            { id: '4', title: 'Algebraic Equations Practice', type: 'text' }
        ],
        minimumReviews: 3,
        totalRevies: 1,
        reviewStatus: 'pending',
        previewQuestion: {
            question: "What is the difference between a variable and a constant in algebra?",
            options: [
                "A variable can change, a constant cannot",
                "A constant can change, a variable cannot",
                "Both can change values",
                "Neither can change values"
            ],
            correctAnswer: 0,
            explanation: "A variable is a symbol that represents a value that can change, while a constant is a fixed value that remains the same."
        },
        comments: [
            {
                id: '1',
                user: 'Reviewer A',
                text: 'Clear and well-structured question.',
                type: 'approved',
                createdAt: '2024-01-16'
            }
        ]
    },
    {
        id: '2',
        code: 'MATH-102',
        title: 'Linear Equations',
        description: 'Solving and graphing linear equations',
        content: `
      <h1>Chapter 2: Linear Equations</h1>
      <p>Linear equations form the foundation of algebra and represent relationships with a constant rate of change.</p>
      <h2>2.1 Standard Form</h2>
      <ul>
        <li>Ax + By = C, where A, B, and C are real numbers.</li>
      </ul>
      <h2>2.2 Slope-Intercept Form</h2>
      <ul>
        <li>y = mx + b, where m is the slope and b is the y-intercept.</li>
      </ul>
      <h2>2.3 Graphing</h2>
      <ul>
        <li>Plotting the y-intercept and using the slope to find other points.</li>
      </ul>
    `,
        contentType: 'html',
        explanation: 'Introduces forms of linear equations and how to graph them using slope and intercept.',
        language: 'en',
        status: 'draft',
        questionsCount: 9,
        studentsEnrolled: 32,
        createdAt: '2024-02-01',
        updatedAt: '2024-02-05',
        createdBy: 'Prof. Allen',
        attachments: [
            { name: 'Graphing Worksheet.pdf', type: 'pdf', size: '1.2 MB' }
        ],
        relatedResources: [
            { id: '3', title: 'Graphing Lines Tutorial', type: 'video' }
        ],
        minimumReviews: 3,
        totalRevies: 0,
        correct: "no",
        reviewStatus: 'pending',
        previewQuestion: {
            question: "What is the slope-intercept form of a linear equation?",
            options: [
                "Ax + By = C",
                "y = mx + b",
                "x = my + b",
                "y = ax² + bx + c"
            ],
            correctAnswer: 1,
            explanation: "The slope-intercept form is y = mx + b, where m represents the slope and b represents the y-intercept."
        },
        comments: []
    },
    {
        id: '3',
        code: 'MATH-103',
        title: 'Quadratic Equations',
        description: 'Understanding and solving quadratic equations',
        content: `
      <h1>Chapter 3: Quadratic Equations</h1>
      <p>Quadratic equations involve terms up to the second degree and are solved using various methods.</p>
      <h2>3.1 Standard Form</h2>
      <ul>
        <li>ax² + bx + c = 0, where a, b, and c are real numbers and a ≠ 0.</li>
      </ul>
      <h2>3.2 Solving Methods</h2>
      <ul>
        <li>Factoring</li>
        <li>Completing the square</li>
        <li>Quadratic formula</li>
      </ul>
      <h2>3.3 Discriminant</h2>
      <ul>
        <li>b² - 4ac determines the nature of the roots.</li>
      </ul>
    `,
        contentType: 'html',
        explanation: 'Focuses on the structure of quadratic equations and the different methods used to solve them.',
        language: 'en',
        status: 'published',
        questionsCount: 14,
        studentsEnrolled: 39,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-15',
        createdBy: 'Ms. Kapoor',
        attachments: [
            { name: 'Quadratic Exercises.pdf', type: 'pdf', size: '2.1 MB' }
        ],
        relatedResources: [
            { id: '5', title: 'Quadratic Formula Explained', type: 'text' }
        ],
        minimumReviews: 3,
        totalRevies: 3,
        correct: "yes",
        reviewStatus: 'completed',
        previewQuestion: {
            question: "What is the discriminant of a quadratic equation ax² + bx + c = 0?",
            options: [
                "b² + 4ac",
                "b² - 4ac",
                "4ac - b²",
                "a² + b² + c²"
            ],
            correctAnswer: 1,
            explanation: "The discriminant is b² - 4ac, which determines the nature of the roots of the quadratic equation."
        },
        comments: [
            {
                id: '2',
                user: 'Reviewer B',
                text: 'Consider adding a real-world example.',
                type: 'suggestion',
                createdAt: '2024-03-16'
            },
            {
                id: '3',
                user: 'Reviewer C',
                text: 'Typo in the discriminant explanation.',
                type: 'flagged',
                createdAt: '2024-03-17'
            }
        ]
    }
];

export function ContentViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [adminAction, setAdminAction] = useState(null);

    const unit = contentUnits.find(u => u.id === id);

    // Mock admin check - in real app, this would come from user context/auth
    const isAdmin = true;

    const handleAdminAction = (action) => {
        // In a real app, this would be an API call
        console.log(`Admin ${action} content unit ${id}`);

        // Update the unit status
        if (action === 'approve') {
            unit.status = 'published';
            unit.correct = 'yes';
            unit.reviewStatus = 'completed';
        } else if (action === 'reject') {
            unit.status = 'rejected';
            unit.correct = 'no';
            unit.reviewStatus = 'rejected';
        }

        setAdminAction(null);
        // You might want to show a toast notification here
    };

    if (!unit) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
                <p className="text-muted-foreground mb-6">
                    The learning unit you're looking for doesn't exist or may have been removed.
                </p>
                <Button onClick={() => navigate('/content')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Content List
                </Button>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'published': return CheckCircle;
            case 'review': return Clock;
            case 'draft': return AlertCircle;
            default: return AlertCircle;
        }
    };

    const getReviewStatusBadge = () => {
        const approvedCount = unit.comments.filter(c => c.type === 'approved').length;
        const rejectedCount = unit.comments.filter(c => c.type === 'rejected').length;

        if (unit.totalRevies >= unit.minimumReviews) {
            if (approvedCount >= Math.ceil(unit.minimumReviews / 2)) {
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approved
                    </Badge>
                );
            } else {
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejected
                    </Badge>
                );
            }
        } else {
            return (
                <Badge className="bg-yellow-100 text-yellow-800">
                    <Clock className="h-4 w-4 mr-1" />
                    Pending ({unit.totalRevies}/{unit.minimumReviews} reviews)
                </Badge>
            );
        }
    };

    const getContentTypeIcon = (type) => {
        switch (type) {
            case 'video': return Video;
            case 'image': return ImageIcon;
            default: return FileText;
        }
    };

    const ContentIcon = getContentTypeIcon(unit.contentType);
    const StatusIcon = getStatusIcon(unit.status);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => navigate('/content')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Units
                </Button>

                <div className="flex gap-2">
                    {getReviewStatusBadge()}

                    {/* Admin Actions */}
                    {isAdmin && (
                        <div className="flex gap-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Admin Approve
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Approve Content Unit</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to approve this content unit? This will publish the content and make it available to students.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleAdminAction('approve')}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Approve
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Admin Reject
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Content Unit</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to reject this content unit? This will mark the content as rejected and prevent it from being published.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleAdminAction('reject')}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Reject
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}

                    <Button variant="outline" onClick={() => navigate(`/content/${id}/review`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Review
                    </Button>
                    <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <Button variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>
                </div>
            </div>

            <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                            <CardTitle className="text-2xl">{unit.title}</CardTitle>
                            <p className="text-muted-foreground mt-2">{unit.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-muted/20">
                                {unit.code}
                            </Badge>
                            <Badge variant="outline">
                                <ContentIcon className="h-3 w-3 mr-1" />
                                {unit.contentType}
                            </Badge>
                            <Badge variant="outline">
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {unit.status}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <Separator className="mb-6" />

                <CardContent>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content">
                            <div
                                className="prose dark:prose-invert max-w-none mt-4"
                                dangerouslySetInnerHTML={{ __html: unit.content }}
                            />
                            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                                <h4 className="font-medium mb-2">Explanation</h4>
                                <p>{unit.explanation}</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="preview">
                            <div className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Eye className="h-5 w-5" />
                                            Question Preview
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {unit.previewQuestion ? (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-muted/20 rounded-lg">
                                                    <h4 className="font-medium mb-3">Question:</h4>
                                                    <p className="text-lg">{unit.previewQuestion.question}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="font-medium">Options:</h4>
                                                    {unit.previewQuestion.options.map((option, index) => (
                                                        <div
                                                            key={index}
                                                            className={`p-3 rounded-lg border ${index === unit.previewQuestion.correctAnswer
                                                                    ? 'bg-green-50 border-green-200 text-green-800'
                                                                    : 'bg-background border-border'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium">
                                                                    {String.fromCharCode(65 + index)}.
                                                                </span>
                                                                <span>{option}</span>
                                                                {index === unit.previewQuestion.correctAnswer && (
                                                                    <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <h4 className="font-medium mb-2 text-blue-800">Explanation:</h4>
                                                    <p className="text-blue-700">{unit.previewQuestion.explanation}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-muted-foreground">No preview question available</p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="resources">
                            <div className="grid gap-6 md:grid-cols-2 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Attachments</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {unit.attachments && unit.attachments.length > 0 ? (
                                            <div className="space-y-2">
                                                {unit.attachments.map((file, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                        <span className="flex-1">{file.name}</span>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">No attachments</p>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Related Resources</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {unit.relatedResources && unit.relatedResources.length > 0 ? (
                                            <div className="space-y-2">
                                                {unit.relatedResources.map((resource, i) => {
                                                    const Icon = getContentTypeIcon(resource.type);
                                                    return (
                                                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                                            <span className="flex-1">{resource.title}</span>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <Link className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">No related resources</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}