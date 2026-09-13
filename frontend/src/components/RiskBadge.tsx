interface RiskBadgeProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  size?: 'sm' | 'md';
}

export default function RiskBadge({ level, size = 'sm' }: RiskBadgeProps) {
  const upper = level.toUpperCase();
  const classes =
    upper === 'HIGH'
      ? 'bg-red-100 text-red-700 border-red-200'
      : upper === 'MEDIUM'
      ? 'bg-orange-100 text-orange-700 border-orange-200'
      : 'bg-green-100 text-green-700 border-green-200';

  const sizeClass = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px]';

  return (
    <span className={`inline-flex items-center font-semibold rounded border ${classes} ${sizeClass}`}>
      {upper}
    </span>
  );
}
