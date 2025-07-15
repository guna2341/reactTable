import { create } from 'zustand';

export interface LearningUnit {
  id: string;
  code: string;
  title: string;
  contentType: 'text' | 'video' | 'image';
  content: string;
  language: 'en' | 'hi' | 'ta';
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  unitId: string;
  type: 'short_answer' | 'long_answer' | 'mcq' | 'match_following';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  reviewStatus: 'pending' | 'approved' | 'rejected';
  reviewers: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  questionId: string;
  reviewerId: string;
  status: 'approved' | 'rejected' | 'needs_edit';
  comments?: string;
  createdAt: string;
}

interface ContentState {
  units: LearningUnit[];
  questions: Question[];
  selectedUnit: LearningUnit | null;
  loading: boolean;
  setUnits: (units: LearningUnit[]) => void;
  setQuestions: (questions: Question[]) => void;
  setSelectedUnit: (unit: LearningUnit | null) => void;
  addUnit: (unit: LearningUnit) => void;
  updateUnit: (id: string, unit: Partial<LearningUnit>) => void;
  deleteUnit: (id: string) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, question: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  units: [],
  questions: [],
  selectedUnit: null,
  loading: false,
  setUnits: (units) => set({ units }),
  setQuestions: (questions) => set({ questions }),
  setSelectedUnit: (unit) => set({ selectedUnit: unit }),
  addUnit: (unit) => set((state) => ({ units: [...state.units, unit] })),
  updateUnit: (id, unitData) =>
    set((state) => ({
      units: state.units.map((unit) =>
        unit.id === id ? { ...unit, ...unitData } : unit
      ),
    })),
  deleteUnit: (id) =>
    set((state) => ({
      units: state.units.filter((unit) => unit.id !== id),
    })),
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (id, questionData) =>
    set((state) => ({
      questions: state.questions.map((question) =>
        question.id === id ? { ...question, ...questionData } : question
      ),
    })),
  deleteQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((question) => question.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
}));