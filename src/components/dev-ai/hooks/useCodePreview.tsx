
import { useState, useRef } from 'react';
import { useClipboard } from './useClipboard';
import { useFileDownload } from './useFileDownload';
import { useNewTabOpen } from './useNewTabOpen';
import { usePreviewRefresh } from './usePreviewRefresh';

export const useCodePreview = (generatedCode: string) => {
  const [currentUrl, setCurrentUrl] = useState('React Code');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { copyToClipboard: copyText } = useClipboard();
  const { downloadCode: downloadFile } = useFileDownload();
  const { openInNewTab: openCodeInNewTab } = useNewTabOpen();
  const { refreshPreview: refresh } = usePreviewRefresh();

  const copyToClipboard = () => {
    copyText(generatedCode);
  };

  const downloadCode = () => {
    downloadFile(generatedCode);
  };

  const openInNewTab = () => {
    openCodeInNewTab(generatedCode);
  };

  const refreshPreview = () => {
    refresh();
    // Recarregar iframe se existir
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const src = iframe.src;
      iframe.src = '';
      iframe.src = src;
    }
  };

  const goBack = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const goForward = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  const getPreviewHtml = () => {
    return generatedCode || '';
  };

  return {
    currentUrl,
    setCurrentUrl,
    iframeRef,
    copyToClipboard,
    downloadCode,
    openInNewTab,
    refreshPreview,
    goBack,
    goForward,
    getPreviewHtml
  };
};
