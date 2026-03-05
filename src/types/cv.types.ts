export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photoUrl: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

export interface SkillCategory {
  technical: string[];
  soft: string[];
  languages: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string;
  url: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory;
  projects: Project[];
  certifications: Certification[];
}

export type TemplateType = 'classic' | 'modern' | 'minimal';

export interface AppSettings {
  template: TemplateType;
  accentColor: string;
}
