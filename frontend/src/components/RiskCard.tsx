import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import RiskBadge from './RiskBadge';

interface RiskCardProps {
  title: string;
  rows: { label: string; value: ReactNode }[];
  risk: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
  buttonText: string;
  onButtonClick?: () => void;
  to?: string;
}

export default function RiskCard({
  title,
  rows,
  risk,
  riskLevel,
  reason,
  buttonText,
  onButtonClick,
  to,
}: RiskCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <RiskBadge level={riskLevel} size="md" />
      </div>
      <div className="space-y-2.5 mb-4">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between text-sm">
            <span className="text-gray-500">{row.label}</span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{risk}%</span>
          <span className="text-sm text-gray-500">Risk Score</span>
        </div>
      </div>
      <div className="bg-gray-50 rounded-md p-3 mb-4">
        <p className="text-xs text-gray-600 leading-relaxed">{reason}</p>
      </div>
      <div className="mt-auto">
        {to ? (
          <a
            href={to}
            onClick={(e) => {
              if (onButtonClick) {
                e.preventDefault();
                onButtonClick();
              }
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {buttonText}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        ) : (
          <button
            onClick={onButtonClick}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {buttonText}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
