import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, Play, FileText, BarChart3, Table } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCoPilot = () => {
  const [userInput, setUserInput] = useState('');
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [taskResult, setTaskResult] = useState<any>(null);

  const sampleTasks = [
    "Analyze financial transactions for suspicious patterns",
    "Extract all dates and locations from witness statements",
    "Cross-reference phone records with timeline evidence",
    "Identify communication patterns between suspects"
  ];

  const handleSubmitTask = () => {
    if (!userInput.trim()) return;

    // Simulate AI processing
    const newTask = {
      id: Date.now(),
      originalInput: userInput,
      paraphrasedTask: `Analysis Request: ${userInput}`,
      logicSummary: "The AI will process your uploaded documents and extract relevant information based on pattern recognition and keyword analysis.",
      suggestedFormat: "Table with columns: Date, Source, Finding, Confidence Level",
      estimatedTime: "2-3 minutes"
    };

    setCurrentTask(newTask);
    setUserInput('');
  };

  const handleRunTask = () => {
    setIsProcessing(true);
    
    // Simulate processing
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
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Task Co-Pilot
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Describe your investigation task in natural language and let AI handle the complex analysis.
          </p>
        </div>

        {/* Task Input Section */}
        <Card className="gradient-card p-6 mb-8 animate-slide-up">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What would you like to investigate?
              </h2>
              
              <div className="space-y-4">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your investigation task... For example: 'Find all financial transactions above $5,000 and cross-reference them with the suspect's travel dates'"
                  className="min-h-[120px] rounded-xl border-gray-200 dark:border-gray-700 resize-none"
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {sampleTasks.map((task, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setUserInput(task)}
                        className="text-xs rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        {task}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    onClick={handleSubmitTask}
                    disabled={!userInput.trim()}
                    className="gradient-button flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Analyze Task</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Task Analysis Card */}
        {currentTask && (
          <Card className="gradient-card p-6 mb-8 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                AI Task Analysis
              </h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Ready to Execute
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Paraphrased Task</h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {currentTask.paraphrasedTask}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Logic Summary</h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {currentTask.logicSummary}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Suggested Output Format</h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {currentTask.suggestedFormat}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Estimated Processing Time</h3>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {currentTask.estimatedTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleRunTask}
                disabled={isProcessing}
                className="gradient-button px-8 py-3 text-lg flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>{isProcessing ? 'Processing...' : 'Run Task'}</span>
              </Button>
            </div>
          </Card>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <Card className="gradient-card p-8 mb-8 animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI Analysis in Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Processing your documents and extracting relevant insights...
              </p>
            </div>
          </Card>
        )}

        {/* Results Section */}
        {taskResult && (
          <Card className="gradient-card p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Analysis Results
              </h2>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Complete
                </Badge>
                <Link to="/results">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    View in Explorer
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <strong>Summary:</strong> {taskResult.summary}
              </p>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="border border-gray-200 dark:border-gray-700 p-3 text-left font-medium">Date</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-3 text-left font-medium">Source</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-3 text-left font-medium">Finding</th>
                    <th className="border border-gray-200 dark:border-gray-700 p-3 text-left font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {taskResult.data.map((row: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="border border-gray-200 dark:border-gray-700 p-3">{row.date}</td>
                      <td className="border border-gray-200 dark:border-gray-700 p-3">{row.source}</td>
                      <td className="border border-gray-200 dark:border-gray-700 p-3">{row.finding}</td>
                      <td className="border border-gray-200 dark:border-gray-700 p-3">
                        <Badge variant={row.confidence === 'High' ? 'default' : 'secondary'}>
                          {row.confidence}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <FileText className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Table className="w-4 h-4 mr-2" />
                  Export as Excel
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Create Chart
                </Button>
              </div>
              
              <Button className="gradient-button">
                Chain Another Task
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TaskCoPilot;
