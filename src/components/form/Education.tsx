import React from 'react';
import { GraduationCap, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { Education as EducationType } from '../../types/cv.types';
import { useTranslation } from '../../i18n/LanguageContext';

const inputClass =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

const labelClass =
  'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function EducationEntry({
  entry,
  onUpdate,
  onRemove,
  ed,
}: {
  entry: EducationType;
  onUpdate: (updated: EducationType) => void;
  onRemove: () => void;
  ed: any;
}) {
  const handle =
    (field: keyof EducationType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...entry, [field]: e.target.value });
    };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
      <div className="flex justify-end">
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div>
        <label className={labelClass}>{ed.institution}</label>
        <input
          type="text"
          value={entry.institution}
          onChange={handle('institution')}
          placeholder={ed.institutionPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{ed.degree}</label>
          <input
            type="text"
            value={entry.degree}
            onChange={handle('degree')}
            placeholder={ed.degreePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{ed.fieldOfStudy}</label>
          <input
            type="text"
            value={entry.fieldOfStudy}
            onChange={handle('fieldOfStudy')}
            placeholder={ed.fieldPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{ed.startYear}</label>
          <select value={entry.startYear} onChange={(e) => onUpdate({ ...entry, startYear: e.target.value })} className={inputClass}>
            <option value="">{ed.selectYear}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{ed.endYear}</label>
          <select value={entry.endYear} onChange={(e) => onUpdate({ ...entry, endYear: e.target.value })} className={inputClass}>
            <option value="">{ed.selectYear}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function Education() {
  const { cvData, updateEducation } = useCVStore();
  const { education } = cvData;
  const { tr } = useTranslation();
  const ed = tr.education;

  const addEntry = () => {
    updateEducation([
      ...education,
      { id: generateId(), institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '' },
    ]);
  };

  return (
    <div className="space-y-4">
      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">{ed.emptyMessage}</p>
          <p className="text-xs mt-1">{ed.emptyHint}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((entry) => (
            <EducationEntry
              key={entry.id}
              entry={entry}
              onUpdate={(updated) =>
                updateEducation(education.map((e) => (e.id === entry.id ? updated : e)))
              }
              onRemove={() => updateEducation(education.filter((e) => e.id !== entry.id))}
              ed={ed}
            />
          ))}
        </div>
      )}
      <button
        onClick={addEntry}
        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        {ed.add}
      </button>
    </div>
  );
}
