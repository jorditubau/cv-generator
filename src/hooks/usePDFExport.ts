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
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Error al generar el PDF: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsExporting(false);
    }
  };

  return { previewRef, downloadPDF, isExporting };
}
