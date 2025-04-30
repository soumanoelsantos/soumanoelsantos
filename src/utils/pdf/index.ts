
/**
 * PDF styles aggregator
 * Combines all PDF styles from different modules
 */

import { getBasePdfStyles } from './baseStyles';
import { getComponentPdfStyles } from './componentStyles';
import { getChartPdfStyles } from './chartStyles';
import { getLayoutPdfStyles } from './layoutStyles';
import { getDiagnosticPdfStyles } from './diagnosticStyles';
import { getMarketingPdfStyles } from './marketingStyles';
import { getDefaultPdfOptions, getBusinessMapPdfOptions as getMapOptions } from './pdfOptions';

export const getPdfStyles = (): string => {
  return [
    getBasePdfStyles(),
    getComponentPdfStyles(),
    getChartPdfStyles(),
    getLayoutPdfStyles(),
    getDiagnosticPdfStyles(),
    getMarketingPdfStyles(),
  ].join('\n');
};

export const getPdfOptions = () => {
  return getDefaultPdfOptions();
};

export const getBusinessMapPdfOptions = () => {
  return getMapOptions();
};
