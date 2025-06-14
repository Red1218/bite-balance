
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Check, Footprints, Smartphone } from "lucide-react";

const StepsSection = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnected(true);
    setLoading(false);
    setStepCount(Math.floor(Math.random() * 5000) + 5000);
  };

  const handleRefreshSteps = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStepCount(Math.floor(Math.random() * 5000) + 5000);
    setIsRefreshing(false);
  };

  return (
    <Card className="metric-card">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Footprints className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          Activity Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connected ? (
          <div className="text-center space-y-4 py-4 sm:py-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs sm:text-sm mb-4 px-2">
                Connect your fitness tracker to monitor daily activity.
              </p>
              <Button
                onClick={handleConnect}
                disabled={loading}
                className="primary-button w-full"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Connect Google Fit</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 p-2 sm:p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-xs sm:text-sm text-green-400 font-medium">Connected</span>
            </div>
            
            <div className="text-center space-y-2 p-3 sm:p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Today's Steps</h3>
                  <p className="text-xl sm:text-2xl font-bold text-primary">{stepCount.toLocaleString()}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRefreshSteps}
                  disabled={isRefreshing}
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              
              <div className="w-full bg-muted/30 rounded-full h-2 mt-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((stepCount / 10000) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Goal: 10,000 steps</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StepsSection;
