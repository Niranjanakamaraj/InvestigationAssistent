
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot } from 'lucide-react';

interface TaskInputProps {
  onSubmitTask: (input: string) => void;
}

const TaskInput = ({ onSubmitTask }: TaskInputProps) => {
  const [userInput, setUserInput] = useState('');

  const sampleTasks = [
    "Analyze financial transactions for suspicious patterns",
    "Extract all dates and locations from witness statements",
    "Cross-reference phone records with timeline evidence",
    "Identify communication patterns between suspects"
  ];

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    onSubmitTask(userInput);
    setUserInput('');
  };

  return (
    <Card className="gradient-card p-8 mb-8 animate-slide-up">
      <div className="flex items-start space-x-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            What would you like to investigate?
          </h2>
          
          <div className="space-y-6">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe your investigation task... For example: 'Find all financial transactions above $5,000 and cross-reference them with the suspect's travel dates'"
              className="min-h-[120px] rounded-xl border-gray-200 dark:border-gray-700 resize-none text-base"
            />
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {sampleTasks.map((task, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setUserInput(task)}
                    className="text-sm rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-300"
                  >
                    {task}
                  </Button>
                ))}
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!userInput.trim()}
                className="gradient-button flex items-center space-x-2 px-8"
              >
                <Send className="w-4 h-4" />
                <span>Analyze Task</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskInput;
