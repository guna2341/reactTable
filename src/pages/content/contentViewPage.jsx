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
    Link,
    Download,
    Share2,
    Bookmark,
    Printer,
    Edit
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - in a real app, you'd fetch this based on the ID
const learningUnits = [
    {
        id: '1',
        code: 'MATH-101',
        title: 'Introduction to Algebra',
        description: 'Basic algebraic concepts and operations',
        content: `
      <h2>Chapter 1: Basic Concepts</h2>
      <p>Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.</p>
      
      <h3>1.1 Variables and Constants</h3>
      <p>A <strong>variable</strong> is a symbol (usually a letter) that represents a number that may change.</p>
      <p>A <strong>constant</strong> is a fixed value that does not change.</p>
      
      <h3>1.2 Expressions and Equations</h3>
      <p>An <strong>expression</strong> is a combination of variables, numbers and operations.</p>
      <p>An <strong>equation</strong> is a statement that two expressions are equal.</p>
    `,
        contentType: 'text',
        language: 'en',
        status: 'published',
        questionsCount: 12,
        studentsEnrolled: 45,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        createdBy: 'Dr. Smith',
        tags: ['mathematics', 'beginner', 'core'],
        attachments: [
            { name: 'Worksheet.pdf', type: 'pdf', size: '2.4 MB' },
            { name: 'Practice Problems.docx', type: 'doc', size: '1.8 MB' }
        ],
        relatedResources: [
            { id: '2', title: 'Advanced Algebra Concepts', type: 'video' },
            { id: '4', title: 'Algebraic Equations Practice', type: 'text' }
        ]
    },
    // ... other mock units from your list
];

export function ContentViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the unit - in a real app, you'd fetch this from an API
    const unit = learningUnits.find(u => u.id === id);

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

    const getContentTypeIcon = (type) => {
        switch (type) {
            case 'video': return Video;
            case 'image': return ImageIcon;
            default: return FileText;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'published': return CheckCircle;
            case 'review': return Clock;
            case 'draft': return AlertCircle;
            default: return AlertCircle;
        }
    };

    const getLanguageLabel = (lang) => {
        switch (lang) {
            case 'hi': return 'हिंदी';
            case 'ta': return 'தமிழ்';
            default: return 'English';
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
                    <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <Button variant="outline">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Bookmark
                    </Button>
                    <Button variant="outline">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>
                    <Button onClick={() => navigate(`/content/${unit.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Content
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
                            <Badge variant="outline">
                                {getLanguageLabel(unit.language)}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <Separator className="mb-6" />

                <CardContent>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content">
                            {unit.contentType === 'video' ? (
                                <div className="aspect-video bg-black rounded-lg flex items-center justify-center mt-4">
                                    <div className="text-white text-center p-6">
                                        <Video className="h-12 w-12 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold">Video Content</h3>
                                        <p className="text-muted-foreground">
                                            This would be an embedded video player in a real application
                                        </p>
                                    </div>
                                </div>
                            ) : unit.contentType === 'image' ? (
                                <div className="flex justify-center mt-4">
                                    <div className="border rounded-lg p-4 bg-muted/20">
                                        <ImageIcon className="h-24 w-24 text-muted-foreground mx-auto" />
                                        <p className="text-center mt-2 text-muted-foreground">
                                            Image content would be displayed here
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="prose dark:prose-invert max-w-none mt-4"
                                    dangerouslySetInnerHTML={{ __html: unit.content }}
                                />
                            )}
                        </TabsContent>

                        <TabsContent value="questions">
                            <div className="space-y-4 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Associated Questions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            {unit.questionsCount} questions are associated with this learning unit.
                                        </p>
                                        <div className="mt-6 space-y-4">
                                            {/* Mock questions */}
                                            {[...Array(Math.min(3, unit.questionsCount))].map((_, i) => (
                                                <div key={i} className="border rounded-lg p-4">
                                                    <h4 className="font-medium">Question {i + 1}</h4>
                                                    <p className="text-muted-foreground text-sm mt-1">
                                                        This would display the actual question text in a real application
                                                    </p>
                                                    <div className="flex gap-2 mt-3">
                                                        <Badge variant="outline">Multiple Choice</Badge>
                                                        <Badge variant="outline">Difficulty: Medium</Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="outline" className="mt-6">
                                            View All Questions
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="attachments">
                            <div className="space-y-4 mt-4">
                                {unit.attachments && unit.attachments.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {unit.attachments.map((file, index) => (
                                            <Card key={index} className="hover:shadow-md transition-shadow">
                                                <CardContent className="p-4 flex items-center gap-4">
                                                    <div className="bg-muted/20 p-3 rounded-lg">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium truncate">{file.name}</h4>
                                                        <p className="text-muted-foreground text-sm">{file.size}</p>
                                                    </div>
                                                    <Button variant="ghost" size="icon">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                                        <h4 className="text-lg font-medium mb-2">No Attachments</h4>
                                        <p className="text-muted-foreground text-center">
                                            This learning unit doesn't have any additional files attached.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="details">
                            <div className="grid gap-6 md:grid-cols-2 mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Metadata</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground">Created By</h4>
                                                <p>{unit.createdBy}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground">Created On</h4>
                                                <p>{unit.createdAt}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                                                <p>{unit.updatedAt}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground">Students Enrolled</h4>
                                                <p>{unit.studentsEnrolled}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tags & Related</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {unit.tags && unit.tags.length > 0 ? (
                                                        unit.tags.map((tag, i) => (
                                                            <Badge key={i} variant="outline">
                                                                {tag}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <p className="text-muted-foreground">No tags assigned</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Related Resources</h4>
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
                                            </div>
                                        </div>
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