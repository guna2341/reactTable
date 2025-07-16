import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  FileText, 
  Video, 
  Image as ImageIcon,
  BookOpen 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CreateContentPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    contentType: 'text',
    content: '',
    language: 'en',
    description: '',
  });
  
  const [questions, setQuestions] = useState([
    {
      id: '1',
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
    }
  ]);
  
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleFileSelect = (files) => {
    setUploadedFiles(files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, contentType: 'video' }));
      } else if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, contentType: 'image' }));
      }
    }
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateQuestionOption = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTimeout(() => {
      toast({
        title: 'Learning Unit Created!',
        description: `"${formData.title}" has been created successfully and sent for review.`,
      });
      navigate('/content');
    }, 1000);
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return ImageIcon;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/content')}>
          <ArrowLeft className="!h-8 !w-8" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Learning Unit</h1>
          <p className="text-muted-foreground">
            Add new educational content with associated questions
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Set up the fundamental details of your learning unit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Unit Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g., MATH-101"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi (हिंदी)</SelectItem>
                    <SelectItem value="ta">Tamil (தமிழ்)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter the learning unit title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what students will learn"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Type Selection */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle>Content Type</CardTitle>
            <CardDescription>
              Choose how you want to deliver this learning content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { type: 'text', label: 'Text Content', icon: FileText, desc: 'Written content with rich formatting' },
                { type: 'video', label: 'Video Content', icon: Video, desc: 'Upload educational videos' },
                { type: 'image', label: 'Image Content', icon: ImageIcon, desc: 'Visual learning materials' },
              ].map((option) => {
                const Icon = option.icon;
                const isSelected = formData.contentType === option.type;
                return (
                  <Button
                    key={option.type}
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => setFormData(prev => ({ ...prev, contentType: option.type}))}
                  >
                    <Icon className={`h-6 w-6 ${isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    <div className="text-center">
                      <div className="font-medium">{option.label}</div>
                      <div className={`text-xs ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {option.desc}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>

            {/* Content Input Based on Type */}
            {formData.contentType === 'text' && (
              <div className="space-y-2">
                <Label>Text Content *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your educational content here. Use the toolbar for formatting, code blocks, and mathematical formulas..."
                  className="min-h-[300px] p-0"
                />
              </div>
            )}

            {(formData.contentType === 'video' || formData.contentType === 'image') && (
              <div className="space-y-2">
                <Label>Upload {formData.contentType === 'video' ? 'Video' : 'Image'} *</Label>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  accept={formData.contentType === 'video' 
                    ? { 'video/*': ['.mp4', '.webm', '.ogg'] }
                    : { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] }
                  }
                  maxSize={formData.contentType === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024} // 100MB for video, 10MB for images
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Questions Section */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Associated Questions</CardTitle>
                <CardDescription>
                  Add questions that students will answer after reviewing the content
                </CardDescription>
              </div>
              <Button type="button" onClick={addQuestion} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Question {index + 1}</Badge>
                  {questions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select 
                      value={question.type} 
                      onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">Multiple Choice (MCQ)</SelectItem>
                        <SelectItem value="short_answer">Short Answer</SelectItem>
                        <SelectItem value="long_answer">Long Answer</SelectItem>
                        <SelectItem value="match_following">Match the Following</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Question Text *</Label>
                  <RichTextEditor
                    content={question.question}
                    onChange={(content) => updateQuestion(question.id, 'question', content)}
                    placeholder="Enter your question here..."
                  />
                </div>

                {question.type === 'mcq' && (
                  <div className="space-y-3">
                    <Label>Answer Options</Label>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <span className="text-sm font-medium w-8">{String.fromCharCode(65 + optIndex)}.</span>
                        <Input
                          placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                          value={option}
                          onChange={(e) => updateQuestionOption(question.id, optIndex, e.target.value)}
                        />
                      </div>
                    ))}
                    
                    <div className="space-y-2">
                      <Label>Correct Answer</Label>
                      <Select 
                        value={question.correctAnswer}
                        onValueChange={(value) => updateQuestion(question.id, 'correctAnswer', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options.map((_, optIndex) => (
                            <SelectItem key={optIndex} value={String.fromCharCode(65 + optIndex)}>
                              Option {String.fromCharCode(65 + optIndex)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {(question.type === 'short_answer' || question.type === 'long_answer') && (
                  <div className="space-y-2">
                    <Label>Expected Answer/Keywords</Label>
                    <Textarea
                      placeholder="Provide the expected answer or key points for evaluation"
                      value={question.correctAnswer}
                      onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                      rows={question.type === 'long_answer' ? 4 : 2}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Explanation (Optional)</Label>
                  <RichTextEditor
                    content={question.explanation}
                    onChange={(content) => updateQuestion(question.id, 'explanation', content)}
                    placeholder="Provide an explanation for the correct answer..."
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Section */}
        <div className="flex items-center justify-between p-6 bg-gradient-card rounded-lg border-0 shadow-soft">
          <div>
            <p className="font-medium">Ready to create learning unit?</p>
            <p className="text-sm text-muted-foreground">
              This will be sent for review by 3 reviewers before being available to students.
            </p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => navigate('/content')}>
              Cancel
            </Button>
            <Button type="submit" variant="hero">
              <Save className="h-4 w-4 mr-2" />
              Create Unit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}