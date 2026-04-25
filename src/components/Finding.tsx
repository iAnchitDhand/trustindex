import React from 'react';

interface FindingProps {
  type: 'good' | 'warn' | 'bad';
  text: string;
}

export const Finding: React.FC<FindingProps> = ({ type, text }) => {
  const configs = {
    good: { bg: '#c8f06418', border: '#c8f06433', icon: '×', iconColor: 'var(--green)' },
    warn: { bg: '#ffc44d18', border: '#ffc44d33', icon: '!', iconColor: 'var(--amber)' },
    bad: { bg: '#ff5f5718', border: '#ff5f5733', icon: '×', iconColor: 'var(--red)' },
  };

  const config = configs[type] || configs.warn;

  return (
    <div className="finding" style={{ background: config.bg, borderColor: config.border }}>
      <div
        className="finding-icon"
        style={{
          background: config.bg,
          color: config.iconColor,
          border: `1px solid ${config.border}`
        }}
      >
        {config.icon}
      </div>
      <div
        className="finding-text"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};