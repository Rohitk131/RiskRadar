
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import EnhancedTransactionTable from '@/components/dashboard/EnhancedTransactionTable';
import MetricsChart from '@/components/dashboard/MetricsChart';
import TimeSeriesChart from '@/components/dashboard/TimeSeriesChart';
import ConfusionMatrix from '@/components/dashboard/ConfusionMatrix';
import FilterToolbar from '@/components/dashboard/FilterToolbar';
import RulesConfiguration from '@/components/dashboard/RulesConfiguration';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

import { 
  AlertTriangle, 
  CreditCard, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle,
  Zap,
  Settings,
  BarChart,
  ListFilter,
  Database
} from 'lucide-react';

// Mock data for charts
const channelData = [
  { name: 'Web', predicted: 65, reported: 48 },
  { name: 'Mobile', predicted: 45, reported: 32 },
  { name: 'POS', predicted: 15, reported: 11 },
  { name: 'ATM', predicted: 22, reported: 17 },
];

const paymentModeData = [
  { name: 'Card', predicted: 72, reported: 56 },
  { name: 'UPI', predicted: 43, reported: 28 },
  { name: 'NEFT', predicted: 19, reported: 12 },
  { name: 'RTGS', predicted: 8, reported: 5 },
];

const timeSeriesData = [
  { name: 'Jan', predicted: 12, reported: 9 },
  { name: 'Feb', predicted: 18, reported: 14 },
  { name: 'Mar', predicted: 15, reported: 12 },
  { name: 'Apr', predicted: 22, reported: 17 },
  { name: 'May', predicted: 25, reported: 19 },
  { name: 'Jun', predicted: 32, reported: 24 },
  { name: 'Jul', predicted: 28, reported: 21 },
  { name: 'Aug', predicted: 36, reported: 29 },
  { name: 'Sep', predicted: 42, reported: 32 },
  { name: 'Oct', predicted: 38, reported: 29 },
  { name: 'Nov', predicted: 48, reported: 35 },
  { name: 'Dec', predicted: 52, reported: 39 },
];

const Index = () => {
  const [selectedView, setSelectedView] = useState<'dashboard' | 'rules'>('dashboard');

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-display">
              {selectedView === 'dashboard' ? 'Fraud Detection Dashboard' : 'Rule Configuration'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {selectedView === 'dashboard' 
                ? 'Monitor transactions, analyze fraud patterns, and evaluate detection performance.' 
                : 'Configure and adjust the rules used for fraud detection.'}
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant={selectedView === 'dashboard' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedView('dashboard')}
              className={`flex items-center space-x-2 ${selectedView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/5 border-white/10'}`}
            >
              <BarChart className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            
            <Button 
              variant={selectedView === 'rules' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedView('rules')}
              className={`flex items-center space-x-2 ${selectedView === 'rules' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white/5 border-white/10'}`}
            >
              <Settings className="h-4 w-4" />
              <span>Rule Engine</span>
            </Button>
          </div>
        </div>

        {selectedView === 'dashboard' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Transactions"
                value="24,562"
                subtitle="Last 30 days"
                icon={<CreditCard className="h-4 w-4" />}
                trend={12}
              />
              <StatCard
                title="Fraud Detected"
                value="486"
                subtitle="1.98% of total"
                icon={<AlertTriangle className="h-4 w-4" />}
                trend={8}
                variant="fraud"
              />
              <StatCard
                title="Fraud Reported"
                value="372"
                subtitle="76.5% confirmation rate"
                icon={<AlertCircle className="h-4 w-4" />}
                trend={-3}
                variant="warning"
              />
              <StatCard
                title="Amount Saved"
                value="$1.2M"
                subtitle="From prevented fraud"
                icon={<DollarSign className="h-4 w-4" />}
                trend={-15}
                variant="safe"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard 
                title="Transaction Monitoring" 
                description="Compare predicted vs reported fraud cases"
                toolbar={<FilterToolbar />}
                contentClassName="pt-6"
              >
                <Tabs defaultValue="channel" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="channel">By Channel</TabsTrigger>
                    <TabsTrigger value="payment">By Payment Mode</TabsTrigger>
                  </TabsList>
                  <TabsContent value="channel">
                    <MetricsChart data={channelData} />
                  </TabsContent>
                  <TabsContent value="payment">
                    <MetricsChart data={paymentModeData} />
                  </TabsContent>
                </Tabs>
              </ChartCard>

              <ChartCard 
                title="Fraud Trends Over Time" 
                description="Historical trend of fraud detection and reporting"
              >
                <TimeSeriesChart data={timeSeriesData} />
              </ChartCard>
            </div>

            <ChartCard 
              title="Model Performance Evaluation" 
              description="Confusion matrix and key performance metrics"
            >
              <ConfusionMatrix 
                truePositive={372} 
                falsePositive={114} 
                trueNegative={23962} 
                falseNegative={114} 
              />
            </ChartCard>

            <ChartCard 
              title="Enhanced Transaction Monitoring" 
              description="Monitor and investigate recent transaction activity with advanced rule-based analysis"
            >
              <EnhancedTransactionTable />
            </ChartCard>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <RulesConfiguration />
              </div>
              
              <div className="space-y-6">
                <ChartCard 
                  title="Rule Effectiveness" 
                  description="Performance of each rule in detecting fraud"
                >
                  <div className="p-6 text-center">
                    <Database className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">Rule effectiveness analytics will be available after processing sufficient transaction data.</p>
                  </div>
                </ChartCard>
                
                <ChartCard 
                  title="Quick Actions" 
                  description="Common rule management tasks"
                >
                  <div className="space-y-2 p-2">
                    <Button variant="outline" className="w-full justify-start text-left border-white/10 bg-white/5 hover:bg-white/10">
                      <ListFilter className="h-4 w-4 mr-2" />
                      <span>Reset Rules to Default</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left border-white/10 bg-white/5 hover:bg-white/10">
                      <Database className="h-4 w-4 mr-2" />
                      <span>Import Rules Configuration</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left border-white/10 bg-white/5 hover:bg-white/10">
                      <Zap className="h-4 w-4 mr-2" />
                      <span>Optimize Rules Automatically</span>
                    </Button>
                  </div>
                </ChartCard>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;
