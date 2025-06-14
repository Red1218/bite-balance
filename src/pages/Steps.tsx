
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Check } from "lucide-react";

const Steps = () => {
  const [googleFitConnected, setGoogleFitConnected] = useState(false);
  const [onePlusConnected, setOnePlusConnected] = useState(false);
  const [googleFitLoading, setGoogleFitLoading] = useState(false);
  const [onePlusLoading, setOnePlusLoading] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleGoogleFitConnect = async () => {
    setGoogleFitLoading(true);
    
    // Simulate OAuth process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGoogleFitConnected(true);
    setGoogleFitLoading(false);
    setStepCount(Math.floor(Math.random() * 5000) + 5000);
  };

  const handleOnePlusConnect = async () => {
    setOnePlusLoading(true);
    
    // Simulate OAuth process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOnePlusConnected(true);
    setOnePlusLoading(false);
    setStepCount(Math.floor(Math.random() * 5000) + 5000);
  };

  const handleRefreshSteps = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newSteps = Math.floor(Math.random() * 5000) + 5000;
    setStepCount(newSteps);
    setIsRefreshing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">🦶 Track Your Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Fit Connection */}
          <div className="space-y-2">
            {googleFitConnected ? (
              <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Connected to Google Fit</span>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleGoogleFitConnect}
                  disabled={googleFitLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  {googleFitLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    "Connect to Google Fit"
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">Requires permission to access step data</p>
              </>
            )}
          </div>

          {/* OnePlus Health Connection */}
          <div className="space-y-2">
            {onePlusConnected ? (
              <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">Connected to OnePlus Health</span>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleOnePlusConnect}
                  disabled={onePlusLoading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  {onePlusLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </div>
                  ) : (
                    "Connect to OnePlus Health"
                  )}
                </Button>
                <p className="text-xs text-gray-500 text-center">Requires permission to access step data</p>
              </>
            )}
          </div>

          {/* Step Count Display */}
          {(googleFitConnected || onePlusConnected) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Today's Steps</h3>
                  <p className="text-3xl font-bold text-blue-600">{stepCount.toLocaleString()}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefreshSteps}
                  disabled={isRefreshing}
                  className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-300"
                >
                  <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Steps;
