import { ArrowRight } from 'lucide-react';

interface ProcessFlowProps {
  steps: string[];
}

export default function ProcessFlow({ steps }: ProcessFlowProps) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-start">
          <div className="bg-white border border-gray-200 rounded-md px-4 py-2.5 text-sm text-gray-700 w-full max-w-md">
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="py-1.5 pl-4 text-gray-400">
              <ArrowRight className="h-4 w-4 rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
