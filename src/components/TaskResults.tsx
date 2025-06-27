
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { FileText, Table, BarChart3 } from 'lucide-react';

interface TaskResultData {
  type: string;
  data: Array<{
    date: string;
    source: string;
    finding: string;
    confidence: string;
  }>;
  summary: string;
}

interface TaskResultsProps {
  result: TaskResultData;
}

const TaskResults = ({ result }: TaskResultsProps) => {
  return (
    <Card className="gradient-card p-8 animate-scale-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Analysis Results
        </h2>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2">
            Complete
          </Badge>
          <Link to="/results">
            <Button variant="outline" size="sm" className="rounded-xl">
              View in Explorer
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-lg">
          <strong>Summary:</strong> {result.summary}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">Date</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">Source</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">Finding</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((row, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.date}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.source}</td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.finding}</td>
                <td className="px-6 py-4">
                  <Badge variant={row.confidence === 'High' ? 'default' : 'secondary'} className="px-3 py-1">
                    {row.confidence}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="rounded-xl">
            <FileText className="w-4 h-4 mr-2" />
            Export as PDF
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Table className="w-4 h-4 mr-2" />
            Export as Excel
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <BarChart3 className="w-4 h-4 mr-2" />
            Create Chart
          </Button>
        </div>
        
        <Button className="gradient-button px-6">
          Chain Another Task
        </Button>
      </div>
    </Card>
  );
};

export default TaskResults;
