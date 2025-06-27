
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, BarChart3, MapPin, Calendar, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'chart' | 'table' | 'map';
  data?: any;
}

const DataChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI investigation assistant. I can help you analyze your data, answer questions about your cases, and provide insights. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "Where was the suspect on June 12?",
    "Show me financial transactions above $10,000",
    "What are the communication patterns between suspects?",
    "Generate a timeline of all events",
    "Find anomalies in the phone records"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;

      // Generate different response types based on user input
      if (inputMessage.toLowerCase().includes('timeline') || inputMessage.toLowerCase().includes('events')) {
        aiResponse = {
          id: messages.length + 2,
          content: "Here's a timeline of key events based on your investigation data:",
          sender: 'ai',
          timestamp: new Date(),
          type: 'chart',
          data: {
            type: 'timeline',
            events: [
              { date: '2024-01-10', event: 'Initial contact made', location: 'Central Plaza' },
              { date: '2024-01-12', event: 'Financial transaction', amount: '$12,500' },
              { date: '2024-01-15', event: 'Phone call logged', duration: '15 minutes' }
            ]
          }
        };
      } else if (inputMessage.toLowerCase().includes('location') || inputMessage.toLowerCase().includes('where')) {
        aiResponse = {
          id: messages.length + 2,
          content: "Based on the evidence, here are the suspect's known locations:",
          sender: 'ai',
          timestamp: new Date(),
          type: 'table',
          data: {
            columns: ['Date', 'Time', 'Location', 'Source', 'Confidence'],
            rows: [
              ['2024-06-12', '09:30 AM', 'Downtown Office Building', 'CCTV Footage', 'High'],
              ['2024-06-12', '12:15 PM', 'Restaurant District', 'Credit Card Transaction', 'High'],
              ['2024-06-12', '15:45 PM', 'Residential Area', 'Cell Tower Data', 'Medium'],
              ['2024-06-12', '18:20 PM', 'Shopping Mall', 'Witness Statement', 'Medium']
            ]
          }
        };
      } else if (inputMessage.toLowerCase().includes('financial') || inputMessage.toLowerCase().includes('transaction')) {
        aiResponse = {
          id: messages.length + 2,
          content: "I found several significant financial transactions. Here's the analysis:",
          sender: 'ai',
          timestamp: new Date(),
          type: 'chart',
          data: {
            type: 'financial',
            summary: 'Found 23 transactions above $10,000 in the past 30 days',
            totalAmount: '$287,450',
            suspiciousCount: 5
          }
        };
      } else {
        aiResponse = {
          id: messages.length + 2,
          content: `I understand you're asking about: "${inputMessage}". Let me analyze your investigation data and provide relevant insights. Based on the documents you've uploaded, I can see patterns related to your query.`,
          sender: 'ai',
          timestamp: new Date(),
          type: 'text'
        };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';
    
    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
        <div className={`max-w-4xl ${isUser ? 'order-2' : 'order-1'}`}>
          <div className="flex items-start space-x-3">
            {!isUser && (
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className="flex-1">
              <div className={`rounded-2xl p-4 ${
                isUser 
                  ? 'bg-gradient-primary text-white' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}>
                <p className="text-sm mb-2">{message.content}</p>
                
                {/* Render special content based on message type */}
                {message.type === 'table' && message.data && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-600">
                          {message.data.columns.map((col: string, idx: number) => (
                            <th key={idx} className="text-left p-2 font-medium">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {message.data.rows.map((row: string[], idx: number) => (
                          <tr key={idx} className="border-b border-gray-100 dark:border-gray-700">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="p-2">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {message.type === 'chart' && message.data && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {message.data.type === 'timeline' && (
                      <div className="space-y-3">
                        {message.data.events.map((event: any, idx: number) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{event.event}</p>
                              <p className="text-xs text-gray-500">{event.date} • {event.location || event.amount || event.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.data.type === 'financial' && (
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{message.data.totalAmount}</p>
                          <p className="text-xs text-gray-500">Total Amount</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{message.data.suspiciousCount}</p>
                          <p className="text-xs text-gray-500">Suspicious</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm">{message.data.summary}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <span>{message.timestamp.toLocaleTimeString()}</span>
                {message.type !== 'text' && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {message.type === 'chart' ? 'Chart' : message.type === 'table' ? 'Table' : 'Data'}
                  </Badge>
                )}
              </div>
            </div>
            
            {isUser && (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Data Chat
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ask questions about your investigation data using natural language.
          </p>
        </div>

        {/* Chat Container */}
        <Card className="gradient-card h-[calc(100vh-200px)] flex flex-col animate-slide-up">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map(renderMessage)}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Try asking:
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="text-xs rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about your investigation data..."
                  className="rounded-xl border-gray-200 dark:border-gray-600"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="gradient-button px-6 flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataChat;
