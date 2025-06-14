
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Target, TrendingUp } from "lucide-react";

interface DailySummaryProps {
  calories: number;
  goal: number;
}

const DailySummary = ({ calories, goal }: DailySummaryProps) => {
  const percentage = Math.round((calories / goal) * 100);
  const remaining = Math.max(0, goal - calories);

  return (
    <Card className="metric-card border-primary/20 animate-fade-in-up">
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Today's Intake</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-6xl font-bold text-primary">
              {calories.toLocaleString()}
            </div>
            <div className="text-lg text-muted-foreground">
              of {goal.toLocaleString()} calories
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">
              {remaining > 0 ? `${remaining} calories remaining` : `${Math.abs(remaining)} calories over`}
            </span>
          </div>
          
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummary;
