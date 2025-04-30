
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
import { getMapaEquipeStyles } from './mapaEquipeStyles';
import { getDefaultPdfOptionsConfig, getBusinessMapPdfOptionsConfig } from './pdfOptions';
import { getPUVPdfOptionsConfig } from './puvStyles';
import { getMapaEquipePdfOptionsConfig } from './mapaEquipeStyles';

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
  return getDefaultPdfOptionsConfig();
};

export const getBusinessMapPdfOptions = () => {
  return getBusinessMapPdfOptionsConfig();
};

export const getPUVPdfOptions = () => {
  return getPUVPdfOptionsConfig();
};

export const getMapaEquipePdfOptions = () => {
  return getMapaEquipePdfOptionsConfig();
};
