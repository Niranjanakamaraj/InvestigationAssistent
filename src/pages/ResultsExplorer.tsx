
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Database, ChevronDown, Link2, Eye, BarChart3 } from 'lucide-react';

const ResultsExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const datasets = [
    {
      id: 1,
      name: "Financial Transaction Analysis",
      type: "Financial",
      intelligenceLevel: "High",
      recordCount: 1247,
      createdDate: "2024-01-15",
      description: "Suspicious transaction patterns identified across multiple accounts",
      preview: {
        type: "table",
        columns: ["Date", "Amount", "Account", "Risk Score"],
        sampleData: [
          ["2024-01-10", "$12,500", "ACC-001", "High"],
          ["2024-01-12", "$8,750", "ACC-002", "Medium"]
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
      preview: {
        type: "timeline",
        events: 15,
        dateRange: "Jan 1-15, 2024"
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
      preview: {
        type: "map",
        locations: 23,
        accuracy: "±50m"
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
      preview: {
        type: "entities",
        people: 45,
        places: 67,
        dates: 123
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
    if (confidence >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (confidence >= 80) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Results Explorer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore and analyze your derived datasets with advanced filtering and preview capabilities.
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="gradient-card p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search datasets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40 rounded-xl">
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
                <SelectTrigger className="w-40 rounded-xl">
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
          </div>
        </Card>

        {/* Dataset Cards */}
        <div className="grid gap-6">
          {filteredDatasets.map((dataset, index) => (
            <Card key={dataset.id} className="gradient-card p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Dataset Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {dataset.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {dataset.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Badge variant="secondary" className={getLevelColor(dataset.intelligenceLevel)}>
                        {dataset.intelligenceLevel} Priority
                      </Badge>
                      <Badge variant="secondary" className={getConfidenceColor(dataset.confidence)}>
                        {dataset.confidence}% Confidence
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                      <p className="font-medium text-gray-900 dark:text-white">{dataset.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Records</p>
                      <p className="font-medium text-gray-900 dark:text-white">{dataset.recordCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                      <p className="font-medium text-gray-900 dark:text-white">{dataset.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Confidence</p>
                      <p className="font-medium text-gray-900 dark:text-white">{dataset.confidence}%</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Visualize
                    </Button>
                    <Button className="gradient-button text-sm px-4 py-2">
                      <Link2 className="w-4 h-4 mr-2" />
                      Chain Task
                    </Button>
                  </div>
                </div>

                {/* Preview Section */}
                <div className="lg:w-80">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Data Preview</h4>
                  
                  {dataset.preview.type === 'table' && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Sample Data ({dataset.preview.columns.join(', ')})
                      </div>
                      <div className="space-y-1">
                        {dataset.preview.sampleData.map((row, idx) => (
                          <div key={idx} className="text-xs text-gray-700 dark:text-gray-300">
                            {row.join(' | ')}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {dataset.preview.type === 'timeline' && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Timeline Preview</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <p>{dataset.preview.events} events</p>
                        <p>{dataset.preview.dateRange}</p>
                      </div>
                    </div>
                  )}

                  {dataset.preview.type === 'map' && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Location Data</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <p>{dataset.preview.locations} locations</p>
                        <p>Accuracy: {dataset.preview.accuracy}</p>
                      </div>
                    </div>
                  )}

                  {dataset.preview.type === 'entities' && (
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Extracted Entities</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <p>People: {dataset.preview.people}</p>
                        <p>Places: {dataset.preview.places}</p>
                        <p>Dates: {dataset.preview.dates}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDatasets.length === 0 && (
          <Card className="gradient-card p-12 text-center animate-fade-in">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No datasets found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or create new datasets from the Task Co-Pilot.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsExplorer;
