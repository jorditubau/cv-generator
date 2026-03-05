import { CVData } from '../types/cv.types';

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photoUrl: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  projects: [],
  certifications: [],
};

export const sampleCVData: CVData = {
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Frontend Developer',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    portfolio: 'alexmorgan.dev',
    photoUrl: '',
  },
  summary:
    'Passionate frontend developer with 6+ years of experience building scalable web applications. Expert in React, TypeScript, and modern CSS. Proven track record of leading cross-functional teams and delivering pixel-perfect UIs.',
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      jobTitle: 'Senior Frontend Developer',
      startDate: '2021-03',
      endDate: '',
      isPresent: true,
      description:
        'Led a team of 5 developers to rebuild the company dashboard using React and TypeScript, reducing load time by 40%. Implemented design system components used across 3 products. Mentored junior developers through code reviews and pair programming sessions.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      jobTitle: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2021-02',
      isPresent: false,
      description:
        'Built and maintained customer-facing features for a SaaS platform serving 50,000+ users. Integrated RESTful APIs and GraphQL endpoints. Improved test coverage from 30% to 85% using Jest and React Testing Library.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startYear: '2014',
      endYear: '2018',
    },
  ],
  skills: {
    technical: [
      'React',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'GraphQL',
      'CSS/Tailwind',
      'Next.js',
      'Git',
      'Docker',
      'AWS',
    ],
    soft: [
      'Team Leadership',
      'Problem Solving',
      'Communication',
      'Agile/Scrum',
      'Mentoring',
    ],
    languages: ['English (Native)', 'Spanish (Intermediate)', 'French (Basic)'],
  },
  projects: [
    {
      id: '1',
      name: 'OpenDashboard',
      description:
        'An open-source analytics dashboard with real-time data visualization, customizable widgets, and dark mode support.',
      techStack: 'React, D3.js, TypeScript, WebSockets',
      url: 'github.com/alexmorgan/opendashboard',
    },
    {
      id: '2',
      name: 'QuickForm Builder',
      description:
        'A drag-and-drop form builder that generates schema-validated forms with 20+ field types.',
      techStack: 'Vue.js, Vuex, Express.js',
      url: 'quickformbuilder.app',
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      year: '2022',
    },
    {
      id: '2',
      name: 'Google UX Design Certificate',
      issuer: 'Google / Coursera',
      year: '2021',
    },
  ],
};
