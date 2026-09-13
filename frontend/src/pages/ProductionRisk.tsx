import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import FormSection from '@/components/FormSection';
import InputField from '@/components/InputField';
import RiskBadge from '@/components/RiskBadge';
import LoadingState from '@/components/LoadingState';
import DataTable from '@/components/DataTable';
import RiskChain from '@/components/RiskChain';
import { predictProductionRisk, type ProductionInput, type ProductionRiskResult } from '@/services/prediction';

export default function ProductionRisk() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProductionRiskResult | null>(null);

  const [form, setForm] = useState<ProductionInput>({
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
  });

  const update = (key: keyof ProductionInput) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value === '' ? 0 : Number(value) }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    const res = await predictProductionRisk(form);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Production Bottleneck Prediction</h1>
        <p className="text-sm text-gray-500 mt-1">
          Estimate whether current production conditions could lead to a bottleneck.
        </p>
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="h-4 w-4 text-brand-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-700">
          <p className="font-medium text-gray-900">How supplier risk connects to production risk</p>
          <p className="mt-1">
            Supplier risk tells us whether incoming material may be delayed. Production risk tells us
            whether that material problem could affect the factory.
          </p>
        </div>
      </div>

      <FormSection title="Production Performance">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Takt Time" value={form.taktTime} onChange={update('taktTime')} type="number" unit="sec" />
          <InputField label="Actual Cycle Time" value={form.actualCycleTime} onChange={update('actualCycleTime')} type="number" unit="sec" />
          <InputField label="Cycle Time Variability" value={form.cycleTimeVariability} onChange={update('cycleTimeVariability')} type="number" unit="σ" />
          <InputField label="Throughput Rate" value={form.throughputRate} onChange={update('throughputRate')} type="number" unit="u/hr" />
          <InputField label="Production Demand" value={form.productionDemand} onChange={update('productionDemand')} type="number" unit="u/hr" />
        </div>
      </FormSection>

      <FormSection title="Machine & Process">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Machine Utilization" value={form.machineUtilization} onChange={update('machineUtilization')} type="number" unit="%" />
          <InputField label="WIP / Queue" value={form.wip} onChange={update('wip')} type="number" unit="units" />
          <InputField label="Unplanned Downtime" value={form.unplannedDowntime} onChange={update('unplannedDowntime')} type="number" unit="min" />
          <InputField label="Downtime Event Count" value={form.downtimeEventCount} onChange={update('downtimeEventCount')} type="number" />
          <InputField label="MTBF" value={form.mtbf} onChange={update('mtbf')} type="number" unit="hr" />
          <InputField label="MTTR" value={form.mttr} onChange={update('mttr')} type="number" unit="min" />
        </div>
      </FormSection>

      <FormSection title="Quality & Workforce">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="OEE" value={form.oee} onChange={update('oee')} type="number" unit="%" />
          <InputField label="Defect Rate" value={form.defectRate} onChange={update('defectRate')} type="number" unit="%" />
          <InputField label="Operator Utilization" value={form.operatorUtilization} onChange={update('operatorUtilization')} type="number" unit="%" />
          <InputField label="Equipment Condition" value={form.equipmentCondition} onChange={update('equipmentCondition')} type="number" unit="%" />
        </div>
      </FormSection>

      <FormSection title="Material Availability">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField label="Current Material Availability" value={form.materialAvailability} onChange={update('materialAvailability')} type="number" unit="%" />
          <InputField label="Expected Supplier Delay" value={form.expectedSupplierDelay} onChange={update('expectedSupplierDelay')} type="number" unit="days" />
          <InputField label="Material Shortage Risk" value={form.materialShortageRisk} onChange={update('materialShortageRisk')} type="number" unit="%" />
        </div>
      </FormSection>

      <div>
        <button
          onClick={handlePredict}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Predicting...' : 'Predict Production Risk'}
        </button>
      </div>

      {loading && <LoadingState message="Predicting production bottleneck risk..." />}

      {result && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Production Risk Assessment</h3>
              <RiskBadge level={result.riskLevel} size="md" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-xs text-gray-500">Risk Probability</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{result.risk}%</p>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-xs text-gray-500">Status</p>
                <p className="mt-1 text-lg font-bold text-red-600">HIGH RISK</p>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <p className="text-xs text-gray-500">Predicted Work Center</p>
                <p className="mt-1 text-lg font-bold text-gray-900">{result.workCenter}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Why is the risk high?</h3>
            <DataTable columns={['Factor', 'Current Value', 'Effect']}>
              {result.factors.map((f) => (
                <tr key={f.factor} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{f.factor}</td>
                  <td className="px-4 py-3 text-gray-700">{f.currentValue}</td>
                  <td className="px-4 py-3 text-gray-700">{f.effect}</td>
                </tr>
              ))}
            </DataTable>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Risk Explanation</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Risk Chain</h3>
            <RiskChain
              steps={[
                { label: 'Supplier S01', detail: '78%', riskLevel: 'HIGH' },
                { label: 'Expected material delay' },
                { label: 'Material availability decreases' },
                { label: 'WC-003 production affected' },
                { label: 'Bottleneck risk', detail: '84%', riskLevel: 'HIGH' },
              ]}
            />
          </div>

          <div>
            <button
              onClick={() => navigate('/recommendations')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-md hover:bg-brand-700 transition-colors"
            >
              View Recommendations
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
