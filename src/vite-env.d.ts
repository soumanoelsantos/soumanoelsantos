
/// <reference types="vite/client" />

// Declare global Google Analytics gtag function
interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
