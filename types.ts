
export enum UserRole {
  CTO = 'CTO',
  API_OPS_HEAD = 'API_OPS_HEAD',
  SLA_MANAGER = 'SLA_MANAGER',
  REVENUE_ANALYST = 'REVENUE_ANALYST'
}

export interface ConduitUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  lastLogin: string;
  permissions: string[]; // Module IDs
}

export interface APINode {
  id: string;
  name: string;
  type: 'BANK' | 'AA' | 'FIU' | 'AMC' | 'FINTECH' | 'GATEWAY';
  category: APICategory;
  latency: number;
  successRate: number;
  errorRate: number;
  latencyTrend: number[]; // 1h sparkline
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  slaThreshold: number;
  failGuardRisk: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Incident {
  id: string;
  timestamp: string;
  severity: 'P1' | 'P2' | 'P3';
  partnerNodeId: string;
  partnerName: string;
  type: 'LATENCY_SPIKE' | 'API_FAILURE' | 'SLA_BREACH' | 'PREDICTED_FAILURE';
  status: 'DETECTED' | 'CLASSIFIED' | 'ATTRIBUTED' | 'ACTION_TAKEN' | 'RESOLVED';
  aumAtRisk: number; // ₹ Crore
  mttr: string;
  owner: string;
  traceId: string;
}

export interface SLAAttribution {
  partnerId: string;
  partnerName: string;
  partnerType: string;
  slaIndex: number; // 0-100
  breachesMonth: number;
  downtimeMinutes: number;
  avgLatency: number;
  revenueImpact: number; // ₹ Crore
  failGuardRisk: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface RevenueMapping {
  transactionType: string;
  averageValue: number; // ₹
}

export type APICategory = 'LENDING' | 'PAYMENTS' | 'AGGREGATION' | 'WEALTH' | 'UPI' | 'GST';

export interface RevenueShieldData {
  month: string;
  leakage: number; // ₹ Crore
  protected: number; // ₹ Crore
  incidentsPrevented: number;
}

export interface SystemHealth {
  score: number;
  aumAtRisk: number;
  criticalIncidents: number;
  bankName: string;
}
