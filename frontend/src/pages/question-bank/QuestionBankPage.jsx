import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  MessageSquare, 
  ThumbsUp, 
  Edit, 
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [expandedTopics, setExpandedTopics] = useState(['math']);

  // Mock data for question hierarchy
  const questionTopics = [
    {
      id: 'math',
      name: 'Mathematics',
      children: [
        {
          id: 'algebra',
          name: 'Algebra',
          children: [
            { id: 'basic-algebra', name: 'Basic Operations', questionCount: 25 },
            { id: 'equations', name: 'Linear Equations', questionCount: 18 },
            { id: 'quadratic', name: 'Quadratic Equations', questionCount: 12 }
          ]
        },
        {
          id: 'geometry',
          name: 'Geometry',
          children: [
            { id: 'basic-shapes', name: 'Basic Shapes', questionCount: 15 },
            { id: 'triangles', name: 'Triangles', questionCount: 22 }
          ]
        }
      ]
    },
    {
      id: 'science',
      name: 'Science',
      children: [
        {
          id: 'physics',
          name: 'Physics',
          children: [
            { id: 'mechanics', name: 'Mechanics', questionCount: 30 },
            { id: 'electricity', name: 'Electricity', questionCount: 20 }
          ]
        }
      ]
    }
  ];

  // Mock questions
  const questions = [
    {
      id: '1',
      question: 'Solve for x: 2x + 5 = 13',
      type: 'MCQ',
      topic: 'basic-algebra',
      difficulty: 'Easy',
      options: ['x = 4', 'x = 6', 'x = 8', 'x = 9'],
      correctAnswer: 'A',
      explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
      reviewStatus: 'approved',
      createdBy: 'Dr. Smith',
      createdAt: '2024-01-15',
      comments: [
        {
          id: '1',
          user: 'Reviewer A',
          text: 'Clear and well-structured question.',
          type: 'approved',
          createdAt: '2024-01-16'
        }
      ],
      mistakes: []
    },
    {
      id: '2',
      question: 'What is the area of a triangle with base 10 cm and height 8 cm?',
      type: 'Short Answer',
      topic: 'triangles',
      difficulty: 'Medium',
      correctAnswer: '40 square cm',
      explanation: 'Area of triangle = (1/2) × base × height = (1/2) × 10 × 8 = 40 sq cm',
      reviewStatus: 'pending',
      createdBy: 'Prof. Johnson',
      createdAt: '2024-01-18',
      comments: [
        {
          id: '2',
          user: 'Reviewer B',
          text: 'Consider adding a diagram for better understanding.',
          type: 'suggestion',
          createdAt: '2024-01-19'
        }
      ],
      mistakes: []
    },
    {
      id: '3',
      question: 'Explain Newton first law of motion with an example.',
      type: 'Long Answer',
      topic: 'mechanics',
      difficulty: 'Hard',
      correctAnswer: 'An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.',
      explanation: 'This law describes inertia - the tendency of objects to resist changes in their state of motion.',
      reviewStatus: 'needs_review',
      createdBy: 'Dr. Williams',
      createdAt: '2024-01-20',
      comments: [
        {
          id: '3',
          user: 'Reviewer C',
          text: 'The question is good but needs more specific criteria for evaluation.',
          type: 'needs_edit',
          createdAt: '2024-01-21'
        }
      ],
      mistakes: ['vague-criteria']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success';
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'needs_review':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success/10 text-success';
      case 'Medium':
        return 'bg-warning/10 text-warning';
      case 'Hard':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'MCQ':
        return 'bg-primary/10 text-primary';
      case 'Short Answer':
        return 'bg-secondary/10 text-secondary';
      case 'Long Answer':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleAddComment = (questionId) => {
    // Handle comment submission
    console.log('Adding comment to question:', questionId, commentText);
    setCommentText('');
    setShowCommentBox(null);
  };

  const renderTopicTree = (topics, level = 0) => {
    return topics.map(topic => (
      <div key={topic.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <Collapsible 
          open={expandedTopics.includes(topic.id)} 
          onOpenChange={() => toggleTopic(topic.id)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start h-auto p-2 font-normal"
            >
              {topic.children ? (
                expandedTopics.includes(topic.id) ? (
                  <ChevronDown className="h-4 w-4 mr-1" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-1" />
                )
              ) : (
                <div className="w-5" />
              )}
              <span>{topic.name}</span>
              {topic.questionCount && (
                <Badge variant="outline" className="ml-auto">
                  {topic.questionCount}
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>
          {topic.children && (
            <CollapsibleContent>
              {renderTopicTree(topic.children, level + 1)}
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground">
            Organize and manage questions by topic hierarchy
          </p>
        </div>
        <Button >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topic Hierarchy Sidebar */}
        <Card className="lg:col-span-1 bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Topics</CardTitle>
            <CardDescription>Browse questions by topic</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-1">
              <Button
                variant={selectedTopic === 'all' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedTopic('all')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                All Topics
              </Button>
              {renderTopicTree(questionTopics)}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id} className="bg-gradient-card border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Question Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className={getTypeColor(question.type)}>
                            {question.type}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(question.reviewStatus)}>
                            {question.reviewStatus.replace('_', ' ')}
                          </Badge>
                          {question.mistakes.length > 0 && (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Has Issues
                            </Badge>
                          )}
                        </div>
                        
                        <div 
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: question.question }}
                        />
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span>By {question.createdBy}</span>
                          <span>•</span>
                          <span>{question.createdAt}</span>
                          <span>•</span>
                          <span>{question.comments.length} comments</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* MCQ Options */}
                    {question.type === 'MCQ' && question.options && (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Answer Options:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {question.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${
                                question.correctAnswer === String.fromCharCode(65 + index) 
                                  ? 'text-success' : 'text-muted-foreground'
                              }`}>
                                {String.fromCharCode(65 + index)}.
                              </span>
                              <span className={
                                question.correctAnswer === String.fromCharCode(65 + index) 
                                  ? 'text-success font-medium' : ''
                              }>
                                {option}
                              </span>
                              {question.correctAnswer === String.fromCharCode(65 + index) && (
                                <Badge variant="outline" className="bg-success/10 text-success ml-auto">
                                  Correct
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-medium text-sm mb-2">Explanation:</h4>
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    )}

                    {/* Comments Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Comments ({question.comments.length})</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCommentBox(showCommentBox === question.id ? null : question.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Add Comment
                        </Button>
                      </div>

                      {/* Existing Comments */}
                      {question.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/20 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{comment.user}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                              {comment.type === 'approved' && <ThumbsUp className="h-3 w-3 text-success" />}
                              {comment.type === 'needs_edit' && <Edit className="h-3 w-3 text-warning" />}
                            </div>
                          </div>
                          <p className="text-sm">{comment.text}</p>
                        </div>
                      ))}

                      {/* Add Comment Box */}
                      {showCommentBox === question.id && (
                        <div className="space-y-3">
                          <RichTextEditor
                            content={commentText}
                            onChange={setCommentText}
                            placeholder="Add your review comment... You can use rich text, code blocks, and mathematical formulas."
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowCommentBox(null)}>
                              Cancel
                            </Button>
                            <Button onClick={() => handleAddComment(question.id)}>
                              Add Comment
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
