import { Grade } from '../types';

export const getScoreColor = (score: number): string => {
  if (score >= 75) return 'var(--green)';
  if (score >= 50) return 'var(--amber)';
  return 'var(--red)';
};

export const getGrade = (score: number): Grade => {
  if (score >= 85) return { label: 'A - Trustworthy', bg: '#c8f06422', text: '#c8f064' };
  if (score >= 70) return { label: 'B - Acceptable', bg: '#7c6fec22', text: '#a89df0' };
  if (score >= 50) return { label: 'C - Caution', bg: '#ffc44d22', text: '#ffc44d' };
  return { label: 'D - High Risk', bg: '#ff5f5722', text: '#ff5f57' };
};

export const normalizeDomain = (query: string): string => {
  let domain = query.toLowerCase().replace(/https?:\/\//, '').replace(/\//, '').trim();
  if (!domain.includes('.')) domain = domain + '.com';
  return domain;
};

export const getCompanyName = (domain: string): string => {
  const company = domain.split('.')[0];
  return company.charAt(0).toUpperCase() + company.slice(1);
};