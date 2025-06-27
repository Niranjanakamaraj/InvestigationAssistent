
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Upload, Bot, Database, MessageCircle, Clock, FileText, BarChart3, Users, Shield } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: 'Smart File Upload',
      description: 'Drag and drop Word, PDF, and Excel files with automatic metadata extraction',
      href: '/upload',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'AI Task Co-Pilot',
      description: 'Intelligent task automation with natural language processing',
      href: '/copilot',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Database,
      title: 'Results Explorer',
      description: 'Explore and analyze derived datasets with advanced filtering',
      href: '/results',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'Data Chat',
      description: 'Ask questions about your data using conversational AI',
      href: '/chat',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: 'Audit Trail',
      description: 'Complete timeline of all tasks and transformations',
      href: '/audit',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: FileText,
      title: 'Case Reports',
      description: 'Generate comprehensive investigation reports automatically',
      href: '/reports',
      gradient: 'from-teal-500 to-blue-500'
    }
  ];

  const stats = [
    { icon: BarChart3, label: 'Files Processed', value: '1,247' },
    { icon: Users, label: 'Active Cases', value: '23' },
    { icon: Shield, label: 'Security Level', value: 'High' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI-Powered
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Investigation
              </span>
              Assistant
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your investigation workflow with intelligent document processing, 
              automated analysis, and conversational data insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button className="gradient-button text-lg px-8 py-4 h-auto">
                  Start Investigation
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" className="text-lg px-8 py-4 h-auto border-white/30 text-white hover:bg-white/10">
                  Try AI Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="gradient-card p-6 text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Investigation Suite
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to conduct thorough, efficient, and accurate investigations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.href}>
                <Card className="gradient-card p-8 h-full hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to revolutionize your investigations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of investigators using AI to solve cases faster and more accurately.
          </p>
          <Link to="/upload">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-medium px-8 py-4 text-lg h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
