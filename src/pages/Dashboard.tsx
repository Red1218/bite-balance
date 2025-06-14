
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Utensils, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDailyMeals } from "@/hooks/useDailyMeals";
import EditMealDialog from "@/components/EditMealDialog";
import StepsSection from "@/components/StepsSection";
import MacronutrientsTracker from "@/components/MacronutrientsTracker";
import DailySummary from "@/components/DailySummary";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { meals, loading, totals, updateMeal, deleteMeal } = useDailyMeals();
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const dailyGoal = 2200;

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
          <div className="space-y-8">
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Calendar className="w-4 h-4" />
            <p>{todayData.date}</p>
          </div>
        </div>
        <Link to="/add-meal">
          <Button className="primary-button">
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Daily Summary */}
          <DailySummary calories={totals.calories} goal={dailyGoal} />

          {/* Today's Meals */}
          <Card className="metric-card animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                Today's Meals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {meals.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4">No meals logged today yet.</p>
                  <Link to="/add-meal">
                    <Button className="primary-button">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Meal
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {meals.map((meal, index) => (
                    <div 
                      key={meal.id} 
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-all duration-200 border border-white/5"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{meal.name}</h3>
                        <p className="text-sm text-muted-foreground">{formatMealTime(meal.meal_time)}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>P: {Math.round(meal.protein || 0)}g</span>
                          <span>C: {Math.round(meal.carbs || 0)}g</span>
                          <span>F: {Math.round(meal.fat || 0)}g</span>
                        </div>
                      </div>
                      <div className="text-right mr-4">
                        <span className="font-bold text-primary text-lg">{meal.calories}</span>
                        <p className="text-sm text-muted-foreground">calories</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditMeal(meal)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 transition-all duration-200 hover:scale-110"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMeal(meal.id, meal.name)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Content */}
        <div className="space-y-8">
          {/* Macronutrients Tracker */}
          <MacronutrientsTracker totals={totals} />

          {/* Steps Section */}
          <div className="animate-slide-in-right" style={{ animationDelay: '400ms' }}>
            <StepsSection />
          </div>
        </div>
      </div>

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
