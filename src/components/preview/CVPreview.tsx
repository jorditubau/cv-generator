import React, { forwardRef } from 'react';
import { useCVStore } from '../../store/cvStore';
import { useTranslation } from '../../i18n/LanguageContext';
import { Template1 } from './Template1';
import { Template2 } from './Template2';
import { Template3 } from './Template3';

interface CVPreviewProps {
  scale?: number;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ scale = 1 }, ref) => {
    const { cvData, settings } = useCVStore();
    const { tr } = useTranslation();
    const cvT = tr.cv;

    const renderTemplate = () => {
      switch (settings.template) {
        case 'classic':
          return <Template1 data={cvData} cvT={cvT} />;
        case 'modern':
          return <Template2 data={cvData} accentColor={settings.accentColor} cvT={cvT} />;
        case 'minimal':
          return <Template3 data={cvData} accentColor={settings.accentColor} cvT={cvT} />;
      }
    };

    return (
      <div ref={ref} style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {renderTemplate()}
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';
