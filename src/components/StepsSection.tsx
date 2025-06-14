
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StepsSection = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Animate step count change
  const [animateKey, setAnimateKey] = useState(0);

  const handleConnect = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setConnected(true);
    setLoading(false);
    const steps = Math.floor(Math.random() * 5000) + 5000;
    setStepCount(steps);
    setAnimateKey(prev => prev + 1);
  };

  const handleRefreshSteps = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 900));
    const steps = Math.floor(Math.random() * 5000) + 5000;
    setStepCount(steps);
    setIsRefreshing(false);
    setAnimateKey(prev => prev + 1);
  };

  return (
    <div className="p-0">
      {!connected ? (
        <div className="flex flex-col items-center space-y-2 py-5">
          <p className="text-xs text-gray-300 mb-2">
            Connect your fitness tracker to see daily steps.
          </p>
          <Button
            onClick={handleConnect}
            disabled={loading}
            size="sm"
            className="button-accent w-full font-semibold"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-white border-t-accent rounded-full animate-spin" />
                <span>Connecting...</span>
              </div>
            ) : (
              "Connect to Google Fit"
            )}
          </Button>
          <span className="text-xs text-gray-400 mt-2 text-center">
            Permission required for step data.
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-3 py-5">
          <div className="flex items-center space-x-2 px-2 py-0 rounded-lg">
            <Check className="w-5 h-5 text-accent" />
            <span className="text-sm text-accent font-medium">Tracker Connected</span>
          </div>

          <motion.div
            key={animateKey}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg border border-white/10"
          >
            <div>
              <h3 className="text-xs font-semibold text-gray-200">Today's Steps</h3>
              <motion.p
                key={stepCount}
                initial={{ scale: 0.95, color: "#d6d6d6" }}
                animate={{ scale: 1, color: "#ff4d4d" }}
                transition={{ duration: 0.22, type: "spring" }}
                className="text-2xl font-bold"
                style={{ textShadow: "0 0 10px #ff4d4d55" }}
              >{stepCount.toLocaleString()}</motion.p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefreshSteps}
              disabled={isRefreshing}
              className="h-9 w-9 ml-4 text-accent border-none hover:bg-white/10 hover:scale-110 duration-100"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StepsSection;
