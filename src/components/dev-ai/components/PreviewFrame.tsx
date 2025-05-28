
import React, { RefObject } from 'react';

interface PreviewFrameProps {
  iframeRef: RefObject<HTMLIFrameElement>;
  previewHtml: string;
  onLoad: () => void;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({
  iframeRef,
  previewHtml,
  onLoad
}) => {
  return (
    <div className="h-full bg-white border">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Preview"
        srcDoc={previewHtml}
        sandbox="allow-scripts allow-same-origin allow-forms"
        onLoad={onLoad}
      />
    </div>
  );
};

export default PreviewFrame;
