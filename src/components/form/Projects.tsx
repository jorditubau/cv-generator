import React from 'react';
import { Rocket, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { Project } from '../../types/cv.types';
import { useTranslation } from '../../i18n/LanguageContext';

const inputClass =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

const labelClass =
  'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function ProjectEntry({
  entry,
  onUpdate,
  onRemove,
  pr,
}: {
  entry: Project;
  onUpdate: (updated: Project) => void;
  onRemove: () => void;
  pr: any;
}) {
  const handle =
    (field: keyof Project) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdate({ ...entry, [field]: e.target.value });
    };

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
        <label className={labelClass}>{pr.name}</label>
        <input type="text" value={entry.name} onChange={handle('name')} placeholder={pr.namePlaceholder} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>{pr.description}</label>
        <textarea
          value={entry.description}
          onChange={handle('description')}
          placeholder={pr.descriptionPlaceholder}
          rows={2}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{pr.techStack}</label>
          <input
            type="text"
            value={entry.techStack}
            onChange={handle('techStack')}
            placeholder={pr.techStackPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{pr.url}</label>
          <input
            type="text"
            value={entry.url}
            onChange={handle('url')}
            placeholder={pr.urlPlaceholder}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { cvData, updateProjects } = useCVStore();
  const { projects } = cvData;
  const { tr } = useTranslation();
  const pr = tr.projects;

  const addEntry = () => {
    updateProjects([
      ...projects,
      { id: generateId(), name: '', description: '', techStack: '', url: '' },
    ]);
  };

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Rocket className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">{pr.emptyMessage}</p>
          <p className="text-xs mt-1">{pr.emptyHint}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((entry) => (
            <ProjectEntry
              key={entry.id}
              entry={entry}
              onUpdate={(updated) =>
                updateProjects(projects.map((p) => (p.id === entry.id ? updated : p)))
              }
              onRemove={() => updateProjects(projects.filter((p) => p.id !== entry.id))}
              pr={pr}
            />
          ))}
        </div>
      )}
      <button
        onClick={addEntry}
        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        {pr.add}
      </button>
    </div>
  );
}
