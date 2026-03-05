import React from 'react';
import { CVData } from '../../types/cv.types';

interface CvT {
  yourName: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  technical: string;
  soft: string;
  softPrefix: string;
  languages: string;
  languagesPrefix: string;
  projects: string;
  certifications: string;
  stackPrefix: string;
  present: string;
}

interface Props {
  data: CVData;
  cvT: CvT;
}

function formatDate(dateStr: string, isPresent: boolean, presentLabel: string): string {
  if (isPresent) return presentLabel;
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return month ? `${months[parseInt(month) - 1]} ${year}` : year;
}

export function Template1({ data, cvT }: Props) {
  const { personalInfo: pi, summary, experience, education, skills, projects, certifications } = data;
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;

  return (
    <div
      className="bg-white text-gray-900 font-serif"
      style={{ width: '210mm', minHeight: '297mm', padding: '20mm', boxSizing: 'border-box', fontSize: '10pt', lineHeight: '1.5' }}
    >
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-5">
        <div className="flex items-start gap-5">
          {pi.photoUrl && (
            <img
              src={pi.photoUrl}
              alt={pi.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              {pi.fullName || cvT.yourName}
            </h1>
            {pi.jobTitle && (
              <p className="text-lg text-gray-600 mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
                {pi.jobTitle}
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
              {pi.email && <span>{pi.email}</span>}
              {pi.phone && <span>{pi.phone}</span>}
              {pi.location && <span>{pi.location}</span>}
              {pi.linkedin && <span>{pi.linkedin}</span>}
              {pi.github && <span>{pi.github}</span>}
              {pi.portfolio && <span>{pi.portfolio}</span>}
            </div>
          </div>
        </div>
      </div>

      {summary && (
        <Section title={cvT.summary}>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title={cvT.experience}>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-sm">{exp.jobTitle || cvT.yourName}</span>
                    {exp.company && <span className="text-sm text-gray-600"> — {exp.company}</span>}
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {formatDate(exp.startDate, false, cvT.present)}
                    {(exp.startDate || exp.isPresent || exp.endDate) && ' – '}
                    {formatDate(exp.endDate, exp.isPresent, cvT.present)}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title={cvT.education}>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-sm">{edu.degree}</span>
                  {edu.fieldOfStudy && <span className="text-sm text-gray-600"> in {edu.fieldOfStudy}</span>}
                  {edu.institution && <p className="text-xs text-gray-600">{edu.institution}</p>}
                </div>
                {(edu.startYear || edu.endYear) && (
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {hasSkills && (
        <Section title={cvT.skills}>
          <div className="space-y-1.5">
            {skills.technical.length > 0 && (
              <div className="text-xs">
                <span className="font-semibold text-gray-700">{cvT.technical}: </span>
                <span className="text-gray-600">{skills.technical.join(' · ')}</span>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div className="text-xs">
                <span className="font-semibold text-gray-700">{cvT.softPrefix}</span>
                <span className="text-gray-600">{skills.soft.join(' · ')}</span>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div className="text-xs">
                <span className="font-semibold text-gray-700">{cvT.languagesPrefix}</span>
                <span className="text-gray-600">{skills.languages.join(' · ')}</span>
              </div>
            )}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={cvT.projects}>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-sm">{proj.name}</span>
                  {proj.url && <span className="text-xs text-gray-500">{proj.url}</span>}
                </div>
                {proj.description && <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>}
                {proj.techStack && <p className="text-xs text-gray-500 mt-0.5 italic">{proj.techStack}</p>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title={cvT.certifications}>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-xs">
                <span>
                  <span className="font-semibold">{cert.name}</span>
                  {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>}
                </span>
                {cert.year && <span className="text-gray-500">{cert.year}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2
        className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2 pb-0.5 border-b border-gray-300"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
