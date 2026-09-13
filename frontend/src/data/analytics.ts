export const analyticsSummary = {
  totalSuppliers: 42,
  highRiskSuppliers: 8,
  avgSupplierReliability: 81,
  avgOEE: 72,
};

export const supplierReliabilityData = [
  { supplier: 'S01', reliability: 74 },
  { supplier: 'S02', reliability: 91 },
  { supplier: 'S03', reliability: 86 },
  { supplier: 'S04', reliability: 68 },
  { supplier: 'S05', reliability: 94 },
];

export const productionOeeData = [
  { line: 'Line 1', oee: 82 },
  { line: 'Line 2', oee: 71 },
  { line: 'Line 3', oee: 58 },
  { line: 'Line 4', oee: 76 },
];

export const supplierVsProductionData = [
  { supplier: 'S01', supplierRisk: 78, productionImpact: 84 },
  { supplier: 'S02', supplierRisk: 31, productionImpact: 28 },
  { supplier: 'S03', supplierRisk: 45, productionImpact: 39 },
  { supplier: 'S04', supplierRisk: 72, productionImpact: 67 },
];

export const downtimeParetoData = [
  { cause: 'Equipment Failure', count: 42, cumulative: 42 },
  { cause: 'Material Shortage', count: 28, cumulative: 70 },
  { cause: 'Setup / Changeover', count: 18, cumulative: 88 },
  { cause: 'Quality Issues', count: 12, cumulative: 100 },
  { cause: 'Operator Availability', count: 8, cumulative: 108 },
  { cause: 'Other', count: 5, cumulative: 113 },
];

export const highRiskSuppliersTable = [
  { supplier: 'S01', material: 'Raw Material A', reliability: 74, deliveryDelay: 3.4, risk: 'High' },
  { supplier: 'S04', material: 'Raw Material C', reliability: 68, deliveryDelay: 4.1, risk: 'High' },
  { supplier: 'S08', material: 'Raw Material D', reliability: 71, deliveryDelay: 2.8, risk: 'High' },
];

export const highRiskWorkCentersTable = [
  { id: 'WC-003', risk: 84, oee: 61, utilization: 94 },
  { id: 'WC-007', risk: 76, oee: 65, utilization: 89 },
  { id: 'WC-002', risk: 64, oee: 69, utilization: 84 },
];
