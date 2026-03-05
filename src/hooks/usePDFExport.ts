import { useRef, useState } from 'react';
import { exportToPDF } from '../utils/pdfExport';

export function usePDFExport() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const downloadPDF = async (filename?: string) => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      await exportToPDF(previewRef.current, filename || 'cv.pdf');
    } finally {
      setIsExporting(false);
    }
  };

  return { previewRef, downloadPDF, isExporting };
}
