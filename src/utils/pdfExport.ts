import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(element: HTMLElement, filename = 'cv.pdf'): Promise<void> {
  const scale = 2;
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = imgWidth / imgHeight;
  const imgPdfHeight = pdfWidth / ratio;

  if (imgPdfHeight <= pdfHeight) {
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgPdfHeight);
  } else {
    // Multi-page support
    let yOffset = 0;
    while (yOffset < imgPdfHeight) {
      const sliceHeight = Math.min(pdfHeight, imgPdfHeight - yOffset);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = imgWidth;
      sliceCanvas.height = Math.round((sliceHeight / imgPdfHeight) * imgHeight);
      const ctx = sliceCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          canvas,
          0,
          Math.round((yOffset / imgPdfHeight) * imgHeight),
          imgWidth,
          sliceCanvas.height,
          0,
          0,
          imgWidth,
          sliceCanvas.height
        );
        const sliceData = sliceCanvas.toDataURL('image/png');
        if (yOffset > 0) pdf.addPage();
        pdf.addImage(sliceData, 'PNG', 0, 0, pdfWidth, sliceHeight);
      }
      yOffset += pdfHeight;
    }
  }

  pdf.save(filename);
}
