import html2pdf from 'html2pdf.js';
import { getDefaultPdfOptionsConfig } from './pdf/pdfOptions';
import { getPUVPdfOptionsConfig, getPUVPdfStyles } from './pdf/puvStyles';
import { getMapaEquipePdfOptionsConfig, getMapaEquipeStyles } from './pdf/mapaEquipeStyles';
import { getSwotPdfOptionsConfig, getSwotPdfStyles } from './pdf/swotStyles';
import { getDiagnosticPdfOptionsConfig, getDiagnosticPdfStyles } from './pdf/diagnosticStyles';

/**
 * Generates a PDF from a given HTML element
 * @param element The HTML element to convert to PDF
 * @param fileName Optional custom filename
 */
export const generatePDF = (element: HTMLElement, fileName?: string) => {
  try {
    console.log('Starting PDF generation...');
    console.log('Element:', element);
    console.log('Element content preview:', element.innerHTML.substring(0, 500));
    
    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Default options
    let options = getDefaultPdfOptionsConfig();
    
    // Check if the element has specific class patterns and apply appropriate styles
    if (element.classList.contains('puv-preview')) {
      // Add PUV specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getPUVPdfStyles();
      clonedElement.appendChild(styleElement);
      
      // Use PUV specific options if available
      options = getPUVPdfOptionsConfig();
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    } 
    // Check if the element has mapa-equipe specific class
    else if (element.classList.contains('mapa-equipe-preview')) {
      // Add mapa-equipe specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getMapaEquipeStyles();
      clonedElement.appendChild(styleElement);
      
      // Use mapa-equipe specific options if available
      options = getMapaEquipePdfOptionsConfig();
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    }
    // Check if the element has swot-pdf-container class
    else if (element.classList.contains('swot-pdf-container')) {
      // Add SWOT specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getSwotPdfStyles();
      clonedElement.appendChild(styleElement);
      
      // Use SWOT specific options if available
      options = getSwotPdfOptionsConfig();
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    }
    // Check if it's a diagnostic PDF (action plan)
    else if (element.classList.contains('pdf-export') || element.querySelector('.action-plan-content') || fileName?.includes('plano_acao')) {
      console.log('Detected action plan PDF generation');
      
      // Add diagnostic specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getDiagnosticPdfStyles();
      clonedElement.appendChild(styleElement);
      
      // Use diagnostic specific options with better configuration
      options = {
        ...getDiagnosticPdfOptionsConfig(),
        html2canvas: { 
          scale: 1.5,
          logging: true, 
          useCORS: true,
          allowTaint: true,
          windowWidth: 1200,
          windowHeight: 1600,
          scrollX: 0,
          scrollY: 0,
          width: 1200,
          height: null
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        }
      };
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
      
      console.log('Applied diagnostic styles and options');
    }
    else {
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    }

    console.log('PDF options:', options);
    console.log('Element to be converted has content length:', clonedElement.innerHTML.length);
    
    // Temporarily add the cloned element to the DOM for html2pdf processing
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.width = '210mm';
    clonedElement.style.backgroundColor = 'white';
    clonedElement.style.color = 'black';
    clonedElement.style.fontFamily = 'Arial, sans-serif';
    clonedElement.style.fontSize = '12px';
    clonedElement.style.lineHeight = '1.4';
    clonedElement.style.padding = '20px';
    clonedElement.style.boxSizing = 'border-box';
    
    document.body.appendChild(clonedElement);

    console.log('Starting html2pdf conversion...');

    // Generate PDF
    return html2pdf()
      .from(clonedElement)
      .set(options)
      .save()
      .then(() => {
        console.log('PDF generated successfully');
        
        // Remove the cloned element after generation
        if (clonedElement.parentNode) {
          clonedElement.parentNode.removeChild(clonedElement);
        }
        
        return true;
      })
      .catch((error: any) => {
        console.error('Error during PDF generation:', error);
        
        // Remove the cloned element in case of error
        if (clonedElement.parentNode) {
          clonedElement.parentNode.removeChild(clonedElement);
        }
        
        return false;
      });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
