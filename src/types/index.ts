export interface TrustScore {
  companyName: string;
  overallScore: number;
  verdict: string;
  dimensions: {
    policyClarity: { score: number; note: string };
    dataMinimisation: { score: number; note: string };
    userControl: { score: number; note: string };
    thirdPartySharing: { score: number; note: string };
    regulatoryCompliance: { score: number; note: string };
  };
  findings: Array<{
    type: 'good' | 'warn' | 'bad';
    text: string;
  }>;
}

export interface Breach {
  Name: string;
  Title?: string;
  BreachDate: string;
  DataClasses: string[];
  PwnCount?: number;
}

export interface Grade {
  label: string;
  bg: string;
  text: string;
}