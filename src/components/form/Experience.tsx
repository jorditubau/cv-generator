import React from 'react';
import { Briefcase, Trash2, GripVertical } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { WorkExperience } from '../../types/cv.types';
import { DraggableList } from '../ui/DraggableList';
import { useTranslation } from '../../i18n/LanguageContext';

const inputClass =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

const labelClass =
  'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function ExperienceEntry({
  entry,
  onUpdate,
  onRemove,
  dragHandleProps,
  ex,
}: {
  entry: WorkExperience;
  onUpdate: (updated: WorkExperience) => void;
  onRemove: () => void;
  dragHandleProps: React.HTMLAttributes<HTMLElement>;
  ex: any;
}) {
  const handle =
    (field: keyof WorkExperience) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate({ ...entry, [field]: e.target.value });
    };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
      <div className="flex items-center justify-between">
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title={ex.dragToReorder}
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{ex.company}</label>
          <input
            type="text"
            value={entry.company}
            onChange={handle('company')}
            placeholder={ex.companyPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{ex.jobTitle}</label>
          <input
            type="text"
            value={entry.jobTitle}
            onChange={handle('jobTitle')}
            placeholder={ex.jobTitlePlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{ex.startDate}</label>
          <input type="month" value={entry.startDate} onChange={handle('startDate')} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{ex.endDate}</label>
          <div className="space-y-1">
            <input
              type="month"
              value={entry.endDate}
              onChange={handle('endDate')}
              disabled={entry.isPresent}
              className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={entry.isPresent}
                onChange={(e) => onUpdate({ ...entry, isPresent: e.target.checked, endDate: '' })}
                className="rounded text-blue-500"
              />
              <span className="text-xs text-gray-600">{ex.currentlyWorking}</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>{ex.description}</label>
        <textarea
          value={entry.description}
          onChange={handle('description')}
          placeholder={ex.descriptionPlaceholder}
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>
    </div>
  );
}

export function Experience() {
  const { cvData, updateExperience } = useCVStore();
  const { experience } = cvData;
  const { tr } = useTranslation();
  const ex = tr.experience;

  const addEntry = () => {
    updateExperience([
      ...experience,
      { id: generateId(), company: '', jobTitle: '', startDate: '', endDate: '', isPresent: false, description: '' },
    ]);
  };

  const updateEntry = (id: string, updated: WorkExperience) => {
    updateExperience(experience.map((e) => (e.id === id ? updated : e)));
  };

  const removeEntry = (id: string) => {
    updateExperience(experience.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-4">
      {experience.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">{ex.emptyMessage}</p>
          <p className="text-xs mt-1">{ex.emptyHint}</p>
        </div>
      ) : (
        <DraggableList
          items={experience}
          onReorder={updateExperience}
          renderItem={(item, _, dragHandleProps) => (
            <ExperienceEntry
              entry={item}
              onUpdate={(updated) => updateEntry(item.id, updated)}
              onRemove={() => removeEntry(item.id)}
              dragHandleProps={dragHandleProps}
              ex={ex}
            />
          )}
        />
      )}
      <button
        onClick={addEntry}
        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        {ex.add}
      </button>
    </div>
  );
}
