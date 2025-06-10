
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const StepsSection = () => {
  const [steps, setSteps] = useState(7420);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshSteps = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock new step count
    const newSteps = Math.floor(Math.random() * 5000) + 5000;
    setSteps(newSteps);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">👣 Steps Taken Today</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefreshSteps}
          disabled={isLoading}
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <ArrowDown className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-600">
          {steps.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">steps today</p>
      </CardContent>
    </Card>
  );
};

export default StepsSection;
