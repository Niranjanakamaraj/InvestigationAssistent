import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Search,
  Database,
  Link2,
  Eye,
  BarChart3,
} from 'lucide-react';

const chartTypes = ['bar', 'pie'] as const;
type ChartType = (typeof chartTypes)[number];

const ResultsExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [visibleDetails, setVisibleDetails] = useState<number[]>([]);
  const [visibleCharts, setVisibleCharts] = useState<Record<number, ChartType>>({});

  const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  const datasets = [
    {
      id: 1,
      name: "Financial Transaction Analysis",
      type: "Financial",
      intelligenceLevel: "High",
      recordCount: 1247,
      createdDate: "2024-01-15",
      description: "Suspicious transaction patterns identified across multiple accounts",
      details: "This dataset includes banking transactions flagged as suspicious based on amount thresholds and account behavior patterns.",
      preview: {
        columns: ["Date", "Amount", "Account", "Risk Score"],
        sampleData: [
          ["2024-01-10", "$12,500", "ACC-001", "High"],
          ["2024-01-12", "$8,750", "ACC-002", "Medium"]
        ],
        chartData: [
          { label: "ACC-001", value: 12500 },
          { label: "ACC-002", value: 8750 }
        ]
      },
      confidence: 94
    },
    {
      id: 2,
      name: "Communication Timeline",
      type: "Communication",
      intelligenceLevel: "Medium",
      recordCount: 892,
      createdDate: "2024-01-14",
      description: "Phone calls and messages mapped to investigation timeline",
      details: "Includes call logs, SMS metadata, and duration analysis to build a communication profile.",
      preview: {
        columns: ["Contact", "Calls", "Messages"],
        sampleData: [
          ["John", "23", "15"],
          ["Emily", "10", "30"]
        ],
        chartData: [
          { label: "John", value: 38 },
          { label: "Emily", value: 40 }
        ]
      },
      confidence: 87
    },
    {
      id: 3,
      name: "Location Cross-Reference",
      type: "Geospatial",
      intelligenceLevel: "High",
      recordCount: 456,
      createdDate: "2024-01-13",
      description: "Suspect locations correlated with incident timestamps",
      details: "Uses geotags from multiple sources to verify the suspect’s movement pattern.",
      preview: {
        columns: ["Location", "Visits"],
        sampleData: [
          ["Park Street", "5"],
          ["Mall Road", "7"]
        ],
        chartData: [
          { label: "Park Street", value: 5 },
          { label: "Mall Road", value: 7 }
        ]
      },
      confidence: 91
    },
    {
      id: 4,
      name: "Document Entity Extraction",
      type: "Text Analysis",
      intelligenceLevel: "Medium",
      recordCount: 2341,
      createdDate: "2024-01-12",
      description: "Names, dates, and locations extracted from evidence documents",
      details: "Entities are extracted using NLP-based techniques and grouped by entity type for deeper analysis.",
      preview: {
        columns: ["Entity Type", "Count"],
        sampleData: [
          ["People", "45"],
          ["Places", "67"]
        ],
        chartData: [
          { label: "People", value: 45 },
          { label: "Places", value: 67 }
        ]
      },
      confidence: 82
    }
  ];

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || dataset.type === filterType;
    const matchesLevel = filterLevel === 'all' || dataset.intelligenceLevel === filterLevel;
    return matchesSearch && matchesType && matchesLevel;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-800';
    if (confidence >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 space-y-6">
      {/* Filters and Search */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Communication">Communication</SelectItem>
              <SelectItem value="Geospatial">Geospatial</SelectItem>
              <SelectItem value="Text Analysis">Text Analysis</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Dataset Cards */}
      {filteredDatasets.map(dataset => (
        <Card key={dataset.id} className="p-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{dataset.name}</h3>
              <p className="text-sm text-gray-600">{dataset.description}</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <Badge className={getLevelColor(dataset.intelligenceLevel)}>{dataset.intelligenceLevel}</Badge>
              <Badge className={getConfidenceColor(dataset.confidence)}>{dataset.confidence}%</Badge>
            </div>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setVisibleDetails(prev => prev.includes(dataset.id) ? prev.filter(i => i !== dataset.id) : [...prev, dataset.id])}
            >
              <Eye className="w-4 h-4 mr-1" /> View Details
            </Button>
            {chartTypes.map((type) => (
              <Button
                key={type}
                size="sm"
                variant="outline"
                onClick={() => setVisibleCharts(prev => ({ ...prev, [dataset.id]: type }))}
              >
                <BarChart3 className="w-4 h-4 mr-1" /> {type.toUpperCase()}
              </Button>
            ))}
          </div>

          {visibleDetails.includes(dataset.id) && (
            <>
              <p className="mt-4 text-gray-700">{dataset.details}</p>
              <div className="mt-2 bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-500 mb-2">Sample Data ({dataset.preview.columns.join(', ')})</div>
                <div className="space-y-1">
                  {dataset.preview.sampleData.map((row, idx) => (
                    <div key={idx} className="text-xs text-gray-700">
                      {row.join(' | ')}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {visibleCharts[dataset.id] === 'bar' && (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataset.preview.chartData}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {visibleCharts[dataset.id] === 'pie' && (
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataset.preview.chartData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {dataset.preview.chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      ))}

      {filteredDatasets.length === 0 && (
        <Card className="p-12 text-center">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No datasets found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms.</p>
        </Card>
      )}
    </div>
  );
};

export default ResultsExplorer;
