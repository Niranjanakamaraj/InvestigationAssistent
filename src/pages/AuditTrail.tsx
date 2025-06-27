
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Search, Filter, ChevronDown, ChevronUp, User, Bot, FileText, Database, BarChart3 } from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: Date;
  type: 'upload' | 'analysis' | 'query' | 'export' | 'chain';
  actor: 'user' | 'ai';
  title: string;
  description: string;
  sourceFiles?: string[];
  outputFiles?: string[];
  transformationLogic?: string;
  metadata: {
    confidence?: number;
    recordsProcessed?: number;
    executionTime?: string;
    parameters?: any;
  };
  status: 'completed' | 'failed' | 'in_progress';
}

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const auditEvents: AuditEvent[] = [
    {
      id: '1',
      timestamp: new Date('2024-01-15T14:30:00'),
      type: 'upload',
      actor: 'user',
      title: 'Document Upload',
      description: 'Uploaded 3 investigation documents for analysis',
      sourceFiles: ['Evidence_Report_A.pdf', 'Witness_Statement_B.docx', 'Financial_Records_C.xlsx'],
      metadata: {
        recordsProcessed: 3
      },
      status: 'completed'
    },
    {
      id: '2',
      timestamp: new Date('2024-01-15T14:35:00'),
      type: 'analysis',
      actor: 'ai',
      title: 'Financial Pattern Analysis',
      description: 'Analyzed financial transactions for suspicious patterns',
      sourceFiles: ['Financial_Records_C.xlsx'],
      outputFiles: ['Financial_Analysis_Results.json'],
      transformationLogic: 'Applied machine learning algorithms to identify anomalous transaction patterns based on amount, frequency, and timing. Used statistical outlier detection and network analysis.',
      metadata: {
        confidence: 94,
        recordsProcessed: 1247,
        executionTime: '2m 34s',
        parameters: {
          threshold: 10000,
          timeWindow: '30 days',
          algorithm: 'isolation_forest'
        }
      },
      status: 'completed'
    },
    {
      id: '3',
      timestamp: new Date('2024-01-15T15:10:00'),
      type: 'query',
      actor: 'user',
      title: 'Data Chat Query',
      description: 'Asked: "Where was the suspect on June 12th?"',
      sourceFiles: ['Evidence_Report_A.pdf', 'Witness_Statement_B.docx'],
      transformationLogic: 'Natural language processing to extract location and temporal data from unstructured text. Cross-referenced multiple sources for accuracy.',
      metadata: {
        confidence: 87,
        recordsProcessed: 23,
        executionTime: '15s'
      },
      status: 'completed'
    },
    {
      id: '4',
      timestamp: new Date('2024-01-15T15:45:00'),
      type: 'chain',
      actor: 'user',
      title: 'Chained Analysis Task',
      description: 'Connected financial analysis results to timeline analysis',
      sourceFiles: ['Financial_Analysis_Results.json', 'Timeline_Data.json'],
      outputFiles: ['Correlation_Analysis.json'],
      transformationLogic: 'Temporal correlation analysis to identify relationships between financial activities and timeline events. Used time-series analysis and event correlation algorithms.',
      metadata: {
        confidence: 91,
        recordsProcessed: 156,
        executionTime: '1m 12s'
      },
      status: 'completed'
    },
    {
      id: '5',
      timestamp: new Date('2024-01-15T16:20:00'),
      type: 'export',
      actor: 'user',
      title: 'Report Export',
      description: 'Exported comprehensive investigation report',
      sourceFiles: ['Correlation_Analysis.json', 'Financial_Analysis_Results.json'],
      outputFiles: ['Investigation_Report_v1.pdf'],
      metadata: {
        recordsProcessed: 1403,
        executionTime: '45s'
      },
      status: 'completed'
    }
  ];

  const filteredEvents = auditEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const toggleExpand = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'upload': return FileText;
      case 'analysis': return Bot;
      case 'query': return Search;
      case 'export': return Database;
      case 'chain': return BarChart3;
      default: return Clock;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'upload': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'analysis': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'query': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'export': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'chain': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Audit Trail
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete timeline of all investigation tasks, transformations, and outputs.
          </p>
        </div>

        {/* Filters */}
        <Card className="gradient-card p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search audit events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48 rounded-xl">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="upload">Uploads</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="query">Queries</SelectItem>
                <SelectItem value="export">Exports</SelectItem>
                <SelectItem value="chain">Chained Tasks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

          <div className="space-y-6">
            {filteredEvents.map((event, index) => {
              const Icon = getEventIcon(event.type);
              const isExpanded = expandedEvents.has(event.id);
              
              return (
                <div key={event.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Timeline Node */}
                  <div className="absolute left-6 w-4 h-4 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full"></div>
                  
                  {/* Event Card */}
                  <Card className="ml-16 gradient-card p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getEventColor(event.type)}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {event.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(event.status)}>
                                {event.status}
                              </Badge>
                              {event.actor === 'user' ? (
                                <User className="w-4 h-4 text-gray-500" />
                              ) : (
                                <Bot className="w-4 h-4 text-purple-500" />
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {event.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{event.timestamp.toLocaleString()}</span>
                              {event.metadata.recordsProcessed && (
                                <span>• {event.metadata.recordsProcessed} records</span>
                              )}
                              {event.metadata.executionTime && (
                                <span>• {event.metadata.executionTime}</span>
                              )}
                              {event.metadata.confidence && (
                                <span>• {event.metadata.confidence}% confidence</span>
                              )}
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(event.id)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-1" />
                                  Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-1" />
                                  More
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Source Files */}
                          {event.sourceFiles && event.sourceFiles.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Source Files</h4>
                              <div className="space-y-1">
                                {event.sourceFiles.map((file, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                                    {file}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Output Files */}
                          {event.outputFiles && event.outputFiles.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Output Files</h4>
                              <div className="space-y-1">
                                {event.outputFiles.map((file, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                                    {file}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Transformation Logic */}
                        {event.transformationLogic && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Transformation Logic</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              {event.transformationLogic}
                            </p>
                          </div>
                        )}

                        {/* Parameters */}
                        {event.metadata.parameters && (
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Parameters</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              <pre className="whitespace-pre-wrap">
                                {JSON.stringify(event.metadata.parameters, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <Card className="gradient-card p-12 text-center animate-fade-in">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No audit events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or start a new investigation task.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;
