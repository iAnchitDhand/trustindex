import React, { useState } from 'react';
import { TrustReport } from './components/TrustReport';
import { trustIndexAPI } from './services/api';
import { TrustScore, Breach } from './types';
import { normalizeDomain, getCompanyName } from './utils/helpers';
import './App.css';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ data: TrustScore; breaches: Breach[]; domain: string } | null>(null);

  const exampleCompanies = ['facebook.com', 'linkedin.com', 'zomato.com', 'twitter.com', 'adobe.com', 'dropbox.com'];

  const analyze = async (companyQuery?: string) => {
    const searchQuery = companyQuery || query.trim();
    if (!searchQuery) return;

    setLoading(true);
    const domain = normalizeDomain(searchQuery);
    const companyName = getCompanyName(domain);

    try {
      const [trustData, breaches] = await Promise.all([
        trustIndexAPI.analyzePrivacyPolicy(domain, companyName),
        trustIndexAPI.fetchBreaches(domain)
      ]);

      setResult({ data: trustData, breaches, domain });
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      analyze();
    }
  };

  return (
    <div className="wrap">
      <div className="header">
        <div className="logo">Trust<span>Index</span></div>
        <div className="tagline">Privacy intelligence for digital platforms</div>
      </div>

      <div className="search-row">
        <input
          className="search-input"
          type="text"
          placeholder="Enter a company or domain (e.g. facebook.com, zomato.com)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
        <button className="search-btn" onClick={() => analyze()} disabled={loading}>
          {loading ? 'Analysing...' : 'Analyse'}
        </button>
      </div>

      <div className="chips">
        {exampleCompanies.map((company) => (
          <span
            key={company}
            className="chip"
            onClick={() => {
              setQuery(company);
              analyze(company);
            }}
          >
            {company}
          </span>
        ))}
      </div>

      <div id="output">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <div className="loading-text">Running privacy intelligence analysis...</div>
          </div>
        ) : result ? (
          <TrustReport data={result.data} breaches={result.breaches} domain={result.domain} />
        ) : (
          <div className="empty">
            <div className="empty-title">No company analysed yet</div>
            <div className="empty-sub">Search any platform to see its privacy trust score</div>
          </div>
        )}
      </div>

      <div className="disclaimer">
        TrustIndex uses AI analysis of publicly available privacy policies and breach data from HaveIBeenPwned.<br />
        This is not legal advice. Scores are indicative and for informational purposes only.
      </div>
    </div>
  );
};

export default App;