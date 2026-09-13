import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Analyzing data...' }: LoadingStateProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-card p-8 flex flex-col items-center justify-center">
      <Loader2 className="h-6 w-6 text-brand-600 animate-spin mb-3" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}
