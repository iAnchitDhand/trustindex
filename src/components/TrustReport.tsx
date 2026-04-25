import React from 'react';
import { TrustScore, Breach } from '../types';
import { ScoreCircle } from './ScoreCircle';
import { DimensionCard } from './DimensionCard';
import { Finding } from './Finding';
import { BreachItem } from './BreachItem';
import { getGrade } from '../utils/helpers';

interface TrustReportProps {
  data: TrustScore;
  breaches: Breach[];
  domain: string;
}

export const TrustReport: React.FC<TrustReportProps> = ({ data, breaches, domain }) => {
  const grade = getGrade(data.overallScore);
  const dims = data.dimensions;

  const breachHTML = breaches.length === 0 ? (
    <div className="no-breach">
      No known data breaches found in HaveIBeenPwned for <strong>{domain}</strong>
    </div>
  ) : (
    <div className="breach-list">
      {breaches.slice(0, 6).map((breach, index) => (
        <BreachItem key={index} breach={breach} />
      ))}
    </div>
  );

  const bBadge = breaches.length > 0 ? (
    <span className="section-badge" style={{ background: '#ff5f5718', color: '#ff5f57' }}>
      {breaches.length} breach{breaches.length > 1 ? 'es' : ''} found
    </span>
  ) : (
    <span className="section-badge" style={{ background: '#c8f06418', color: '#c8f064' }}>
      clean
    </span>
  );

  return (
    <div className="result-section">
      <div className="score-hero">
        <ScoreCircle score={data.overallScore} />
        <div className="score-meta">
          <div className="company-name">{data.companyName}</div>
          <div className="score-verdict">{data.verdict}</div>
          <div className="grade-badge" style={{ background: grade.bg, color: grade.text }}>
            {grade.label}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-title">Dimension breakdown</div>
        </div>
        <div className="dims">
          <DimensionCard name="Policy Clarity" score={dims.policyClarity.score} note={dims.policyClarity.note} />
          <DimensionCard name="Data Minimisation" score={dims.dataMinimisation.score} note={dims.dataMinimisation.note} />
          <DimensionCard name="User Control" score={dims.userControl.score} note={dims.userControl.note} />
          <DimensionCard name="3rd Party Sharing" score={dims.thirdPartySharing.score} note={dims.thirdPartySharing.note} />
          <DimensionCard name="Regulatory Compliance" score={dims.regulatoryCompliance.score} note={dims.regulatoryCompliance.note} />
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-title">Key findings</div>
        </div>
        <div className="finding-list">
          {data.findings.map((finding, index) => (
            <Finding key={index} type={finding.type} text={finding.text} />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-title">Known data breaches</div>
          {bBadge}
        </div>
        {breachHTML}
      </div>
    </div>
  );
};