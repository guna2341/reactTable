import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
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
    Download,
    Plus,
    Trash2,
    Upload,
    Edit,
    Eye,
    HelpCircle
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
import { toast } from '@/components/ui/use-toast';
import { useContentStore } from '../../zustand/admin/contentUnits';

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
    explanation: z.string().min(10, {
        message: "Explanation must be at least 10 characters.",
    }),
    contentType: z.enum(['text', 'video', 'image']),
    language: z.enum(['en', 'hi', 'ta']),
    status: z.enum(['draft', 'review', 'published']),
    tags: z.array(z.string()).optional(),
    question: z.object({
        question: z.string().min(5, "Question must be at least 5 characters"),
        type: z.string().min(1, "Type is required"),
        topic: z.string().min(1, "Topic is required"),
        difficulty: z.enum(['Easy', 'Medium', 'Hard']),
        correctAnswer: z.string().min(1, "Correct answer is required"),
        explanation: z.string().min(5, "Explanation must be at least 5 characters"),
    }).optional(),
});

export function ContentEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newTag, setNewTag] = useState('');
    const [loading, setLoading] = useState(true);
    const contentUnits = useContentStore(state => state.content);
    const unit = contentUnits.find(u => u.id === id);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: unit ? {
            title: unit.title,
            code: unit.code,
            description: unit.description,
            content: unit.content,
            explanation: unit.explanation || '',
            contentType: unit.contentType,
            language: unit.language || 'en',
            status: unit.status,
            tags: unit.tags || [],
            question: unit.questions ? {
                question: unit.questions.question,
                type: unit.questions.type,
                topic: unit.questions.topic,
                difficulty: unit.questions.difficulty,
                correctAnswer: unit.questions.correctAnswer,
                explanation: unit.questions.explanation,
            } : undefined
        } : {
            title: '',
            code: '',
            description: '',
            content: '',
            explanation: '',
            contentType: 'text',
            language: 'en',
            status: 'draft',
            tags: [],
        }
    });

    function onSubmit(values) {
        console.log('Form submitted with values:', values);

        toast({
            title: "Content updated successfully",
            description: `"${values.title}" has been saved.`,
        });

        navigate(`/content/${id}`);
    }

    const handleAddTag = () => {
        if (newTag.trim() && !form.getValues('tags').includes(newTag.trim())) {
            const currentTags = form.getValues('tags') || [];
            form.setValue('tags', [...currentTags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        const currentTags = form.getValues('tags') || [];
        form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
    };

    if (!unit) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
                <p className="text-muted-foreground mb-6">
                    The learning unit you're trying to edit doesn't exist or may have been removed.
                </p>
                <Button onClick={() => navigate('/content')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Content List
                </Button>
            </div>
        );
    }

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
                                                        className="text-2xl font-bold border-none shadow-none focus-visible:ring-0"
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
                                                        className="border-none shadow-none focus-visible:ring-0 resize-none text-muted-foreground"
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
                                                        placeholder="Code"
                                                        className="w-auto"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
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
                                                        <SelectTrigger className="w-auto">
                                                            <SelectValue placeholder="Content type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="text">
                                                            <div className="flex items-center gap-2">
                                                                <FileText className="h-4 w-4" />
                                                                text
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="video">
                                                            <div className="flex items-center gap-2">
                                                                <Video className="h-4 w-4" />
                                                                video
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="image">
                                                            <div className="flex items-center gap-2">
                                                                <ImageIcon className="h-4 w-4" />
                                                                image
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
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
                                                        <SelectTrigger className="w-auto">
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">
                                                            <div className="flex items-center gap-2">
                                                                <AlertCircle className="h-4 w-4" />
                                                                draft
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="review">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4" />
                                                                review
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="published">
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle className="h-4 w-4" />
                                                                published
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardHeader>

                        <Separator className="mb-6" />

                        <CardContent>
                            <Tabs defaultValue="content" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="questions">Questions</TabsTrigger>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="mt-6">
                                    <div className="space-y-6">
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
                                                                <div className="border rounded-lg p-4 bg-muted/20 flex flex-col items-center justify-center min-h-[200px]">
                                                                    {loading &&
                                                                        <ImageIcon className="h-24 w-24 text-muted-foreground mx-auto" />
                                                                    }
                                                                    <img
                                                                        onLoad={() => setLoading(false)}
                                                                        loading='lazy'
                                                                        src={field.value}
                                                                    />
                                                                </div>
                                                                <Input
                                                                    placeholder="Enter image URL or upload file"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <RichTextEditor
                                                                content={field.value}
                                                                onChange={field.onChange}
                                                                placeholder="Enter your learning content here (supports HTML)"
                                                                className="min-h-[300px]"
                                                            />
                                                        )}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="explanation"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Explanation</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Provide a detailed explanation of the content"
                                                            className="min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>



                                <TabsContent value="questions">
                                    <div className="mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <HelpCircle className="h-5 w-5" />
                                                    Question Editor
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="question.question"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Question Text</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Enter the question text"
                                                                    className="min-h-[80px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="question.type"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Type</FormLabel>
                                                                <FormControl>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select question type" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Short Answer">Short Answer</SelectItem>
                                                                            <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                                                                            <SelectItem value="True/False">True/False</SelectItem>
                                                                            <SelectItem value="Essay">Essay</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="question.topic"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Topic</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter topic" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="question.difficulty"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Difficulty</FormLabel>
                                                                <FormControl>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select difficulty" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Easy">Easy</SelectItem>
                                                                            <SelectItem value="Medium">Medium</SelectItem>
                                                                            <SelectItem value="Hard">Hard</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="question.correctAnswer"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Correct Answer</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Enter the correct answer"
                                                                    className="min-h-[60px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="question.explanation"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Explanation</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="Explain why this is the correct answer"
                                                                    className="min-h-[80px]"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="preview">
                                    <div className="mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Eye className="h-5 w-5" />
                                                    Content Preview
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-muted/20 rounded-lg">
                                                        <h4 className="font-medium mb-3">Content:</h4>
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
                                                                                <div className="border rounded-lg p-4 bg-muted/20 flex flex-col items-center justify-center min-h-[200px]">
                                                                                    {loading &&
                                                                                        <ImageIcon className="h-24 w-24 text-muted-foreground mx-auto" />
                                                                                    }
                                                                                    <img
                                                                                        onLoad={() => setLoading(false)}
                                                                                        loading='lazy'
                                                                                        src={field.value}
                                                                                    />
                                                                                </div>
                                                                                <Input
                                                                                    {...field}
                                                                                    disabled
                                                                                    placeholder="Enter image URL or upload file"
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <div
                                                                                dangerouslySetInnerHTML={{ __html: field.value }}
                                                                            >

                                                                            </div>
                                                                        )}
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    {form.watch('explanation') && (
                                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                            <h4 className="font-medium mb-2 text-blue-800">Explanation:</h4>
                                                            <p className="text-blue-700">{form.watch('explanation')}</p>
                                                        </div>
                                                    )}

                                                    <div className="p-4 bg-muted/20 rounded-lg">
                                                        <h4 className="font-medium mb-2">Content Details:</h4>
                                                        <div className="space-y-1 text-sm text-muted-foreground">
                                                            <p>Code: {form.watch('code')}</p>
                                                            <p>Type: {form.watch('contentType')}</p>
                                                            <p>Status: {form.watch('status')}</p>
                                                            <p>Language: {form.watch('language')}</p>
                                                        </div>
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