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
  accentColor: string;
  cvT: CvT;
}

function formatDate(dateStr: string, isPresent: boolean, presentLabel: string): string {
  if (isPresent) return presentLabel;
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return month ? `${months[parseInt(month) - 1]} ${year}` : year;
}

export function Template3({ data, accentColor, cvT }: Props) {
  const { personalInfo: pi, summary, experience, education, skills, projects, certifications } = data;
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;

  return (
    <div
      className="bg-white text-gray-900"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '18mm 22mm',
        boxSizing: 'border-box',
        fontSize: '10pt',
        lineHeight: '1.6',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-5">
          {pi.photoUrl && (
            <img
              src={pi.photoUrl}
              alt={pi.fullName}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              style={{ border: `2px solid ${accentColor}` }}
            />
          )}
          <div>
            <h1 className="font-black leading-none text-gray-900" style={{ fontSize: '26pt', letterSpacing: '-0.02em' }}>
              {pi.fullName || cvT.yourName}
            </h1>
            {pi.jobTitle && (
              <p className="text-base font-light text-gray-500 mt-1">{pi.jobTitle}</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4" style={{ borderTop: `1px solid ${accentColor}`, paddingTop: '12px' }}>
          {pi.email && <ContactChip accent={accentColor} icon="@">{pi.email}</ContactChip>}
          {pi.phone && <ContactChip accent={accentColor} icon="#">{pi.phone}</ContactChip>}
          {pi.location && <ContactChip accent={accentColor} icon="loc">{pi.location}</ContactChip>}
          {pi.linkedin && <ContactChip accent={accentColor} icon="in">{pi.linkedin}</ContactChip>}
          {pi.github && <ContactChip accent={accentColor} icon="gh">{pi.github}</ContactChip>}
          {pi.portfolio && <ContactChip accent={accentColor} icon="web">{pi.portfolio}</ContactChip>}
        </div>
      </div>

      {summary && (
        <div className="mb-7">
          <p className="text-sm text-gray-600 leading-relaxed italic border-l-4 pl-4" style={{ borderColor: accentColor }}>
            {summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <Section title={cvT.experience} accent={accentColor}>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm text-gray-900">{exp.jobTitle || cvT.yourName}</h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(exp.startDate, false, cvT.present)}
                    {(exp.startDate || exp.isPresent || exp.endDate) && ' – '}
                    {formatDate(exp.endDate, exp.isPresent, cvT.present)}
                  </span>
                </div>
                {exp.company && (
                  <p className="text-xs font-medium mt-0.5" style={{ color: accentColor }}>{exp.company}</p>
                )}
                {exp.description && (
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title={cvT.education} accent={accentColor}>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <p className="font-semibold text-sm">
                    {edu.degree}{edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
                  </p>
                  {edu.institution && (
                    <p className="text-xs text-gray-500 mt-0.5">{edu.institution}</p>
                  )}
                </div>
                {(edu.startYear || edu.endYear) && (
                  <span className="text-xs text-gray-400">
                    {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {hasSkills && (
        <Section title={cvT.skills} accent={accentColor}>
          <div className="space-y-2">
            {skills.technical.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {skills.technical.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-0.5 rounded border font-medium"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            {skills.soft.length > 0 && (
              <div className="text-xs text-gray-600">
                <span className="font-medium text-gray-700">{cvT.softPrefix}</span>
                {skills.soft.join(' · ')}
              </div>
            )}
            {skills.languages.length > 0 && (
              <div className="text-xs text-gray-600">
                <span className="font-medium text-gray-700">{cvT.languagesPrefix}</span>
                {skills.languages.join(' · ')}
              </div>
            )}
          </div>
        </Section>
      )}

      {projects.length > 0 && (
        <Section title={cvT.projects} accent={accentColor}>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-sm">{proj.name}</span>
                  {proj.url && (
                    <span className="text-xs" style={{ color: accentColor }}>{proj.url}</span>
                  )}
                </div>
                {proj.description && <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>}
                {proj.techStack && (
                  <p className="text-xs text-gray-400 mt-0.5">{proj.techStack}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title={cvT.certifications} accent={accentColor}>
          <div className="space-y-1.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between text-xs">
                <span className="font-medium">{cert.name}
                  {cert.issuer && <span className="font-normal text-gray-500"> — {cert.issuer}</span>}
                </span>
                {cert.year && <span style={{ color: accentColor }}>{cert.year}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>
          {title}
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </div>
  );
}

function ContactChip({ children, icon, accent }: { children: React.ReactNode; icon: string; accent: string }) {
  return (
    <span className="flex items-center gap-1 text-xs text-gray-600">
      <span style={{ color: accent }}>{icon}</span>
      {children}
    </span>
  );
}
