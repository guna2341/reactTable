import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { CreateContentPage } from "@/pages/content/CreateContentPage";
import { ContentListPage } from "@/pages/content/ContentListPage";
import { QuestionBankPage } from "@/pages/question-bank/QuestionBankPage";
import { ReviewsPage } from "@/pages/reviews/ReviewsPage";
import { useAuthStore } from "@/stores/authStore";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            {/* Content Management Routes */}
            <Route path="content" element={<ContentListPage />} />
            <Route path="content/create" element={<CreateContentPage />} />
            <Route path="content/:id" element={<div>View Content Page</div>} />
            <Route path="content/:id/edit" element={<div>Edit Content Page</div>} />
            
            {/* Question Management Routes */}
            <Route path="questions" element={<div>Questions Page</div>} />
            <Route path="question-bank" element={<QuestionBankPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            
            {/* Student Routes */}
            <Route path="learn" element={<div>Learning Units Page</div>} />
            <Route path="learn/:id" element={<div>Unit Detail Page</div>} />
            <Route path="assessments" element={<div>Assessments Page</div>} />
            <Route path="results" element={<div>Results Page</div>} />
            
            {/* Admin Routes */}
            <Route path="users" element={<div>Users Management Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
            <Route path="comments" element={<div>Comments Page</div>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
