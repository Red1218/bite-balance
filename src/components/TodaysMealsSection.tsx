
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedMealCard from './AnimatedMealCard';
import EmptyMealsState from './EmptyMealsState';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_time: string;
  logged_at: string;
}

interface TodaysMealsSectionProps {
  meals: MealItem[];
  groupedMeals: any;
  onEditMeal: (meal: any) => void;
  onDeleteMeal: (mealId: string, mealName: string) => void;
}

const TodaysMealsSection = ({ 
  meals, 
  groupedMeals, 
  onEditMeal, 
  onDeleteMeal 
}: TodaysMealsSectionProps) => {
  if (meals.length === 0) {
    return (
      <Card className="metric-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Utensils className="w-5 h-5 text-primary" />
            Today's Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyMealsState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="metric-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Utensils className="w-5 h-5 text-primary" />
          Today's Meals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {meals.map((meal, index) => (
              <AnimatedMealCard
                key={meal.id}
                meal={meal}
                index={index}
                onEditMeal={onEditMeal}
                onDeleteMeal={onDeleteMeal}
              />
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysMealsSection;
