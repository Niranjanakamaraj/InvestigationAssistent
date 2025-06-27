
import { useState } from 'react';
import TaskInput from '@/components/TaskInput';
import TaskAnalysis from '@/components/TaskAnalysis';
import ProcessingIndicator from '@/components/ProcessingIndicator';
import TaskResults from '@/components/TaskResults';

const TaskCoPilot = () => {
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskResult, setTaskResult] = useState<any>(null);

  const handleSubmitTask = (userInput: string) => {
    const newTask = {
      id: Date.now(),
      originalInput: userInput,
      paraphrasedTask: `Analysis Request: ${userInput}`,
      logicSummary: "The AI will process your uploaded documents and extract relevant information based on pattern recognition and keyword analysis.",
      suggestedFormat: "Table with columns: Date, Source, Finding, Confidence Level",
      estimatedTime: "2-3 minutes"
    };

    setCurrentTask(newTask);
  };

  const handleRunTask = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setTaskResult({
        type: 'table',
        data: [
          { date: '2024-01-15', source: 'Document_A.pdf', finding: 'Suspicious transaction of $10,000', confidence: 'High' },
          { date: '2024-01-16', source: 'Statement_B.docx', finding: 'Meeting mentioned at Central Plaza', confidence: 'Medium' },
          { date: '2024-01-17', source: 'Records_C.xlsx', finding: 'Phone call to unknown number', confidence: 'High' }
        ],
        summary: 'Found 3 significant patterns across your uploaded documents.'
      });
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Task Co-Pilot
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Describe your investigation task in natural language and let AI handle the complex analysis.
          </p>
        </div>

        <TaskInput onSubmitTask={handleSubmitTask} />

        {currentTask && (
          <TaskAnalysis 
            task={currentTask}
            onRunTask={handleRunTask}
            isProcessing={isProcessing}
          />
        )}

        {isProcessing && <ProcessingIndicator />}

        {taskResult && <TaskResults result={taskResult} />}
      </div>
    </div>
  );
};

export default TaskCoPilot;
