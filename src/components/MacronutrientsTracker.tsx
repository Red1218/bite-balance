
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MacronutrientsTrackerProps {
  totals: {
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
}

const MacronutrientsTracker = ({ totals }: MacronutrientsTrackerProps) => {
  // Mock daily targets - these could come from user settings later
  const dailyTargets = {
    protein: 150, // grams
    carbs: 250,   // grams
    fat: 80,      // grams
    fiber: 25     // grams
  };

  const calculatePercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const macros = [
    {
      label: 'Protein',
      current: totals.protein,
      target: dailyTargets.protein,
      color: 'blue',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      label: 'Carbs',
      current: totals.carbs,
      target: dailyTargets.carbs,
      color: 'yellow',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      label: 'Fat',
      current: totals.fat,
      target: dailyTargets.fat,
      color: 'red',
      bgColor: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      label: 'Fibre',
      current: totals.fiber || 0,
      target: dailyTargets.fiber,
      color: 'green',
      bgColor: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Macronutrients Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-6">
          {macros.map((macro) => {
            const percentage = calculatePercentage(macro.current, macro.target);
            
            return (
              <div key={macro.label} className="flex-1 flex flex-col items-center space-y-3">
                <div className="text-center">
                  <h3 className={`text-sm font-medium ${macro.textColor}`}>
                    {macro.label}
                  </h3>
                  <div className={`text-xl font-bold ${macro.textColor}`}>
                    {Math.round(percentage)}%
                  </div>
                  <p className="text-xs text-gray-500">
                    {Math.round(macro.current)}g / {macro.target}g
                  </p>
                </div>
                
                <div className="w-full max-w-[120px]">
                  <Progress 
                    value={percentage} 
                    className="h-3 transition-all duration-500 ease-in-out"
                    style={{
                      '--progress-background': macro.color === 'blue' ? '#3b82f6' :
                                            macro.color === 'yellow' ? '#eab308' :
                                            macro.color === 'red' ? '#ef4444' :
                                            '#22c55e'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MacronutrientsTracker;
