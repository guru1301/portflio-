import React from 'react';

export const GrainOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.035] bg-noise"
      aria-hidden="true"
    />
  );
};
