
import { Card } from '@/components/ui/card';
import { Bot } from 'lucide-react';

const ProcessingIndicator = () => {
  return (
    <Card className="gradient-card p-12 mb-8 animate-scale-in">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
          AI Analysis in Progress
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Processing your documents and extracting relevant insights...
        </p>
      </div>
    </Card>
  );
};

export default ProcessingIndicator;
