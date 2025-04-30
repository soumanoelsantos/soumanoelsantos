
/**
 * Chart-specific PDF styling
 * Contains styles for charts in PDF exports
 */

export const getChartPdfStyles = (): string => {
  return `
    /* Chart styling */
    .pdf-export .recharts-layer {
      color: inherit !important;
    }
    .pdf-export .recharts-surface {
      overflow: visible !important;
    }
    .pdf-export .recharts-wrapper {
      width: 100% !important;
      height: 300px !important; /* Reduced from 400px */
      overflow: visible !important;
      margin: 0 auto !important;
      transform: scale(0.9) !important; /* Slightly reduce chart size */
    }
    .pdf-export .recharts-legend-wrapper {
      bottom: -10px !important; /* Moved up from -20px */
    }
    
    /* Chart container */
    .pdf-export .chart-container {
      transform: scale(0.9) !important;
      transform-origin: center !important;
    }
  `;
};
