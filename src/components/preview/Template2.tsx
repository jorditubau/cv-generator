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
  languages: string;
  projects: string;
  certifications: string;
  aboutMe: string;
  contact: string;
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

export function Template2({ data, accentColor, cvT }: Props) {
  const { personalInfo: pi, summary, experience, education, skills, projects, certifications } = data;
  const hasSkills = skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0;

  const sidebarBg = `${accentColor}15`;

  return (
    <div
      className="bg-white text-gray-900 flex"
      style={{ width: '210mm', minHeight: '297mm', boxSizing: 'border-box', fontSize: '10pt', lineHeight: '1.5', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Sidebar */}
      <div
        className="flex-shrink-0 px-6 py-8 space-y-6"
        style={{ width: '72mm', background: sidebarBg, borderRight: `3px solid ${accentColor}` }}
      >
        {pi.photoUrl && (
          <div className="flex justify-center">
            <img
              src={pi.photoUrl}
              alt={pi.fullName}
              className="w-24 h-24 rounded-full object-cover"
              style={{ border: `3px solid ${accentColor}` }}
            />
          </div>
        )}

        <div>
          <h1 className="text-xl font-bold leading-tight" style={{ color: accentColor }}>
            {pi.fullName || cvT.yourName}
          </h1>
          {pi.jobTitle && (
            <p className="text-xs font-medium text-gray-600 mt-1">{pi.jobTitle}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <SidebarHeading color={accentColor}>{cvT.contact}</SidebarHeading>
          {pi.email && <ContactItem icon="@">{pi.email}</ContactItem>}
          {pi.phone && <ContactItem icon="#">{pi.phone}</ContactItem>}
          {pi.location && <ContactItem icon="loc">{pi.location}</ContactItem>}
          {pi.linkedin && <ContactItem icon="in">{pi.linkedin}</ContactItem>}
          {pi.github && <ContactItem icon="gh">{pi.github}</ContactItem>}
          {pi.portfolio && <ContactItem icon="web">{pi.portfolio}</ContactItem>}
        </div>

        {hasSkills && (
          <div className="space-y-3">
            {skills.technical.length > 0 && (
              <div>
                <SidebarHeading color={accentColor}>{cvT.technical}</SidebarHeading>
                <div className="flex flex-wrap gap-1 mt-1">
                  {skills.technical.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: accentColor, color: '#fff', opacity: 0.9 }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <SidebarHeading color={accentColor}>{cvT.soft}</SidebarHeading>
                <ul className="mt-1 space-y-0.5">
                  {skills.soft.map((s, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-center gap-1">
                      <span style={{ color: accentColor }}>▸</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div>
                <SidebarHeading color={accentColor}>{cvT.languages}</SidebarHeading>
                <ul className="mt-1 space-y-0.5">
                  {skills.languages.map((s, i) => (
                    <li key={i} className="text-xs text-gray-700">{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <SidebarHeading color={accentColor}>{cvT.certifications}</SidebarHeading>
            <div className="space-y-2 mt-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <p className="font-semibold text-gray-800">{cert.name}</p>
                  {cert.issuer && <p className="text-gray-600">{cert.issuer}</p>}
                  {cert.year && <p style={{ color: accentColor }}>{cert.year}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 px-7 py-8 space-y-5">
        {summary && (
          <div>
            <MainHeading color={accentColor}>{cvT.aboutMe}</MainHeading>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div>
            <MainHeading color={accentColor}>{cvT.experience}</MainHeading>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-4" style={{ borderLeft: `2px solid ${accentColor}` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm">{exp.jobTitle || cvT.yourName}</p>
                      {exp.company && (
                        <p className="text-xs font-medium" style={{ color: accentColor }}>{exp.company}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2 bg-gray-100 px-2 py-0.5 rounded">
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
          </div>
        )}

        {education.length > 0 && (
          <div>
            <MainHeading color={accentColor}>{cvT.education}</MainHeading>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <p className="font-bold text-sm">{edu.degree}</p>
                    {edu.fieldOfStudy && <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>}
                    {edu.institution && <p className="text-xs font-medium" style={{ color: accentColor }}>{edu.institution}</p>}
                  </div>
                  {(edu.startYear || edu.endYear) && (
                    <span className="text-xs text-gray-500">
                      {edu.startYear}{edu.startYear && edu.endYear && ' – '}{edu.endYear}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <MainHeading color={accentColor}>{cvT.projects}</MainHeading>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-sm">{proj.name}</span>
                    {proj.url && <span className="text-xs text-blue-500">{proj.url}</span>}
                  </div>
                  {proj.description && <p className="text-xs text-gray-600 mt-0.5">{proj.description}</p>}
                  {proj.techStack && (
                    <p className="text-xs mt-0.5">
                      <span className="font-medium text-gray-500">{cvT.stackPrefix}</span>
                      <span className="text-gray-600">{proj.techStack}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarHeading({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>
      {children}
    </h3>
  );
}

function MainHeading({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2
      className="text-sm font-bold uppercase tracking-wider mb-3 pb-1"
      style={{ color, borderBottom: `2px solid ${color}` }}
    >
      {children}
    </h2>
  );
}

function ContactItem({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-1.5 text-xs text-gray-700">
      <span className="flex-shrink-0">{icon}</span>
      <span className="break-all">{children}</span>
    </div>
  );
}
