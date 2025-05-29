
import { useState, useRef } from 'react';
import { useClipboard } from './useClipboard';
import { useFileDownload } from './useFileDownload';
import { useNewTabOpen } from './useNewTabOpen';
import { usePreviewRefresh } from './usePreviewRefresh';

export const useCodePreview = (generatedCode: string) => {
  const [showCode, setShowCode] = useState(true);
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
  };

  const goBack = () => {
    // Não aplicável para visualização de código
  };

  const goForward = () => {
    // Não aplicável para visualização de código
  };

  const getPreviewHtml = () => {
    return generatedCode || '';
  };

  return {
    showCode: true,
    setShowCode,
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
