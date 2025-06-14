
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import MealCategoryCard from './MealCategoryCard';
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
  const mealCategories = [
    { 
      key: 'breakfast', 
      name: 'Breakfast', 
      icon: '🌅',
      bgGradient: 'from-red-500/10 to-red-600/20',
      iconBg: 'bg-red-500'
    },
    { 
      key: 'lunch', 
      name: 'Lunch', 
      icon: '🌞',
      bgGradient: 'from-red-400/10 to-red-500/20',
      iconBg: 'bg-red-600'
    },
    { 
      key: 'dinner', 
      name: 'Dinner', 
      icon: '🌙',
      bgGradient: 'from-red-600/10 to-red-700/20',
      iconBg: 'bg-red-700'
    },
    { 
      key: 'snack', 
      name: 'Snacks', 
      icon: '🍎',
      bgGradient: 'from-red-300/10 to-red-400/20',
      iconBg: 'bg-red-400'
    }
  ];

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
      <CardContent className="space-y-4">
        {mealCategories.map((category, categoryIndex) => {
          const categoryData = groupedMeals[category.key];
          const hasEntries = categoryData && categoryData.meals.length > 0;
          
          return (
            <MealCategoryCard
              key={category.key}
              category={category}
              categoryData={categoryData}
              hasEntries={hasEntries}
              categoryIndex={categoryIndex}
              onEditMeal={onEditMeal}
              onDeleteMeal={onDeleteMeal}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TodaysMealsSection;
