
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
      color: 'neon-red',
      gradient: 'from-neon-red to-neon-pink'
    },
    {
      label: 'Carbs',
      current: totals.carbs,
      target: dailyTargets.carbs,
      color: 'neon-blue',
      gradient: 'from-neon-blue to-neon-cyan'
    },
    {
      label: 'Fat',
      current: totals.fat,
      target: dailyTargets.fat,
      color: 'neon-pink',
      gradient: 'from-neon-pink to-neon-red'
    },
    {
      label: 'Fibre',
      current: totals.fiber || 0,
      target: dailyTargets.fiber,
      color: 'neon-cyan',
      gradient: 'from-neon-cyan to-neon-blue'
    }
  ];

  return (
    <Card className="glass-card border-gradient-red float">
      <CardHeader>
        <CardTitle className="text-gradient-red">Macronutrients Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {macros.map((macro, index) => {
            const percentage = calculatePercentage(macro.current, macro.target);
            
            return (
              <div 
                key={macro.label} 
                className={`flex flex-col items-center space-y-3 glass-nav p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 slide-in-up delay-${(index + 1) * 100}`}
              >
                <div className="text-center">
                  <h3 className={`text-sm font-medium text-${macro.color}`}>
                    {macro.label}
                  </h3>
                  <div className={`text-2xl font-bold text-${macro.color} animate-glow`}>
                    {Math.round(percentage)}%
                  </div>
                  <p className="text-xs text-foreground/60">
                    {Math.round(macro.current)}g / {macro.target}g
                  </p>
                </div>
                
                <div className="w-full max-w-[120px] relative">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      className={`h-full bg-gradient-to-r ${macro.gradient} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
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
