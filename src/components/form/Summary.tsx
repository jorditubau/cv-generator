import React from 'react';
import { useCVStore } from '../../store/cvStore';
import { useTranslation } from '../../i18n/LanguageContext';

const MAX_CHARS = 300;

export function Summary() {
  const { cvData, updateSummary } = useCVStore();
  const { summary } = cvData;
  const { tr } = useTranslation();
  const s = tr.summary;
  const remaining = MAX_CHARS - summary.length;
  const isNearLimit = remaining <= 30;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {s.label}
      </label>
      <div className="relative">
        <textarea
          value={summary}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARS) updateSummary(e.target.value);
          }}
          placeholder={s.placeholder}
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
        <div
          className={`absolute bottom-2 right-3 text-xs font-medium ${
            isNearLimit ? 'text-amber-500' : 'text-gray-400'
          }`}
        >
          {remaining} {s.charsLeft}
        </div>
      </div>
      {summary.length === 0 && (
        <p className="text-xs text-gray-400 italic">{s.tip}</p>
      )}
    </div>
  );
}
