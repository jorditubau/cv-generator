import { create } from 'zustand';
import { CVData, AppSettings, TemplateType } from '../types/cv.types';
import { defaultCVData } from '../utils/sampleData';

interface HistoryEntry {
  cvData: CVData;
}

interface CVStore {
  cvData: CVData;
  settings: AppSettings;
  history: HistoryEntry[];
  historyIndex: number;

  // CV data actions
  updatePersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (experience: CVData['experience']) => void;
  updateEducation: (education: CVData['education']) => void;
  updateSkills: (skills: CVData['skills']) => void;
  updateProjects: (projects: CVData['projects']) => void;
  updateCertifications: (certifications: CVData['certifications']) => void;
  loadCV: (data: CVData) => void;

  // Settings actions
  setTemplate: (template: TemplateType) => void;
  setAccentColor: (color: string) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Computed
  getCompletionPercentage: () => number;
}

const MAX_HISTORY = 50;

const pushHistory = (state: CVStore, newData: CVData): Partial<CVStore> => {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push({ cvData: state.cvData });
  if (newHistory.length > MAX_HISTORY) newHistory.shift();
  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
    cvData: newData,
  };
};

export const useCVStore = create<CVStore>((set, get) => ({
  cvData: defaultCVData,
  settings: {
    template: 'classic',
    accentColor: '#2563eb',
  },
  history: [],
  historyIndex: -1,

  updatePersonalInfo: (info) =>
    set((state) => {
      const newData = {
        ...state.cvData,
        personalInfo: { ...state.cvData.personalInfo, ...info },
      };
      return pushHistory(state, newData);
    }),

  updateSummary: (summary) =>
    set((state) => {
      const newData = { ...state.cvData, summary };
      return pushHistory(state, newData);
    }),

  updateExperience: (experience) =>
    set((state) => {
      const newData = { ...state.cvData, experience };
      return pushHistory(state, newData);
    }),

  updateEducation: (education) =>
    set((state) => {
      const newData = { ...state.cvData, education };
      return pushHistory(state, newData);
    }),

  updateSkills: (skills) =>
    set((state) => {
      const newData = { ...state.cvData, skills };
      return pushHistory(state, newData);
    }),

  updateProjects: (projects) =>
    set((state) => {
      const newData = { ...state.cvData, projects };
      return pushHistory(state, newData);
    }),

  updateCertifications: (certifications) =>
    set((state) => {
      const newData = { ...state.cvData, certifications };
      return pushHistory(state, newData);
    }),

  loadCV: (data) =>
    set((state) => ({
      ...pushHistory(state, data),
    })),

  setTemplate: (template) =>
    set((state) => ({ settings: { ...state.settings, template } })),

  setAccentColor: (color) =>
    set((state) => ({ settings: { ...state.settings, accentColor: color } })),

  undo: () =>
    set((state) => {
      if (state.historyIndex < 0) return state;
      const prevEntry = state.history[state.historyIndex];
      return {
        cvData: prevEntry.cvData,
        historyIndex: state.historyIndex - 1,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const nextEntry = state.history[state.historyIndex + 1];
      return {
        cvData: nextEntry.cvData,
        historyIndex: state.historyIndex + 1,
      };
    }),

  canUndo: () => get().historyIndex >= 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  getCompletionPercentage: () => {
    const { cvData } = get();
    const sections = [
      cvData.personalInfo.fullName &&
        cvData.personalInfo.email &&
        cvData.personalInfo.jobTitle,
      cvData.summary.length > 10,
      cvData.experience.length > 0,
      cvData.education.length > 0,
      cvData.skills.technical.length > 0 ||
        cvData.skills.soft.length > 0 ||
        cvData.skills.languages.length > 0,
      cvData.projects.length > 0,
      cvData.certifications.length > 0,
    ];
    const filled = sections.filter(Boolean).length;
    return Math.round((filled / sections.length) * 100);
  },
}));
