import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  ThumbsUp,
  ThumbsDown,
  Edit,
  Flag,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ContentReviewComponent } from '../content/ContentReview';

export function ReviewsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pending');
  const [reviewComments, setReviewComments] = useState({});

  const pendingQuestions = [
    {
      id: '1',
      question: 'What is the chemical formula for water?',
      type: 'MCQ',
      kind:"passage",
      unit: 'Chemistry Basics',
      topic: 'Molecular Formulas',
      options: ['H2O', 'CO2', 'NaCl', 'CH4'],
      correctAnswer: 'A',
      explanation: 'Water consists of two hydrogen atoms and one oxygen atom.',
      submittedBy: 'Content Creator A',
      submittedAt: '2024-01-20',
      priority: 'medium',
      reviewsCompleted: 1,
      reviewsNeeded: 3,
      existingReviews: [
        {
          reviewer: 'Reviewer B',
          status: 'approved',
          comment: 'Clear and accurate question.',
          timestamp: '2024-01-21'
        }
      ]
    },
    {
      id: '2',
      question: 'Explain the process of photosynthesis in detail.',
      type: 'Long Answer',
      kind: "question bank",
      unit: 'Biology Fundamentals',
      topic: 'Plant Biology',
      correctAnswer:
        'Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen...',
      explanation:
        'This process occurs in chloroplasts and involves light-dependent and light-independent reactions.',
      submittedBy: 'Dr. Smith',
      submittedAt: '2024-01-19',
      priority: 'high',
      reviewsCompleted: 0,
      reviewsNeeded: 3,
      existingReviews: []
    },
    {
      id: '3',
      question: 'Solve: ∫(2x + 3)dx',
      type: 'Short Answer',
      kind: "question bank",
      unit: 'Advanced Mathematics',
      topic: 'Calculus',
      correctAnswer: 'x² + 3x + C',
      explanation:
        'Using the power rule of integration: ∫2x dx = x² and ∫3 dx = 3x',
      submittedBy: 'Prof. Johnson',
      submittedAt: '2024-01-18',
      priority: 'low',
      reviewsCompleted: 2,
      reviewsNeeded: 3,
      existingReviews: [
        {
          reviewer: 'Reviewer A',
          status: 'approved',
          comment: 'Mathematical notation is correct.',
          timestamp: '2024-01-19'
        },
        {
          reviewer: 'Reviewer C',
          status: 'needs_edit',
          comment: 'Consider adding step-by-step solution.',
          timestamp: '2024-01-20'
        }
      ]
    }
  ];

  const completedReviews = [
    {
      id: '4',
      question: 'What is the capital of France?',
      type: 'MCQ',
      kind: "passage",
      unit: 'World Geography',
      reviewedAt: '2024-01-15',
      finalStatus: 'approved',
      myReview: 'approved',
      myComment: 'Straightforward geography question.'
    },
    {
      id: '5',
      question: 'Describe the causes of World War I.',
      type: 'Long Answer',
      kind: "question bank",
      unit: 'Modern History',
      reviewedAt: '2024-01-12',
      finalStatus: 'needs_revision',
      myReview: 'needs_edit',
      myComment: 'Question needs more specific focus. Too broad as written.'
    }
  ];

  const handleReview = (questionId, status) => {
    const comment = reviewComments[questionId] || '';

    if (!comment.trim()) {
      toast({
        title: 'Comment Required',
        description: 'Please add a comment explaining your review decision.',
        variant: 'destructive'
      });
      return;
    }

    setTimeout(() => {
      toast({
        title: 'Review Submitted',
        description: `Question has been ${status.replace('_', ' ')}.`
      });

      setReviewComments((prev) => ({ ...prev, [questionId]: '' }));
    }, 500);
  };

  const handleCommentChange = (questionId, content) => {
    setReviewComments((prev) => ({ ...prev, [questionId]: content }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-success/10 text-success';
      case 'rejected':
        return 'bg-destructive/10 text-destructive';
      case 'needs_edit':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <ContentReviewComponent/>
    </div>
  );
}
