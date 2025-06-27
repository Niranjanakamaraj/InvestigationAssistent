
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

interface TaskData {
  id: number;
  originalInput: string;
  paraphrasedTask: string;
  logicSummary: string;
  suggestedFormat: string;
  estimatedTime: string;
}

interface TaskAnalysisProps {
  task: TaskData;
  onRunTask: () => void;
  isProcessing: boolean;
}

const TaskAnalysis = ({ task, onRunTask, isProcessing }: TaskAnalysisProps) => {
  return (
    <Card className="gradient-card p-8 mb-8 animate-scale-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          AI Task Analysis
        </h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2">
          Ready to Execute
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Paraphrased Task</h3>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              {task.paraphrasedTask}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Logic Summary</h3>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              {task.logicSummary}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Suggested Output Format</h3>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              {task.suggestedFormat}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Estimated Processing Time</h3>
            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              {task.estimatedTime}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onRunTask}
          disabled={isProcessing}
          className="gradient-button px-12 py-4 text-lg flex items-center space-x-3"
        >
          <Play className="w-5 h-5" />
          <span>{isProcessing ? 'Processing...' : 'Run Task'}</span>
        </Button>
      </div>
    </Card>
  );
};

export default TaskAnalysis;
