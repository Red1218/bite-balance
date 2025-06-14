
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDailyMeals } from "@/hooks/useDailyMeals";
import EditMealDialog from "@/components/EditMealDialog";
import StepsSection from "@/components/StepsSection";
import MacronutrientsTracker from "@/components/MacronutrientsTracker";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { meals, loading, totals, updateMeal, deleteMeal } = useDailyMeals();
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock daily goal - this could come from user settings
  const dailyGoal = 2200;

  const progressPercentage = (totals.calories / dailyGoal) * 100;

  const handleEditMeal = (meal: any) => {
    setEditingMeal(meal);
    setIsEditDialogOpen(true);
  };

  const handleDeleteMeal = async (mealId: string, mealName: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      await deleteMeal(mealId);
      toast({
        title: "Meal deleted",
        description: `"${mealName}" has been removed from your daily log.`,
      });
    }
  };

  const handleSaveMeal = async (updates: any) => {
    if (editingMeal) {
      await updateMeal(editingMeal.id, updates);
      toast({
        title: "Meal updated",
        description: `"${updates.name || editingMeal.name}" has been updated.`,
      });
    }
  };

  const formatMealTime = (mealTime: string) => {
    return mealTime.charAt(0).toUpperCase() + mealTime.slice(1);
  };

  const todayData = {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 bg-neon-red rounded-full animate-pulse mx-auto mb-4 neon-glow-red"></div>
            <p className="text-foreground/70">Loading your meals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="glass-card p-6 slide-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gradient-red">BiteBalance</h1>
            <p className="text-foreground/70 mt-1">📅 {todayData.date}</p>
          </div>
          <Link to="/add-meal">
            <Button className="bg-neon-red hover:bg-neon-red/80 text-white hover-glow-red border-0 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Meal
            </Button>
          </Link>
        </div>
      </div>

      {/* Daily Progress Bar */}
      <Card className="glass-card border-gradient-red slide-in-up delay-100">
        <CardHeader>
          <CardTitle className="text-gradient-red">Daily Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-foreground/80">
              <span>Calories: {Math.round(totals.calories)} / {dailyGoal}</span>
              <span className="text-neon-red font-semibold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="relative">
              <Progress value={progressPercentage} className="h-4 bg-white/10 overflow-hidden" />
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-red to-neon-pink transition-all duration-500 ease-out rounded-full"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macronutrients Tracker */}
      <div className="slide-in-up delay-200">
        <MacronutrientsTracker totals={totals} />
      </div>

      {/* Steps Section */}
      <div className="slide-in-up delay-300">
        <StepsSection />
      </div>

      {/* Today's Meals */}
      <Card className="glass-card border-gradient-blue slide-in-up delay-400">
        <CardHeader>
          <CardTitle className="text-gradient-blue">📌 Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-foreground/70 mb-4">No meals logged today yet.</p>
              <Link to="/add-meal">
                <Button className="bg-neon-blue hover:bg-neon-blue/80 text-white hover-glow-blue border-0 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Meal
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div 
                  key={meal.id} 
                  className={`glass-nav p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 slide-in-right delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{meal.name}</h3>
                      <p className="text-sm text-foreground/60">{formatMealTime(meal.meal_time)}</p>
                      <div className="flex gap-4 mt-2 text-xs text-foreground/50">
                        <span>P: {Math.round(meal.protein || 0)}g</span>
                        <span>C: {Math.round(meal.carbs || 0)}g</span>
                        <span>F: {Math.round(meal.fat || 0)}g</span>
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <span className="font-bold text-neon-red text-lg">{meal.calories}</span>
                      <p className="text-sm text-foreground/60">calories</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMeal(meal)}
                        className="text-neon-blue hover:text-neon-blue hover:bg-neon-blue/10 transition-all duration-200 hover:scale-110 border border-neon-blue/20 hover:border-neon-blue/40"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMeal(meal.id, meal.name)}
                        className="text-neon-red hover:text-neon-red hover:bg-neon-red/10 transition-all duration-200 hover:scale-110 border border-neon-red/20 hover:border-neon-red/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EditMealDialog
        meal={editingMeal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveMeal}
        isDailyMeal={true}
      />
    </div>
  );
};

export default Dashboard;
