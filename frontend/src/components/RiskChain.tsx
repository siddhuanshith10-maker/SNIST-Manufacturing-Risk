import RiskBadge from './RiskBadge';

interface RiskChainStep {
  label: string;
  detail?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface RiskChainProps {
  steps: RiskChainStep[];
}

export default function RiskChain({ steps }: RiskChainProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-start">
          <div className="bg-white border border-gray-200 rounded-md px-4 py-3 w-full">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{step.label}</p>
            {step.detail && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">{step.detail}</span>
                {step.riskLevel && <RiskBadge level={step.riskLevel} />}
              </div>
            )}
          </div>
          {i < steps.length - 1 && (
            <div className="py-1.5 pl-4 text-gray-400 text-lg leading-none">↓</div>
          )}
        </div>
      ))}
    </div>
  );
}
