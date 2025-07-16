import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Video, 
  Image as ImageIcon,
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ContentListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for learning units
  const learningUnits = [
    {
      id: '1',
      code: 'MATH-101',
      title: 'Introduction to Algebra',
      description: 'Basic algebraic concepts and operations',
      contentType: 'text',
      language: 'en',
      status: 'published',
      questionsCount: 12,
      studentsEnrolled: 45,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      createdBy: 'Dr. Smith'
    },
    {
      id: '2',
      code: 'SCI-201',
      title: 'Water Cycle Explained',
      description: 'Understanding the natural water cycle process',
      contentType: 'video',
      language: 'en',
      status: 'review',
      questionsCount: 8,
      studentsEnrolled: 0,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      createdBy: 'Prof. Johnson'
    },
    {
      id: '3',
      code: 'LANG-301',
      title: 'हिंदी व्याकरण मूल बातें',
      description: 'Hindi grammar fundamentals and sentence structure',
      contentType: 'text',
      language: 'hi',
      status: 'draft',
      questionsCount: 15,
      studentsEnrolled: 0,
      createdAt: '2024-01-19',
      updatedAt: '2024-01-19',
      createdBy: 'Mrs. Sharma'
    },
    {
      id: '4',
      code: 'HIST-401',
      title: 'Ancient Civilizations',
      description: 'Overview of major ancient civilizations',
      contentType: 'image',
      language: 'en',
      status: 'published',
      questionsCount: 20,
      studentsEnrolled: 67,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-22',
      createdBy: 'Dr. Williams'
    }
  ];

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return ImageIcon;
      default: return FileText;
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-secondary/10 text-secondary';
      case 'image': return 'bg-accent/10 text-accent';
      default: return 'bg-primary/10 text-primary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'review completed':
        return 'bg-success/10 text-success';
      case 'review':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return CheckCircle;
      case 'review':
        return Clock;
      case 'draft':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case 'hi': return 'हिंदी';
      case 'ta': return 'தமிழ்';
      default: return 'English';
    }
  };

  const filteredUnits = learningUnits.filter(unit => {
    const matchesSearch = unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         unit.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = languageFilter === 'all' || unit.language === languageFilter;
    const matchesStatus = statusFilter === 'all' || unit.status === statusFilter;
    
    return matchesSearch && matchesLanguage && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Units</h1>
          <p className="text-muted-foreground">
            Manage educational content and associated questions
          </p>
        </div>
        <Button onClick={() => navigate('/content/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Unit
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card border-0 shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search units by title or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Units</span>
            </div>
            <p className="text-2xl font-bold mt-1">{learningUnits.length}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Published</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {learningUnits.filter(u => u.status === 'published').length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">In Review</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {learningUnits.filter(u => u.status === 'review').length}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Total Students</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {learningUnits.reduce((acc, unit) => acc + unit.studentsEnrolled, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {filteredUnits.map((unit) => {
          const ContentIcon = getContentTypeIcon(unit.contentType);
          const StatusIcon = getStatusIcon(unit.status);
          
          return (
            <Card key={unit.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="bg-muted/20">
                        {unit.code}
                      </Badge>
                      <Badge variant="outline" className={getContentTypeColor(unit.contentType)}>
                        <ContentIcon className="h-3 w-3 mr-1" />
                        {unit.contentType}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(unit.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {unit.status}
                      </Badge>
                      <Badge variant="outline">
                        {getLanguageLabel(unit.language)}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-1">{unit.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{unit.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>{unit.questionsCount} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{unit.studentsEnrolled} students</span>
                      </div>
                      <div>
                        <span>By {unit.createdBy}</span>
                      </div>
                      <div>
                        <span>Updated {unit.updatedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/content/${unit.id}`)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/content/${unit.id}/edit`)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredUnits.length === 0 && (
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No learning units found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || languageFilter !== 'all' || statusFilter !== 'all' 
                ? 'Try adjusting your search filters'
                : 'Create your first learning unit to get started'
              }
            </p>
            {!searchQuery && languageFilter === 'all' && statusFilter === 'all' && (
              <Button onClick={() => navigate('/content/create')} variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Create First Unit
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}