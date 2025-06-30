
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section - Cleaner and more focused */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            AI Investigation
            <span className="block text-blue-600 dark:text-blue-400">
              Assistant 
            </span>
            for CDR/IPDR
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your investigation workflow with intelligent document processing and automated analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Start Investigation
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="outline" size="lg" className="px-8 py-4 rounded-xl border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                Try AI Chat
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section - More refined */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-8 text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Grid - Cleaner spacing and design */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Complete Investigation Suite
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need for thorough and efficient investigations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.href}>
                <Card className="p-8 h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
    </div>
  );
};

export default Index;
