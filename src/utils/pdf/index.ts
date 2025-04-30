
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
import { getBusinessMapPdfStyles } from './businessMapStyles';
import { getPUVPdfStyles } from './puvStyles';
import { getDefaultPdfOptions, getBusinessMapPdfOptions as getMapOptions } from './pdfOptions';
import { getPUVPdfOptions } from './puvStyles';

export const getPdfStyles = (): string => {
  return [
    getBasePdfStyles(),
    getComponentPdfStyles(),
    getChartPdfStyles(),
    getLayoutPdfStyles(),
    getDiagnosticPdfStyles(),
    getMarketingPdfStyles(),
    getBusinessMapPdfStyles(),
    getPUVPdfStyles(),
  ].join('\n');
};

export const getPdfOptions = () => {
  return getDefaultPdfOptions();
};

export const getBusinessMapPdfOptions = () => {
  return getMapOptions();
};

export const getPUVPdfOptions = () => {
  return getPUVPdfOptions();
};
