import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import FormSection from '@/components/FormSection';
import InputField from '@/components/InputField';
import RiskBadge from '@/components/RiskBadge';
import LoadingState from '@/components/LoadingState';
import { predictSupplierRisk, type SupplierInput, type SupplierRiskResult } from '@/services/prediction';

export default function SupplierRisk() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SupplierRiskResult | null>(null);

  const [form, setForm] = useState<SupplierInput>({
    supplierId: 'S01',
    supplierName: 'Alpha Components',
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
  });

  const update = (key: keyof SupplierInput) => (value: string) => {
    const numKeys: (keyof SupplierInput)[] = [
      'leadTime', 'avgDeliveryDelay', 'onTimeDeliveryRate', 'qualityAcceptanceRate',
      'reliability', 'historicalDelayCount', 'defectRate', 'orderFrequency', 'avgOrderQuantity',
    ];
    setForm((prev) => ({
      ...prev,
      [key]: numKeys.includes(key) ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleAssess = async () => {
    setLoading(true);
    setResult(null);
    const res = await predictSupplierRisk(form);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Supplier Risk Prediction</h1>
        <p className="text-sm text-gray-500 mt-1">
          Evaluate whether incoming supplier performance may create material availability problems.
        </p>
      </div>

      <FormSection title="Supplier Information" description="Enter supplier performance data to assess delivery risk.">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Supplier ID" value={form.supplierId} onChange={update('supplierId')} />
          <InputField label="Supplier Name" value={form.supplierName} onChange={update('supplierName')} />
          <InputField label="Material" value={form.material} onChange={update('material')} />
          <InputField label="Lead Time" value={form.leadTime} onChange={update('leadTime')} type="number" unit="days" />
          <InputField label="Average Delivery Delay" value={form.avgDeliveryDelay} onChange={update('avgDeliveryDelay')} type="number" unit="days" />
          <InputField label="On-Time Delivery Rate" value={form.onTimeDeliveryRate} onChange={update('onTimeDeliveryRate')} type="number" unit="%" />
          <InputField label="Quality Acceptance Rate" value={form.qualityAcceptanceRate} onChange={update('qualityAcceptanceRate')} type="number" unit="%" />
          <InputField label="Supplier Reliability" value={form.reliability} onChange={update('reliability')} type="number" unit="%" />
          <InputField label="Historical Delay Count" value={form.historicalDelayCount} onChange={update('historicalDelayCount')} type="number" />
          <InputField label="Defect Rate" value={form.defectRate} onChange={update('defectRate')} type="number" unit="%" />
          <InputField label="Order Frequency" value={form.orderFrequency} onChange={update('orderFrequency')} type="number" unit="/mo" />
          <InputField label="Average Order Quantity" value={form.avgOrderQuantity} onChange={update('avgOrderQuantity')} type="number" unit="units" />
        </div>
      </FormSection>

      <FormSection title="Delivery Performance">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-500">On-Time Delivery</p>
            <p className="mt-1 text-lg font-bold text-gray-900">82%</p>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-500">Average Delay</p>
            <p className="mt-1 text-lg font-bold text-gray-900">3.4 days</p>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-500">Quality Performance</p>
            <p className="mt-1 text-lg font-bold text-gray-900">96%</p>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-500">Supplier Reliability</p>
            <p className="mt-1 text-lg font-bold text-gray-900">74%</p>
          </div>
        </div>
      </FormSection>

      <div>
        <button
          onClick={handleAssess}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Assessing...' : 'Assess Supplier Risk'}
        </button>
      </div>

      {loading && <LoadingState message="Calculating supplier risk..." />}

      {result && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Supplier Risk</h3>
              <RiskBadge level={result.riskLevel} size="md" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-gray-900">{result.risk}%</span>
              <span className="text-sm text-gray-500">{result.riskLevel}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-gray-500">Supplier</p>
                <p className="text-sm font-medium text-gray-900">{result.supplier}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Material</p>
                <p className="text-sm font-medium text-gray-900">{result.material}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Main Factors</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {result.factors.map((f) => (
                  <div key={f.label} className="bg-gray-50 rounded-md p-2.5">
                    <p className="text-xs text-gray-500">{f.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-md p-3">
              <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Expected Impact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Material Availability
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 line-through">
                    {result.impact.materialAvailabilityBefore}%
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="text-lg font-bold text-red-600">
                    {result.impact.materialAvailabilityAfter}%
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <TrendingDown className="h-3 w-3" />
                  Decreased availability
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Production Delay Risk
                </p>
                <div className="flex items-center gap-3">
                  <RiskBadge level={result.impact.productionDelayRiskBefore} />
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <RiskBadge level={result.impact.productionDelayRiskAfter} size="md" />
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <TrendingUp className="h-3 w-3" />
                  Risk escalated
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate('/production-risk')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors"
            >
              Check Production Impact
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
