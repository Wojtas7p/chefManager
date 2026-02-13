import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type ExportOptions = {
  fileName?: string;
  orientation?: 'p' | 'l';
  scale?: number;
};

const cloneForExport = (element: HTMLElement) => {
  const clone = element.cloneNode(true) as HTMLElement;

  clone.style.position = 'absolute';
  clone.style.left = '-99999px';
  clone.style.top = '0';
  clone.style.width = element.scrollWidth + 'px';
  clone.style.maxWidth = 'none';
  clone.style.overflow = 'visible';

  document.body.appendChild(clone);

  return clone;
};

export const exportAsImage = async (
  element: HTMLElement,
  options?: ExportOptions
) => {
  const { fileName = 'export.jpg', scale = 2 } = options || {};

  const clone = cloneForExport(element);

  const canvas = await html2canvas(clone, {
    scale,
    backgroundColor: '#ffffff',
  });

  document.body.removeChild(clone);

  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/jpeg', 0.95);
  link.click();
};




export const exportAsPDF = async (
  element: HTMLElement,
  options?: ExportOptions
) => {
  const {
    fileName = 'export.pdf',
    orientation = 'l',
    scale = 2,
  } = options || {};

  const clone = cloneForExport(element);

  const canvas = await html2canvas(clone, {
    scale,
    backgroundColor: '#ffffff',
  });

  document.body.removeChild(clone);

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  const pdf = new jsPDF(orientation, 'mm', 'a4');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;

  pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
  pdf.save(fileName);
};
