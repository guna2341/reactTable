import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    ArrowLeft,
    Save,
    FileText,
    Video,
    Image as ImageIcon,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Link,
    Download,
    Bookmark,
    Printer,
    Plus,
    Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

// Mock data - in a real app, you'd fetch this based on the ID
const learningUnits = [
    {
        id: '1',
        code: 'MATH-101',
        title: '    duction to Algebra',
        description: 'Basic algebraic concepts and operations',
        content: `
      Chapter 1: Basic Concepts<
        Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.
      
      1.1 Variables and Constants<
        A variable is a symbol (usually a letter) that represents a number that may change.
        A constant is a fixed value that does not change.
      
      1.2 Expressions and Equations
        An <strong>expression is a combination of variables, numbers and operations.
        An <strong>equation is a statement that two expressions are equal.
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

// Form validation schema
const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    code: z.string().min(3, {
        message: "Code must be at least 3 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    content: z.string().min(20, {
        message: "Content must be at least 20 characters.",
    }),
    contentType: z.enum(['text', 'video', 'image']),
    language: z.enum(['en', 'hi', 'ta']),
    status: z.enum(['draft', 'review', 'published']),
    tags: z.array(z.string()).optional(),
});

export function ContentEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the unit - in a real app, you'd fetch this from an API
    const unit = learningUnits.find(u => u.id === id);

    // Initialize form with default values
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: unit ? {
            title: unit.title,
            code: unit.code,
            description: unit.description,
            content: unit.content,
            contentType: unit.contentType,
            language: unit.language,
            status: unit.status,
            tags: unit.tags || [],
        } : {
            title: '',
            code: '',
            description: '',
            content: '',
            contentType: 'text',
            language: 'en',
            status: 'draft',
            tags: [],
        }
    });

    // Handle form submission
    function onSubmit(values) {
        // In a real app, you would make an API call here
        console.log('Form submitted with values:', values);

        toast({
            title: "Content updated successfully",
            description: `"${values.title}" has been saved.`,
        });

        // Navigate back to view page
        navigate(`/content/${id}`);
    }

    if (!unit) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
                <p className="text-muted-foreground mb-6">
                    The learning unit you're trying to edit doesn't exist.
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => navigate(`/content/${id}`)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to View
                </Button>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => form.reset()}>
                        <X className="h-4 w-4 mr-2" />
                        Discard Changes
                    </Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card className="bg-gradient-card border-0 shadow-soft">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Learning unit title"
                                                        className="text-2xl font-bold border-none p-4 shadow-none focus-visible:ring-0"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Brief description of the content"
                                                        className="border-none p-4 shadow-none focus-visible:ring-0 resize-none"
                                                        rows={2}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                        <Input
                                                           className="w-auto rounded-lg p-4 space-x-1"
                                                            {...field}
                                                        />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contentType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                            <SelectTrigger className="w-auto rounded-lg p-4 space-x-1">
                                                                    <SelectValue placeholder="Content type" />
                                                            </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="text">
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-4 w-4" />
                                                                Text
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="video">
                                                            <div className="flex items-center gap-2">
                                                                <Video className="h-4 w-4" />
                                                                Video
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="image">
                                                            <div className="flex items-center gap-2">
                                                                <ImageIcon className="h-4 w-4" />
                                                                Image
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-auto rounded-lg p-4 space-x-1">
                                                            <SelectValue placeholder="Status" />
                                                            </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">
                                                            <div className="flex items-center gap-2">
                                                                <AlertCircle className="h-4 w-4" />
                                                                Draft
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="review">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4" />
                                                                In Review
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="published">
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle className="h-4 w-4" />
                                                                Published
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="language"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-auto rounded-lg p-4 space-x-1">
                                                                <SelectValue placeholder="Language" />
                                                            </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="hi">हिंदी</SelectItem>
                                                        <SelectItem value="ta">தமிழ்</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardHeader>

                        <Separator className="mb-6" />

                        <CardContent>
                            <Tabs defaultValue="content" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="metadata">Metadata</TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="mt-6">
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Learning Content</FormLabel>
                                                <FormControl>
                                                    {form.watch('contentType') === 'video' ? (
                                                        <div className="space-y-4">
                                                            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                                                                <div className="text-white text-center p-6">
                                                                    <Video className="h-12 w-12 mx-auto mb-4" />
                                                                    <h3 className="text-xl font-semibold">Video Content</h3>
                                                                    <p className="text-muted-foreground">
                                                                        Video URL or upload would go here
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <Input
                                                                placeholder="Enter video URL or upload file"
                                                                {...field}
                                                            />
                                                        </div>
                                                    ) : form.watch('contentType') === 'image' ? (
                                                        <div className="space-y-4">
                                                            <div className="border rounded-lg p-4 bg-muted/20 flex flex-col items-center justify-center">
                                                                <ImageIcon className="h-24 w-24 text-muted-foreground mx-auto" />
                                                                <p className="text-center mt-2 text-muted-foreground">
                                                                    Upload or drag & drop image content
                                                                </p>
                                                            </div>
                                                            <Input
                                                                placeholder="Enter image URL or upload file"
                                                                {...field}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <Textarea
                                                            placeholder="Enter your learning content here (supports Markdown or HTML)"
                                                            className="min-h-[300px]"
                                                            {...field}
                                                        />
                                                    )}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                <TabsContent value="metadata" className="mt-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Tags</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <FormField
                                                    control={form.control}
                                                    name="tags"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {field.value?.map((tag, index) => (
                                                                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                                                                        {tag}
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            type="button"
                                                                            className="h-4 w-4"
                                                                            onClick={() => {
                                                                                const newTags = [...field.value];
                                                                                newTags.splice(index, 1);
                                                                                field.onChange(newTags);
                                                                            }}
                                                                        >
                                                                            <X className="h-3 w-3" />
                                                                        </Button>
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    placeholder="Add new tag"
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter' && e.currentTarget.value) {
                                                                            e.preventDefault();
                                                                            field.onChange([...(field.value || []), e.currentTarget.value]);
                                                                            e.currentTarget.value = '';
                                                                        }
                                                                    }}
                                                                />
                                                                <Button variant="outline" type="button">
                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                    Add
                                                                </Button>
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Related Resources</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    {unit.relatedResources.map((resource, i) => {
                                                        const Icon = getContentTypeIcon(resource.type);
                                                        return (
                                                            <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg">
                                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                                                <span className="flex-1">{resource.title}</span>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                                    <Button variant="outline" className="w-full">
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Related Resource
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>

                                <TabsContent value="attachments" className="mt-6">
                                    <div className="space-y-4">
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
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
                                                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                                                <h4 className="text-lg font-medium mb-2">No Attachments</h4>
                                                <p className="text-muted-foreground text-center mb-4">
                                                    Upload files to supplement this learning unit
                                                </p>
                                                <Button variant="outline">
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Upload Files
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="settings" className="mt-6">
                                    <div className="space-y-6">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Publishing Options</CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium">Make publicly available</h4>
                                                        <p className="text-muted-foreground text-sm">
                                                            Allow all users to access this content
                                                        </p>
                                                    </div>
                                                    <Switch />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium">Allow comments</h4>
                                                        <p className="text-muted-foreground text-sm">
                                                            Let students ask questions and discuss
                                                        </p>
                                                    </div>
                                                    <Switch />
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium">Enable downloads</h4>
                                                        <p className="text-muted-foreground text-sm">
                                                            Allow students to download content
                                                        </p>
                                                    </div>
                                                    <Switch defaultChecked />
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Advanced Settings</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="font-medium mb-2">Completion Criteria</h4>
                                                        <Select>
                                                            <SelectTrigger className="w-[280px]">
                                                                <SelectValue placeholder="Select completion criteria" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="view">View content</SelectItem>
                                                                <SelectItem value="quiz">Pass associated quiz</SelectItem>
                                                                <SelectItem value="both">Both view and quiz</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium mb-2">Prerequisites</h4>
                                                        <Select>
                                                            <SelectTrigger className="w-[280px]">
                                                                <SelectValue placeholder="Select prerequisite content" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {learningUnits
                                                                    .filter(u => u.id !== id)
                                                                    .map(unit => (
                                                                        <SelectItem key={unit.id} value={unit.id}>
                                                                            {unit.title}
                                                                        </SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}