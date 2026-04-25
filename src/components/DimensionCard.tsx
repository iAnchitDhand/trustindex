import React from 'react';
import { getScoreColor } from '../utils/helpers';

interface DimensionCardProps {
  name: string;
  score: number;
  note: string;
}

export const DimensionCard: React.FC<DimensionCardProps> = ({ name, score, note }) => {
  const color = getScoreColor(score);

  return (
    <div className="dim-card">
      <div className="dim-top">
        <span className="dim-name">{name}</span>
        <span className="dim-score" style={{ color }}>{score}</span>
      </div>
      <div className="dim-bar">
        <div
          className="dim-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <div className="dim-note">{note}</div>
    </div>
  );
};