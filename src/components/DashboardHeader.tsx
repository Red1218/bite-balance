
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  todayDate: string;
}

const DashboardHeader = ({ todayDate }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-2 text-muted-foreground mt-1">
          <Calendar className="w-4 h-4" />
          <p className="text-sm sm:text-base">{todayDate}</p>
        </div>
      </div>
      <Link to="/add-meal" className="w-full sm:w-auto">
        <Button className="primary-button w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Meal
        </Button>
      </Link>
    </div>
  );
};

export default DashboardHeader;
