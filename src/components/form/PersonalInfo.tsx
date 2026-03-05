import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { ImageUpload } from '../ui/ImageUpload';
import { useTranslation } from '../../i18n/LanguageContext';

const inputClass =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

export function PersonalInfo() {
  const { cvData, updatePersonalInfo } = useCVStore();
  const { personalInfo } = cvData;
  const { tr } = useTranslation();
  const p = tr.personal;

  const handle = (field: keyof typeof personalInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => updatePersonalInfo({ [field]: e.target.value });

  return (
    <div className="space-y-4">
      <ImageUpload
        value={personalInfo.photoUrl}
        onChange={(url) => updatePersonalInfo({ photoUrl: url })}
      />

      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className={labelClass}>{p.fullName}</label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={handle('fullName')}
            placeholder={p.fullNamePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{p.jobTitle}</label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={handle('jobTitle')}
            placeholder={p.jobTitlePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{p.email}</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={handle('email')}
            placeholder={p.emailPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{p.phone}</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={handle('phone')}
            placeholder={p.phonePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{p.location}</label>
        <input
          type="text"
          value={personalInfo.location}
          onChange={handle('location')}
          placeholder={p.locationPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          {p.onlinePresence}
        </p>
        <div>
          <label className={labelClass}>{p.linkedin}</label>
          <input
            type="text"
            value={personalInfo.linkedin}
            onChange={handle('linkedin')}
            placeholder={p.linkedinPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{p.github}</label>
          <input
            type="text"
            value={personalInfo.github}
            onChange={handle('github')}
            placeholder={p.githubPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{p.portfolio}</label>
          <input
            type="text"
            value={personalInfo.portfolio}
            onChange={handle('portfolio')}
            placeholder={p.portfolioPlaceholder}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}
