import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Package, Gauge, Activity, ArrowRight, ArrowDown } from 'lucide-react';
import KpiCard from '@/components/KpiCard';
import RiskCard from '@/components/RiskCard';
import RiskBadge from '@/components/RiskBadge';
import ProcessFlow from '@/components/ProcessFlow';
import DataTable from '@/components/DataTable';

const priorityRows = [
  { priority: 1, issue: 'Supplier delivery delay', area: 'Supplier S01', risk: 'High', action: 'Review delivery schedule' },
  { priority: 2, issue: 'Low material availability', area: 'Material A', risk: 'High', action: 'Check current inventory' },
  { priority: 3, issue: 'High machine utilization', area: 'WC-003', risk: 'High', action: 'Review machine capacity' },
  { priority: 4, issue: 'Excess WIP', area: 'WC-007', risk: 'Medium', action: 'Reduce upstream release' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Production Risk Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor supplier risks and production conditions before they affect manufacturing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Supplier Risk" value={8} subtitle="High-risk suppliers" icon={AlertTriangle} tone="red" />
        <KpiCard title="Production Risk" value={5} subtitle="High-risk work centers" icon={Activity} tone="red" />
        <KpiCard title="Material Availability" value="87%" subtitle="Available" icon={Package} tone="green" />
        <KpiCard title="Production Capacity" value="82%" subtitle="Utilized" icon={Gauge} tone="orange" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Current Risk Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RiskCard
            title="Supplier Risk"
            rows={[
              { label: 'Supplier', value: 'S01 - Alpha Components' },
              { label: 'Material', value: 'Raw Material A' },
            ]}
            risk={78}
            riskLevel="HIGH"
            reason="Supplier has experienced repeated delivery delays and above-average lead time."
            buttonText="View Supplier Risk"
            onButtonClick={() => navigate('/supplier-risk')}
          />
          <RiskCard
            title="Production Bottleneck Risk"
            rows={[{ label: 'Work Center', value: 'WC-003' }]}
            risk={84}
            riskLevel="HIGH"
            reason="High machine utilization combined with low material availability and cycle time above takt time."
            buttonText="View Production Risk"
            onButtonClick={() => navigate('/production-risk')}
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">How Supplier Risk Can Affect Production</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
          <ProcessFlow
            steps={[
              'Supplier S01',
              'Expected delivery delay',
              'Raw material availability decreases',
              'WC-003 receives less material',
              'WIP / queue changes',
              'Production bottleneck risk increases',
            ]}
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Risk Relationship</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-stretch">
            <div className="border border-red-200 bg-red-50 rounded-md p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Supplier Risk</p>
              <p className="mt-1 text-lg font-bold text-gray-900">S01</p>
              <p className="text-sm font-semibold text-red-600">78% HIGH</p>
            </div>
            <div className="hidden md:flex items-center justify-center text-gray-400">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="border border-orange-200 bg-orange-50 rounded-md p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Material Risk</p>
              <p className="mt-1 text-lg font-bold text-gray-900">Availability</p>
              <p className="text-sm font-semibold text-orange-600">61%</p>
            </div>
            <div className="hidden md:flex items-center justify-center text-gray-400">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="border border-red-200 bg-red-50 rounded-md p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Production Risk</p>
              <p className="mt-1 text-lg font-bold text-gray-900">WC-003</p>
              <p className="text-sm font-semibold text-red-600">84% HIGH</p>
            </div>
          </div>
          <div className="flex justify-center my-3 text-gray-400">
            <ArrowDown className="h-5 w-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="border border-gray-200 bg-gray-50 rounded-md p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Business Impact</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">Potential production delay</p>
            </div>
            <div className="border border-brand-200 bg-brand-50 rounded-md p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Action</p>
              <p className="mt-1 text-sm font-semibold text-brand-700">
                Review supplier + protect WC-003 capacity
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Today's Priority</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden">
          <DataTable columns={['Priority', 'Issue', 'Area', 'Risk', 'Recommended Action']}>
            {priorityRows.map((row) => (
              <tr key={row.priority} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.priority}</td>
                <td className="px-4 py-3 text-gray-700">{row.issue}</td>
                <td className="px-4 py-3 text-gray-700">{row.area}</td>
                <td className="px-4 py-3">
                  <RiskBadge level={row.risk} />
                </td>
                <td className="px-4 py-3 text-gray-700">{row.action}</td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}
