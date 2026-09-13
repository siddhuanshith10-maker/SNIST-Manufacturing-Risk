export interface SupplierInput {
  supplierId: string;
  supplierName: string;
  material: string;
  leadTime: number;
  avgDeliveryDelay: number;
  onTimeDeliveryRate: number;
  qualityAcceptanceRate: number;
  reliability: number;
  historicalDelayCount: number;
  defectRate: number;
  orderFrequency: number;
  avgOrderQuantity: number;
}

export interface SupplierRiskResult {
  risk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  supplier: string;
  material: string;
  factors: { label: string; value: string }[];
  explanation: string;
  impact: {
    materialAvailabilityBefore: number;
    materialAvailabilityAfter: number;
    productionDelayRiskBefore: 'LOW' | 'MEDIUM' | 'HIGH';
    productionDelayRiskAfter: 'LOW' | 'MEDIUM' | 'HIGH';
  };
}

export interface ProductionInput {
  taktTime: number;
  actualCycleTime: number;
  cycleTimeVariability: number;
  throughputRate: number;
  productionDemand: number;
  machineUtilization: number;
  wip: number;
  unplannedDowntime: number;
  downtimeEventCount: number;
  mtbf: number;
  mttr: number;
  oee: number;
  defectRate: number;
  operatorUtilization: number;
  equipmentCondition: number;
  materialAvailability: number;
  expectedSupplierDelay: number;
  materialShortageRisk: number;
}

export interface ProductionRiskResult {
  risk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  workCenter: string;
  factors: { factor: string; currentValue: string; effect: string }[];
  explanation: string;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function levelFromScore(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (score >= 65) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}

export function calculateSupplierRisk(input: SupplierInput): SupplierRiskResult {
  const delayPenalty = Math.min(30, input.avgDeliveryDelay * 6);
  const leadTimePenalty = Math.min(15, Math.max(0, (input.leadTime - 7) * 1.5));
  const onTimePenalty = Math.max(0, 100 - input.onTimeDeliveryRate) * 0.4;
  const qualityPenalty = Math.max(0, 100 - input.qualityAcceptanceRate) * 0.5;
  const reliabilityPenalty = Math.max(0, 100 - input.reliability) * 0.3;
  const historyPenalty = Math.min(15, input.historicalDelayCount * 1.8);
  const defectPenalty = Math.min(10, input.defectRate * 1.5);

  const raw =
    delayPenalty +
    leadTimePenalty +
    onTimePenalty +
    qualityPenalty +
    reliabilityPenalty +
    historyPenalty +
    defectPenalty;

  const risk = clamp(raw);
  const riskLevel = levelFromScore(risk);

  const availabilityDrop = Math.round((risk / 100) * 30);
  const materialAvailabilityAfter = Math.max(20, 87 - availabilityDrop);

  const explanation = `Supplier ${input.supplierId} has a higher-than-normal risk of delayed material delivery due to repeated historical delays and below-target delivery reliability.`;

  return {
    risk,
    riskLevel,
    supplier: `${input.supplierId} - ${input.supplierName}`,
    material: input.material,
    factors: [
      { label: 'On-time delivery', value: `${input.onTimeDeliveryRate}%` },
      { label: 'Average delay', value: `${input.avgDeliveryDelay} days` },
      { label: 'Reliability', value: `${input.reliability}%` },
      { label: 'Historical delays', value: `${input.historicalDelayCount}` },
    ],
    explanation,
    impact: {
      materialAvailabilityBefore: 87,
      materialAvailabilityAfter,
      productionDelayRiskBefore: 'LOW',
      productionDelayRiskAfter: riskLevel === 'LOW' ? 'LOW' : riskLevel,
    },
  };
}

export function calculateProductionRisk(input: ProductionInput): ProductionRiskResult {
  const utilizationPenalty = Math.max(0, input.machineUtilization - 75) * 0.8;
  const cycleTimePenalty = Math.max(0, input.actualCycleTime - input.taktTime) * 2.5;
  const variabilityPenalty = input.cycleTimeVariability * 1.5;
  const wipPenalty = Math.min(15, Math.max(0, input.wip - 20) * 0.4);
  const downtimePenalty = Math.min(15, input.unplannedDowntime / 12);
  const downtimeEventPenalty = Math.min(8, input.downtimeEventCount * 1.2);
  const mttrPenalty = Math.min(8, input.mttr * 0.15);
  const oeePenalty = Math.max(0, 85 - input.oee) * 0.4;
  const defectPenalty = Math.min(8, input.defectRate * 1.2);
  const demandPenalty = Math.max(0, input.productionDemand - input.throughputRate) * 0.3;
  const materialPenalty = Math.max(0, 100 - input.materialAvailability) * 0.35;
  const supplierDelayPenalty = Math.min(12, input.expectedSupplierDelay * 3);
  const shortagePenalty = (input.materialShortageRisk / 100) * 12;

  const raw =
    utilizationPenalty +
    cycleTimePenalty +
    variabilityPenalty +
    wipPenalty +
    downtimePenalty +
    downtimeEventPenalty +
    mttrPenalty +
    oeePenalty +
    defectPenalty +
    demandPenalty +
    materialPenalty +
    supplierDelayPenalty +
    shortagePenalty;

  const risk = clamp(raw);
  const riskLevel = levelFromScore(risk);

  const factors = [
    { factor: 'Machine Utilization', currentValue: `${input.machineUtilization}%`, effect: input.machineUtilization > 85 ? 'High' : 'Normal' },
    { factor: 'Actual Cycle Time', currentValue: `${input.actualCycleTime} sec`, effect: input.actualCycleTime > input.taktTime ? 'Above takt' : 'Within takt' },
    { factor: 'Takt Time', currentValue: `${input.taktTime} sec`, effect: 'Required rate' },
    { factor: 'WIP Queue', currentValue: `${input.wip} units`, effect: input.wip > 30 ? 'High' : 'Normal' },
    { factor: 'Material Availability', currentValue: `${input.materialAvailability}%`, effect: input.materialAvailability < 70 ? 'Low' : 'Adequate' },
    { factor: 'Supplier Delay', currentValue: `${input.expectedSupplierDelay} days`, effect: input.expectedSupplierDelay > 1 ? 'High' : 'Low' },
  ];

  const explanation = `WC-003 is operating close to its capacity limit. At the same time, material availability is expected to decrease because Supplier S01 has a high delivery risk. This combination increases the probability of a production bottleneck.`;

  return {
    risk,
    riskLevel,
    workCenter: 'WC-003',
    factors,
    explanation,
  };
}

export async function predictSupplierRisk(input: SupplierInput): Promise<SupplierRiskResult> {
  await new Promise((r) => setTimeout(r, 900));
  return calculateSupplierRisk(input);
}

export async function predictProductionRisk(input: ProductionInput): Promise<ProductionRiskResult> {
  await new Promise((r) => setTimeout(r, 900));
  return calculateProductionRisk(input);
}
