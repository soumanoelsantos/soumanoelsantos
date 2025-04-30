
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
import { getPUVPdfStyles, getPUVPdfOptions } from './puvStyles';
import { getMapaEquipeStyles, getMapaEquipePdfOptions } from './mapaEquipeStyles';
import { getDefaultPdfOptions, getBusinessMapPdfOptions } from './pdfOptions';

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
    getMapaEquipeStyles(),
  ].join('\n');
};

export const getDefaultPdfOptions = () => {
  return getDefaultPdfOptions();
};

export const getBusinessMapPdfOptions = () => {
  return getBusinessMapPdfOptions();
};

export const getPUVPdfOptions = () => {
  return getPUVPdfOptions();
};

export const getMapaEquipePdfOptions = () => {
  return getMapaEquipePdfOptions();
};
