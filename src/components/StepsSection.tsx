
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Check } from "lucide-react";

const StepsSection = () => {
  // Only one tracker: Google Fit (can later make this configurable)
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulates OAuth flow
  const handleConnect = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnected(true);
    setLoading(false);
    setStepCount(Math.floor(Math.random() * 5000) + 5000);
  };

  // Simulates refreshing step count
  const handleRefreshSteps = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStepCount(Math.floor(Math.random() * 5000) + 5000);
    setIsRefreshing(false);
  };

  return (
    <Card className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300 mx-auto max-w-md">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-bold">🦶 Track Your Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connected ? (
          <div className="flex flex-col items-center space-y-3 py-4">
            <p className="text-gray-600 text-sm mb-2">
              Connect your tracker to see your steps.
            </p>
            <Button
              onClick={handleConnect}
              disabled={loading}
              size="sm"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs transition-colors"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting...</span>
                </div>
              ) : (
                "Connect to Google Fit"
              )}
            </Button>
            <span className="text-xs text-gray-500 text-center">
              Requires permission to access step data
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 py-4">
            <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-200">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">Connected</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg w-full flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Today's Steps</h3>
                <p className="text-xl font-bold text-blue-600">{stepCount.toLocaleString()}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefreshSteps}
                disabled={isRefreshing}
                className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-300"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StepsSection;
