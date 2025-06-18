
import React from 'react';

interface AlignmentLine {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: 'horizontal' | 'vertical';
}

interface AlignmentIndicatorProps {
  lines: AlignmentLine[];
}

const AlignmentIndicator = ({ lines }: AlignmentIndicatorProps) => {
  if (lines.length === 0) return null;

  return (
    <svg 
      className="absolute inset-0 pointer-events-none z-20"
      style={{ width: '100%', height: '100%' }}
    >
      {lines.map(line => (
        <line
          key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.8"
          className="animate-pulse"
        />
      ))}
    </svg>
  );
};

export default AlignmentIndicator;
