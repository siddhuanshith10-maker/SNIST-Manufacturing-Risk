import { CalendarClock, Package, Cog, GitBranch, AlertTriangle } from 'lucide-react';
import RiskBadge from '@/components/RiskBadge';
import RecommendationCard from '@/components/RecommendationCard';

export default function Recommendations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Recommended Actions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Prioritize actions based on supplier and production risk.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <h2 className="text-sm font-semibold text-gray-900">Current Priority</h2>
          <RiskBadge level="HIGH" size="md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-500">Supplier</p>
            <p className="text-sm font-semibold text-gray-900">S01 - Alpha Components</p>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-500">Production Area</p>
            <p className="text-sm font-semibold text-gray-900">WC-003</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Recommended Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecommendationCard
            title="Review Supplier Delivery Schedule"
            priority="HIGH"
            problem="Supplier S01 has an expected delivery delay that may reduce material availability for Raw Material A."
            action="Contact Supplier S01 and confirm the next shipment date because the expected delivery delay may reduce material availability."
            impacts={['Material shortage risk', 'Production delay risk']}
            icon={CalendarClock}
          />
          <RecommendationCard
            title="Increase Material Buffer"
            priority="HIGH"
            problem="Material availability is projected to drop from 87% to 61% due to supplier delivery risk."
            action="Consider increasing temporary safety stock for Raw Material A until supplier reliability improves."
            impacts={['Material shortage risk', 'Production delay risk']}
            icon={Package}
          />
          <RecommendationCard
            title="Review WC-003 Capacity"
            priority="HIGH"
            problem="Machine utilization is already at 94%, leaving little room to absorb material delays or demand spikes."
            action="Machine utilization is already at 94%. Evaluate maintenance, staffing, or additional capacity."
            impacts={['Bottleneck risk', 'Throughput loss risk']}
            icon={Cog}
          />
          <RecommendationCard
            title="Control Upstream WIP"
            priority="MEDIUM"
            problem="Excess WIP at WC-007 combined with falling material availability may worsen queue buildup."
            action="Reduce upstream release rates if material availability continues to fall."
            impacts={['WIP buildup risk', 'Cycle time risk']}
            icon={GitBranch}
          />
        </div>
      </div>
    </div>
  );
}
