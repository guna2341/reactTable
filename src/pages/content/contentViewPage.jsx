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
import { useContentStore } from '../../zustand/admin/contentUnits';

// Your actual data structure
export function ContentViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [adminAction, setAdminAction] = useState(null);

    const contentUnits = useContentStore(state => state.content);
    // Use the mock data instead of Zustand store
    const unit = contentUnits.find(u => u.id === id);

    // Mock admin check - in real app, this would come from user context/auth
    const isAdmin = true;

    const handleAdminAction = (action) => {
        // In a real app, this would be an API call
        console.log(`Admin ${action} content unit ${id}`);

        // Update the unit status (in a real app, this would update the store/database)
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

        if (unit?.reviewStatus == "completed") {
            if (unit?.correct == "yes") {
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

    const renderContent = () => {
        switch (unit.contentType) {
            case 'image':
                return (
                    <div className="flex justify-center my-4">
                        <img
                            src={unit.content}
                            alt="Content image"
                            className="max-h-[400px] rounded-lg object-contain"
                        />
                    </div>
                );
            case 'video':
                return (
                    <div className="aspect-video bg-black rounded-lg my-4">
                        <video controls className="w-full h-full">
                            <source src={unit.content} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );
            default:
                return (
                    <div
                        className="prose dark:prose-invert max-w-none mt-4"
                        dangerouslySetInnerHTML={{ __html: unit.content }}
                    />
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
                                    <Button variant="outline" className="border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800">
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
                                    <Button variant="outline" className="border-red-500 text-red-700 hover:bg-red-50 hover:text-red-800">
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
                    {unit.reviewStatus != "completed" &&

                        <Button variant="outline" onClick={() => navigate(`/reviews`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Review
                        </Button>
                    }
                    {unit.status == "rejected" && 
                        <Button variant="outline" onClick={() => navigate(`/reviews`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Add to Review
                        </Button>
                    }

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
                            <Button variant="outline" className="bg-muted/20">
                                {unit.code}
                            </Button>
                            <Button variant="outline">
                                <ContentIcon className="h-3 w-3 mr-1" />
                                {unit.contentType}
                            </Button>
                            <Button variant="outline">
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {unit.status}
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <Separator className="mb-6" />

                <CardContent>
                    <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content">
                            {renderContent()}
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
                                        <div className='pl-2 pb-4 mb-6 border-b'>
                                            {renderContent()}
                                        </div>
                                        {unit.questions ? (
                                            <div className="space-y-4">
                                                <div className="p-4 bg-muted/20 rounded-lg">
                                                    <h4 className="font-medium mb-3">Question:</h4>
                                                    <p className="text-lg">{unit.questions.question}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="font-medium">Type:</h4>
                                                    <Badge variant="outline">{unit.questions.type}</Badge>
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="font-medium">Topic:</h4>
                                                    <Badge variant="outline">{unit.questions.topic}</Badge>
                                                </div>

                                                <div className="space-y-2">
                                                    <h4 className="font-medium">Difficulty:</h4>
                                                    <Badge variant="outline" className={
                                                        unit.questions.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                                            unit.questions.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                    }>
                                                        {unit.questions.difficulty}
                                                    </Badge>
                                                </div>

                                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                                    <h4 className="font-medium mb-2 text-green-800">Correct Answer:</h4>
                                                    <p className="text-green-700">{unit.questions.correctAnswer}</p>
                                                </div>

                                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                    <h4 className="font-medium mb-2 text-blue-800">Explanation:</h4>
                                                    <p className="text-blue-700">{unit.questions.explanation}</p>
                                                </div>

                                                <div className="p-4 bg-muted/20 rounded-lg">
                                                    <h4 className="font-medium mb-2">Question Details:</h4>
                                                    <div className="space-y-1 text-sm text-muted-foreground">
                                                        <p>Created by: {unit.questions.createdBy}</p>
                                                        <p>Created at: {unit.questions.createdAt}</p>
                                                        <p>Review Status:
                                                            <Badge variant="outline" className={
                                                                unit.questions.reviewStatus === 'approved' ? 'bg-green-100 text-green-800 ml-2' :
                                                                    unit.questions.reviewStatus === 'pending' ? 'bg-yellow-100 text-yellow-800 ml-2' :
                                                                        'bg-red-100 text-red-800 ml-2'
                                                            }>
                                                                {unit.questions.reviewStatus}
                                                            </Badge>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-muted-foreground">No questions available</p>
                                            </div>
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