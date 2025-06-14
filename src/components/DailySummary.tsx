
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
  const circumference = 2 * Math.PI * 90; // radius of 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="metric-card border-primary/20 animate-fade-in-up">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Today's Intake</span>
          </div>
          
          {/* Circular Progress Ring */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
              {/* Background ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted/20"
              />
              {/* Progress ring */}
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-primary transition-all duration-500 ease-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-primary">
                {calories.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                from {goal.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {percentage}% achieved
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-muted/10 rounded-lg p-4 border border-white/5 text-center">
              <div className="text-xs text-blue-400 font-medium mb-2">Consumed</div>
              <div className="text-2xl font-bold text-foreground leading-none">{calories.toLocaleString()}</div>
            </div>
            
            <div className="bg-muted/10 rounded-lg p-4 border border-white/5 text-center">
              <div className="text-xs text-green-400 font-medium mb-2">Goal</div>            
              <div className="text-2xl font-bold text-foreground leading-none">{goal.toLocaleString()}</div>
            </div>
            
            <div className="bg-muted/10 rounded-lg p-4 border border-white/5 text-center">
              <div className="text-xs text-purple-400 font-medium mb-2">Left over</div>
              <div className="text-2xl font-bold text-foreground leading-none">{remaining.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">
              {remaining > 0 ? `${remaining} calories remaining` : `${Math.abs(remaining)} calories over`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummary;
