
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
    <Card className="glass-card border-gradient-blue hover:scale-105 transition-transform duration-300 mx-auto max-w-md float">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg font-bold text-gradient-blue">🦶 Track Your Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connected ? (
          <div className="flex flex-col items-center space-y-3 py-4">
            <p className="text-foreground/70 text-sm mb-2 text-center">
              Connect your tracker to see your steps.
            </p>
            <Button
              onClick={handleConnect}
              disabled={loading}
              size="sm"
              className="w-full bg-neon-blue hover:bg-neon-blue/80 text-white text-xs transition-all duration-300 hover-glow-blue border-0 shadow-lg"
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
            <span className="text-xs text-foreground/50 text-center">
              Requires permission to access step data
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3 py-4">
            <div className="flex items-center space-x-2 glass-nav p-2 border border-neon-cyan/30">
              <Check className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm text-neon-cyan font-medium">Connected</span>
            </div>
            <div className="glass-nav p-3 w-full flex items-center justify-between hover:bg-white/10 transition-all duration-300">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Today's Steps</h3>
                <p className="text-2xl font-bold text-neon-blue animate-glow">{stepCount.toLocaleString()}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefreshSteps}
                disabled={isRefreshing}
                className="h-8 w-8 text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10 hover:scale-110 transition-all duration-300 border border-neon-cyan/20"
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
