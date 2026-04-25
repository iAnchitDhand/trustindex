import React from 'react';
import { Breach } from '../types';

interface BreachItemProps {
  breach: Breach;
}

export const BreachItem: React.FC<BreachItemProps> = ({ breach }) => {
  return (
    <div className="breach-item">
      <div>
        <div className="breach-name">{breach.Name || breach.Title || 'Unknown breach'}</div>
        <div className="breach-meta">
          {breach.BreachDate || 'N/A'} · {(breach.DataClasses || []).slice(0, 3).join(', ')}
        </div>
      </div>
      <div className="breach-count">
        {breach.PwnCount ? `${(breach.PwnCount / 1e6).toFixed(1)}M records` : ''}
      </div>
    </div>
  );
};