import { APINode, Incident, SLAAttribution, RevenueShieldData, ConduitUser, UserRole } from './types.ts';

export const APP_NAME = "Conduit";
export const TAGLINE = "Conduit — India's API reliability operating system for Open Banking.";

export const ENTERPRISE_CLIENT = {
  name: "Enterprise Client",
  healthScore: 92,
  aumAtRisk: 14.2,
  criticalIncidents: 2,
  activeIncidents: 5
};

export const API_NODES: APINode[] = [
  { id: 'node-1', name: 'Primary FIP Gateway', type: 'BANK', category: 'AGGREGATION', latency: 142, successRate: 99.8, errorRate: 0.2, latencyTrend: [140, 145, 142, 138, 142], status: 'HEALTHY', slaThreshold: 200, failGuardRisk: 'LOW' },
  { id: 'node-2', name: 'Partner UPI Node', type: 'BANK', category: 'UPI', latency: 485, successRate: 94.2, errorRate: 5.8, latencyTrend: [420, 450, 480, 490, 485], status: 'CRITICAL', slaThreshold: 500, failGuardRisk: 'HIGH' },
  { id: 'node-3', name: 'Ecosystem AA', type: 'AA', category: 'AGGREGATION', latency: 210, successRate: 98.5, errorRate: 1.5, latencyTrend: [200, 205, 215, 210, 210], status: 'WARNING', slaThreshold: 300, failGuardRisk: 'MEDIUM' },
  { id: 'node-4', name: 'Asset FIU Node', type: 'AMC', category: 'WEALTH', latency: 320, successRate: 99.1, errorRate: 0.9, latencyTrend: [310, 315, 325, 320, 320], status: 'HEALTHY', slaThreshold: 400, failGuardRisk: 'LOW' },
];

export const INCIDENTS: Incident[] = [
  { id: 'INC-2026-001', timestamp: '2026-04-13T10:15:00Z', severity: 'P1', partnerNodeId: 'node-2', partnerName: 'Partner UPI Node', type: 'LATENCY_SPIKE', status: 'ATTRIBUTED', aumAtRisk: 8.4, mttr: '1h 12m', owner: 'System Admin', traceId: 'tr-99281-ax' },
  { id: 'INC-2026-002', timestamp: '2026-04-13T11:45:00Z', severity: 'P2', partnerNodeId: 'node-3', partnerName: 'Ecosystem AA', type: 'SLA_BREACH', status: 'CLASSIFIED', aumAtRisk: 5.8, mttr: '24m', owner: 'Ops Lead', traceId: 'tr-99282-by' },
];

export const SLA_ATTRIBUTIONS: SLAAttribution[] = [
  { partnerId: 'node-1', partnerName: 'Primary FIP Gateway', partnerType: 'BANK', slaIndex: 98, breachesMonth: 2, downtimeMinutes: 14, avgLatency: 145, revenueImpact: 0.8, failGuardRisk: 'LOW' },
  { partnerId: 'node-2', partnerName: 'Partner UPI Node', partnerType: 'BANK', slaIndex: 64, breachesMonth: 18, downtimeMinutes: 240, avgLatency: 492, revenueImpact: 12.4, failGuardRisk: 'HIGH' },
  { partnerId: 'node-3', partnerName: 'Ecosystem AA', partnerType: 'AA', slaIndex: 82, breachesMonth: 8, downtimeMinutes: 95, avgLatency: 215, revenueImpact: 4.2, failGuardRisk: 'MEDIUM' },
];

export const REVENUE_TRENDS: RevenueShieldData[] = [
  { month: 'Jan', leakage: 4.2, protected: 18.5, incidentsPrevented: 142 },
  { month: 'Feb', leakage: 3.8, protected: 22.1, incidentsPrevented: 168 },
  { month: 'Mar', leakage: 5.1, protected: 19.8, incidentsPrevented: 155 },
];

export const CONDUIT_USERS: ConduitUser[] = [
  { id: 'u-1', name: 'System Admin', email: 'abc123@conduit.ac.in', role: UserRole.CTO, lastLogin: '2026-04-13T09:00:00Z', permissions: ['hub', 'scorecard', 'shield', 'incidents', 'ai', 'graph', 'compliance', 'config', 'assistant'] },
  { id: 'u-2', name: 'Ops Lead', email: 'demo@conduit.ac.in', role: UserRole.API_OPS_HEAD, lastLogin: '2026-04-13T08:30:00Z', permissions: ['hub', 'incidents', 'ai', 'assistant'] },
];

export const REVENUE_MAPPINGS = [
  { transactionType: 'SIP Initiation', averageValue: 5000 },
  { transactionType: 'Portfolio Rebalancing', averageValue: 50000 },
  { transactionType: 'MF Redemption', averageValue: 25000 },
  { transactionType: 'Consent Flow Completion', averageValue: 1000 },
  { transactionType: 'Account Statement Fetch', averageValue: 500 },
];
