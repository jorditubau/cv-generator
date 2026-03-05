import React from 'react';
import { Wrench } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { TagInput } from '../ui/TagInput';
import { useTranslation } from '../../i18n/LanguageContext';

export function Skills() {
  const { cvData, updateSkills } = useCVStore();
  const { skills } = cvData;
  const { tr } = useTranslation();
  const sk = tr.skills;

  const updateCategory = (category: keyof typeof skills) => (tags: string[]) => {
    updateSkills({ ...skills, [category]: tags });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          {sk.technical}
        </label>
        <TagInput
          tags={skills.technical}
          onChange={updateCategory('technical')}
          placeholder={sk.technicalPlaceholder}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          {sk.soft}
        </label>
        <TagInput
          tags={skills.soft}
          onChange={updateCategory('soft')}
          placeholder={sk.softPlaceholder}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          {sk.languages}
        </label>
        <TagInput
          tags={skills.languages}
          onChange={updateCategory('languages')}
          placeholder={sk.languagesPlaceholder}
        />
      </div>

      {skills.technical.length === 0 && skills.soft.length === 0 && skills.languages.length === 0 && (
        <div className="text-center py-4 text-gray-400">
          <Wrench className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="text-xs">{sk.emptyHint}</p>
          <p className="text-xs mt-1">{sk.emptyHint2}</p>
        </div>
      )}
    </div>
  );
}
