
// Mock AI Service to remove external API dependency
export const getNetworkInsights = async (networkData: any) => {
  // Simulate network latency for "realism"
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    summary: `Analysis for network shows stable growth with a 12% increase in node velocity. Compliance metrics are within the 99.9% threshold.`,
    opportunities: [
      "Expand liquidity provision in the Southeast corridor",
      "Optimize retry policies for Partner UPI Node to reduce MTTR",
      "Implement cross-node load balancing for Ecosystem AA"
    ],
    riskWarnings: [
      "Elevated p99 latency detected in Primary FIP Gateway",
      "Minor discrepancy in SLA reporting from Node-882"
    ]
  };
};

export const analyzeMerchantNode = async (merchant: any) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return { 
    nodeHealth: "OPTIMAL", 
    efficiencyScore: 94.5, 
    strategicAnalysis: "This node demonstrates high throughput with minimal error propagation. Operational stability is trending upwards despite market volatility.", 
    projections: [
      "Projected 15% volume growth over next quarter",
      "Anticipated 5ms reduction in processing overhead"
    ], 
    bottlenecks: ["None identified at current throughput levels"] 
  };
};

export const handleSupportQuery = async (query: string) => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const q = query.toLowerCase();
  let resolution = "I've analyzed your request regarding system operations. All indicators are green.";
  let needsEscalation = false;
  let suggestedAction = "Continue monitoring dashboard for real-time updates.";

  if (q.includes('fail') || q.includes('error') || q.includes('down')) {
    resolution = "Detecting a minor throughput anomaly in the Partner UPI Node. This matches typical maintenance windows.";
    needsEscalation = true;
    suggestedAction = "Initiate automated failover if latency exceeds 500ms.";
  }

  return { resolution, needsEscalation, suggestedAction };
};
