
import React, { useState } from 'react';
import { Rule, defaultRules } from '@/services/ruleEngine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, Save } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';

const RulesConfiguration: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>(defaultRules);
  const { toast } = useToast();

  const handleToggleRule = (id: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const handleWeightChange = (id: string, value: number[]) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id ? { ...rule, weight: value[0] } : rule
      )
    );
  };

  const handleSaveRules = () => {
    // In a real application, this would save to backend
    localStorage.setItem('fraudRules', JSON.stringify(rules));
    toast({
      title: "Rules saved successfully",
      description: "Your rule configuration has been updated",
      variant: "default",
    });
  };

  const getRuleImportanceClass = (weight: number) => {
    if (weight >= 35) return 'text-red-500 dark:text-red-400';
    if (weight >= 25) return 'text-orange-500 dark:text-orange-400';
    return 'text-yellow-500 dark:text-yellow-400';
  };

  return (
    <Card className="hover-scale card-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Fraud Detection Rules</CardTitle>
            <CardDescription className="text-xs mt-1">
              Configure and adjust the rules used to detect fraudulent transactions
            </CardDescription>
          </div>
          <Button 
            size="sm" 
            onClick={handleSaveRules}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {rules.map((rule) => (
            <div key={rule.id} className="border border-white/10 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{rule.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`${getRuleImportanceClass(rule.weight)} border-current/20`}
                    >
                      Weight: {rule.weight}
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                            <InfoIcon className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">{rule.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-xs text-white/60">{rule.description}</p>
                </div>
                <Switch 
                  checked={rule.enabled} 
                  onCheckedChange={() => handleToggleRule(rule.id)}
                  className="data-[state=checked]:bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span>Low</span>
                  <span>Rule Weight</span>
                  <span>High</span>
                </div>
                <Slider 
                  defaultValue={[rule.weight]} 
                  min={5} 
                  max={50} 
                  step={5} 
                  disabled={!rule.enabled}
                  onValueChange={(value) => handleWeightChange(rule.id, value)}
                  className={rule.enabled ? '' : 'opacity-50'}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RulesConfiguration;
