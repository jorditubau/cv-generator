import React from 'react';
import { Award, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { Certification } from '../../types/cv.types';
import { useTranslation } from '../../i18n/LanguageContext';

const inputClass =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

const labelClass =
  'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function CertEntry({
  entry,
  onUpdate,
  onRemove,
  ce,
}: {
  entry: Certification;
  onUpdate: (updated: Certification) => void;
  onRemove: () => void;
  ce: any;
}) {
  const handle =
    (field: keyof Certification) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate({ ...entry, [field]: e.target.value });
    };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

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
        <label className={labelClass}>{ce.name}</label>
        <input
          type="text"
          value={entry.name}
          onChange={handle('name')}
          placeholder={ce.namePlaceholder}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{ce.issuer}</label>
          <input
            type="text"
            value={entry.issuer}
            onChange={handle('issuer')}
            placeholder={ce.issuerPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{ce.year}</label>
          <select
            value={entry.year}
            onChange={(e) => onUpdate({ ...entry, year: e.target.value })}
            className={inputClass}
          >
            <option value="">{ce.selectYear}</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function Certifications() {
  const { cvData, updateCertifications } = useCVStore();
  const { certifications } = cvData;
  const { tr } = useTranslation();
  const ce = tr.certifications;

  const addEntry = () => {
    updateCertifications([
      ...certifications,
      { id: generateId(), name: '', issuer: '', year: '' },
    ]);
  };

  return (
    <div className="space-y-4">
      {certifications.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <Award className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">{ce.emptyMessage}</p>
          <p className="text-xs mt-1">{ce.emptyHint}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((entry) => (
            <CertEntry
              key={entry.id}
              entry={entry}
              onUpdate={(updated) =>
                updateCertifications(certifications.map((c) => (c.id === entry.id ? updated : c)))
              }
              onRemove={() => updateCertifications(certifications.filter((c) => c.id !== entry.id))}
              ce={ce}
            />
          ))}
        </div>
      )}
      <button
        onClick={addEntry}
        className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        {ce.add}
      </button>
    </div>
  );
}
