import type { LucideIcon } from 'lucide-react';
import RiskBadge from './RiskBadge';

interface RecommendationCardProps {
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  problem: string;
  action: string;
  impacts: string[];
  icon: LucideIcon;
}

export default function RecommendationCard({
  title,
  priority,
  problem,
  action,
  impacts,
  icon: Icon,
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5 flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <div className="mt-1">
            <RiskBadge level={priority} />
          </div>
        </div>
      </div>
      <div className="space-y-3 text-sm flex-1">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Problem</p>
          <p className="text-gray-700 leading-relaxed">{problem}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Recommended Action
          </p>
          <p className="text-gray-700 leading-relaxed">{action}</p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Expected Impact
          </p>
          <ul className="space-y-1">
            {impacts.map((impact) => (
              <li key={impact} className="text-gray-700 flex items-center gap-1.5">
                <span className="text-green-600">↓</span>
                {impact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
