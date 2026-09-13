export interface WorkCenter {
  id: string;
  risk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  oee: number;
  utilization: number;
  taktTime: number;
  actualCycleTime: number;
  cycleTimeVariability: number;
  throughputRate: number;
  productionDemand: number;
  wip: number;
  unplannedDowntime: number;
  downtimeEventCount: number;
  mtbf: number;
  mttr: number;
  defectRate: number;
  operatorUtilization: number;
  equipmentCondition: number;
  materialAvailability: number;
  expectedSupplierDelay: number;
  materialShortageRisk: number;
}

export const workCenters: WorkCenter[] = [
  {
    id: 'WC-003',
    risk: 84,
    riskLevel: 'HIGH',
    oee: 61,
    utilization: 94,
    taktTime: 45,
    actualCycleTime: 52,
    cycleTimeVariability: 6.5,
    throughputRate: 68,
    productionDemand: 75,
    wip: 38,
    unplannedDowntime: 142,
    downtimeEventCount: 5,
    mtbf: 320,
    mttr: 28,
    defectRate: 3.8,
    operatorUtilization: 91,
    equipmentCondition: 62,
    materialAvailability: 61,
    expectedSupplierDelay: 3,
    materialShortageRisk: 78,
  },
  {
    id: 'WC-007',
    risk: 76,
    riskLevel: 'HIGH',
    oee: 65,
    utilization: 89,
    taktTime: 50,
    actualCycleTime: 56,
    cycleTimeVariability: 5.2,
    throughputRate: 62,
    productionDemand: 70,
    wip: 44,
    unplannedDowntime: 118,
    downtimeEventCount: 4,
    mtbf: 280,
    mttr: 22,
    defectRate: 3.1,
    operatorUtilization: 86,
    equipmentCondition: 68,
    materialAvailability: 68,
    expectedSupplierDelay: 2,
    materialShortageRisk: 65,
  },
  {
    id: 'WC-002',
    risk: 64,
    riskLevel: 'MEDIUM',
    oee: 69,
    utilization: 84,
    taktTime: 48,
    actualCycleTime: 53,
    cycleTimeVariability: 4.1,
    throughputRate: 72,
    productionDemand: 68,
    wip: 30,
    unplannedDowntime: 95,
    downtimeEventCount: 3,
    mtbf: 350,
    mttr: 18,
    defectRate: 2.4,
    operatorUtilization: 80,
    equipmentCondition: 74,
    materialAvailability: 74,
    expectedSupplierDelay: 1,
    materialShortageRisk: 48,
  },
  {
    id: 'WC-005',
    risk: 58,
    riskLevel: 'MEDIUM',
    oee: 72,
    utilization: 81,
    taktTime: 46,
    actualCycleTime: 49,
    cycleTimeVariability: 3.5,
    throughputRate: 76,
    productionDemand: 72,
    wip: 26,
    unplannedDowntime: 78,
    downtimeEventCount: 2,
    mtbf: 400,
    mttr: 15,
    defectRate: 2.0,
    operatorUtilization: 78,
    equipmentCondition: 79,
    materialAvailability: 80,
    expectedSupplierDelay: 1,
    materialShortageRisk: 40,
  },
  {
    id: 'WC-001',
    risk: 28,
    riskLevel: 'LOW',
    oee: 78,
    utilization: 72,
    taktTime: 44,
    actualCycleTime: 42,
    cycleTimeVariability: 2.0,
    throughputRate: 84,
    productionDemand: 70,
    wip: 18,
    unplannedDowntime: 42,
    downtimeEventCount: 1,
    mtbf: 520,
    mttr: 10,
    defectRate: 1.2,
    operatorUtilization: 70,
    equipmentCondition: 88,
    materialAvailability: 89,
    expectedSupplierDelay: 0,
    materialShortageRisk: 22,
  },
];

export const highRiskWorkCenters = workCenters.filter((wc) => wc.riskLevel === 'HIGH');

export const defaultProductionConditions = {
  taktTime: 45,
  actualCycleTime: 52,
  cycleTimeVariability: 6.5,
  throughputRate: 68,
  productionDemand: 75,
  machineUtilization: 94,
  wip: 38,
  unplannedDowntime: 142,
  downtimeEventCount: 5,
  mtbf: 320,
  mttr: 28,
  oee: 61,
  defectRate: 3.8,
  operatorUtilization: 91,
  equipmentCondition: 62,
  materialAvailability: 61,
  expectedSupplierDelay: 3,
  materialShortageRisk: 78,
};
