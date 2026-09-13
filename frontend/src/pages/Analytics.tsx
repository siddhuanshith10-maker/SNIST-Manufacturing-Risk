import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter, ZAxis, Legend, Cell,
} from 'recharts';
import { Users, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';
import KpiCard from '@/components/KpiCard';
import ChartCard from '@/components/ChartCard';
import DataTable from '@/components/DataTable';
import RiskBadge from '@/components/RiskBadge';
import {
  analyticsSummary, supplierReliabilityData, productionOeeData,
  supplierVsProductionData, downtimeParetoData,
  highRiskSuppliersTable, highRiskWorkCentersTable,
} from '@/data/analytics';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Production & Supplier Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review historical performance and identify recurring sources of risk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Suppliers" value={analyticsSummary.totalSuppliers} subtitle="Active" icon={Users} />
        <KpiCard title="High-Risk Suppliers" value={analyticsSummary.highRiskSuppliers} subtitle="Require attention" icon={AlertTriangle} tone="red" />
        <KpiCard title="Average Supplier Reliability" value={`${analyticsSummary.avgSupplierReliability}%`} subtitle="Across all suppliers" icon={ShieldCheck} tone="green" />
        <KpiCard title="Average OEE" value={`${analyticsSummary.avgOEE}%`} subtitle="All production lines" icon={Activity} tone="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Supplier Reliability">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={supplierReliabilityData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="supplier" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="reliability" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Production Line OEE">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={productionOeeData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="line" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ stroke: '#d1d5db' }} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="oee" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Supplier Risk vs Production Risk">
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="supplierRisk"
                name="Supplier Risk"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                label={{ value: 'Supplier Risk (%)', position: 'bottom', offset: 0, fill: '#6b7280', fontSize: 11 }}
              />
              <YAxis
                type="number"
                dataKey="productionImpact"
                name="Production Impact"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Production Impact (%)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
              />
              <ZAxis range={[120, 120]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }}
                formatter={(value, name) => [`${value}%`, name === 'supplierRisk' ? 'Supplier Risk' : 'Production Impact']}
                labelFormatter={(_, payload) => payload && payload[0] ? `Supplier ${payload[0].payload.supplier}` : ''}
              />
              <Scatter data={supplierVsProductionData} fill="#3b82f6">
                {supplierVsProductionData.map((entry, i) => (
                  <Cell key={i} fill={entry.supplierRisk >= 65 ? '#ef4444' : entry.supplierRisk >= 40 ? '#f97316' : '#22c55e'} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <p className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-md p-2.5">
            A high supplier risk does not always mean high production risk. The scatter shows each
            supplier's risk against its actual production impact.
          </p>
        </ChartCard>

        <ChartCard title="Downtime Analysis (Pareto)">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={downtimeParetoData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="cause" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ fontSize: 12, borderRadius: 6, border: '1px solid #e5e7eb' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="count" fill="#64748b" radius={[4, 4, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">High Risk Suppliers</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden">
          <DataTable columns={['Supplier', 'Material', 'Reliability', 'Delivery Delay', 'Risk']}>
            {highRiskSuppliersTable.map((row) => (
              <tr key={row.supplier} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.supplier}</td>
                <td className="px-4 py-3 text-gray-700">{row.material}</td>
                <td className="px-4 py-3 text-gray-700">{row.reliability}%</td>
                <td className="px-4 py-3 text-gray-700">{row.deliveryDelay} days</td>
                <td className="px-4 py-3"><RiskBadge level={row.risk} /></td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">High Risk Work Centers</h2>
        <div className="bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden">
          <DataTable columns={['Work Center', 'Risk', 'OEE', 'Utilization']}>
            {highRiskWorkCentersTable.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.id}</td>
                <td className="px-4 py-3 text-gray-700">{row.risk}%</td>
                <td className="px-4 py-3 text-gray-700">{row.oee}%</td>
                <td className="px-4 py-3 text-gray-700">{row.utilization}%</td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
}
