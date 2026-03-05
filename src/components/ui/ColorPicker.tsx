import React from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

const PRESET_COLORS = [
  '#2563eb', // Blue
  '#7c3aed', // Purple
  '#dc2626', // Red
  '#059669', // Green
  '#d97706', // Amber
  '#0891b2', // Cyan
  '#db2777', // Pink
  '#4b5563', // Gray
  '#1e293b', // Slate dark
  '#78350f', // Brown
];

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <div className="flex items-center gap-1.5 flex-wrap">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
              value === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        <label className="relative w-6 h-6 rounded-full border-2 border-dashed border-gray-400 cursor-pointer hover:border-gray-600 flex items-center justify-center overflow-hidden" title="Custom color">
          <span className="text-gray-400 text-xs font-bold">+</span>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute opacity-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
