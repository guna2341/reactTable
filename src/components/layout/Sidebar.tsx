import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Users,
  BarChart3,
  Settings,
  CheckSquare,
  PlusCircle,
  Library,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const { user } = useAuthStore();

  const adminNavItems = [
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/content', icon: BookOpen, label: 'Content Units' },
    { to: '/content/create', icon: PlusCircle, label: 'Create Unit' },
    { to: '/questions', icon: FileText, label: 'Questions' },
    { to: '/question-bank', icon: Library, label: 'Question Bank' },
    { to: '/reviews', icon: CheckSquare, label: 'Reviews' },
    { to: '/users', icon: Users, label: 'Users' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const reviewerNavItems = [
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/reviews', icon: CheckSquare, label: 'Reviews' },
    { to: '/question-bank', icon: Library, label: 'Question Bank' },
    { to: '/comments', icon: MessageSquare, label: 'Comments' },
  ];

  const studentNavItems = [
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/learn', icon: BookOpen, label: 'Learning Units' },
    { to: '/assessments', icon: FileText, label: 'Assessments' },
    { to: '/results', icon: BarChart3, label: 'My Results' },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminNavItems;
      case 'reviewer':
        return reviewerNavItems;
      case 'student':
        return studentNavItems;
      default:
        return studentNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-gradient-card border-r h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            ContentHub
          </h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )
              }
            >
              <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-secondary/10 rounded-lg p-4 text-center">
          <h3 className="font-semibold text-sm mb-1">Need Help?</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Check our documentation for guidance
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Documentation
          </Button>
        </div>
      </div>
    </aside>
  );
}