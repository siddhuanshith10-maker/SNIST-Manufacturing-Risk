export interface Supplier {
  id: string;
  name: string;
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
  risk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const suppliers: Supplier[] = [
  {
    id: 'S01',
    name: 'Alpha Components',
    material: 'Raw Material A',
    leadTime: 14,
    avgDeliveryDelay: 3.4,
    onTimeDeliveryRate: 82,
    qualityAcceptanceRate: 96,
    reliability: 74,
    historicalDelayCount: 8,
    defectRate: 4.0,
    orderFrequency: 12,
    avgOrderQuantity: 5000,
    risk: 78,
    riskLevel: 'HIGH',
  },
  {
    id: 'S02',
    name: 'Beta Industries',
    material: 'Raw Material B',
    leadTime: 7,
    avgDeliveryDelay: 0.8,
    onTimeDeliveryRate: 96,
    qualityAcceptanceRate: 99,
    reliability: 91,
    historicalDelayCount: 1,
    defectRate: 1.0,
    orderFrequency: 8,
    avgOrderQuantity: 3200,
    risk: 31,
    riskLevel: 'LOW',
  },
  {
    id: 'S03',
    name: 'Gamma Supplies',
    material: 'Raw Material C',
    leadTime: 10,
    avgDeliveryDelay: 1.9,
    onTimeDeliveryRate: 90,
    qualityAcceptanceRate: 97,
    reliability: 86,
    historicalDelayCount: 3,
    defectRate: 2.5,
    orderFrequency: 10,
    avgOrderQuantity: 4100,
    risk: 45,
    riskLevel: 'MEDIUM',
  },
  {
    id: 'S04',
    name: 'Delta Materials',
    material: 'Raw Material C',
    leadTime: 16,
    avgDeliveryDelay: 4.1,
    onTimeDeliveryRate: 79,
    qualityAcceptanceRate: 94,
    reliability: 68,
    historicalDelayCount: 9,
    defectRate: 5.2,
    orderFrequency: 14,
    avgOrderQuantity: 6200,
    risk: 72,
    riskLevel: 'HIGH',
  },
  {
    id: 'S05',
    name: 'Epsilon Parts',
    material: 'Raw Material E',
    leadTime: 6,
    avgDeliveryDelay: 0.4,
    onTimeDeliveryRate: 98,
    qualityAcceptanceRate: 99,
    reliability: 94,
    historicalDelayCount: 0,
    defectRate: 0.8,
    orderFrequency: 6,
    avgOrderQuantity: 2800,
    risk: 18,
    riskLevel: 'LOW',
  },
  {
    id: 'S06',
    name: 'Zeta Manufacturing',
    material: 'Raw Material F',
    leadTime: 9,
    avgDeliveryDelay: 1.2,
    onTimeDeliveryRate: 93,
    qualityAcceptanceRate: 98,
    reliability: 88,
    historicalDelayCount: 2,
    defectRate: 1.8,
    orderFrequency: 9,
    avgOrderQuantity: 3600,
    risk: 38,
    riskLevel: 'LOW',
  },
  {
    id: 'S07',
    name: 'Eta Components',
    material: 'Raw Material G',
    leadTime: 11,
    avgDeliveryDelay: 2.1,
    onTimeDeliveryRate: 88,
    qualityAcceptanceRate: 95,
    reliability: 83,
    historicalDelayCount: 4,
    defectRate: 3.0,
    orderFrequency: 11,
    avgOrderQuantity: 4500,
    risk: 52,
    riskLevel: 'MEDIUM',
  },
  {
    id: 'S08',
    name: 'Theta Industries',
    material: 'Raw Material D',
    leadTime: 13,
    avgDeliveryDelay: 2.8,
    onTimeDeliveryRate: 84,
    qualityAcceptanceRate: 95,
    reliability: 71,
    historicalDelayCount: 7,
    defectRate: 4.5,
    orderFrequency: 13,
    avgOrderQuantity: 5200,
    risk: 69,
    riskLevel: 'HIGH',
  },
];

export const highRiskSuppliers = suppliers.filter((s) => s.riskLevel === 'HIGH');
