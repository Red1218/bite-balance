
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Clock, Utensils } from "lucide-react";
import { Link } from "react-router-dom";

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  logged_at: string;
}

interface CategoryData {
  meals: MealItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface MealCategory {
  key: string;
  name: string;
  icon: string;
  bgGradient: string;
  iconBg: string;
}

interface MealCategoryCardProps {
  category: MealCategory;
  categoryData?: CategoryData;
  hasEntries: boolean;
  categoryIndex: number;
  onEditMeal: (meal: any) => void;
  onDeleteMeal: (mealId: string, mealName: string) => void;
}

const MealCategoryCard = ({ 
  category, 
  categoryData, 
  hasEntries, 
  categoryIndex,
  onEditMeal,
  onDeleteMeal 
}: MealCategoryCardProps) => {
  return (
    <div 
      className={`rounded-2xl p-4 bg-gradient-to-br ${category.bgGradient} border border-red-500/20`}
      style={{ animationDelay: `${categoryIndex * 100}ms` }}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${category.iconBg} rounded-full flex items-center justify-center text-white text-lg`}>
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Utensils className="w-3 h-3" />
              <span>{hasEntries ? categoryData!.totalCalories : 0} kcal</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {hasEntries ? categoryData!.meals.length : 0} entries
          </span>
          <Link to="/add-meal">
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0 hover:bg-red-500/20">
              <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Meal Items */}
      {hasEntries ? (
        <div className="space-y-3">
          {categoryData!.meals.map((meal: MealItem, mealIndex: number) => (
            <div 
              key={meal.id}
              className="bg-background/40 backdrop-blur-sm rounded-xl p-3 border border-red-500/10"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{meal.name}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(meal.logged_at).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditMeal(meal)}
                    className="w-6 h-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteMeal(meal.id, meal.name)}
                    className="w-6 h-6 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-red-400">{meal.calories}</div>
                  <div className="text-xs text-muted-foreground">kcal</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-500">{Math.round(meal.protein || 0)} g</div>
                  <div className="text-xs text-muted-foreground">protein</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-300">{Math.round(meal.carbs || 0)} g</div>
                  <div className="text-xs text-muted-foreground">carbs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{Math.round(meal.fat || 0)} g</div>
                  <div className="text-xs text-muted-foreground">fat</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <span className="text-sm">No entries yet</span>
        </div>
      )}
    </div>
  );
};

export default MealCategoryCard;
