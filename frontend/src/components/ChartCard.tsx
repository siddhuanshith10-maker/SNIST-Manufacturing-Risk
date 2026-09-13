import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-card p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
