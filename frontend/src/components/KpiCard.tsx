import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  tone?: 'default' | 'green' | 'orange' | 'red';
}

const toneClasses: Record<string, string> = {
  default: 'bg-brand-50 text-brand-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
};

export default function KpiCard({ title, value, subtitle, icon: Icon, tone = 'default' }: KpiCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-2.5 rounded-lg ${toneClasses[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
