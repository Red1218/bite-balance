
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDailyMeals } from "@/hooks/useDailyMeals";
import EditMealDialog from "@/components/EditMealDialog";
import StepsSection from "@/components/StepsSection";
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
            <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your meals...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">📅 {todayData.date}</p>
        </div>
        <Link to="/add-meal">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </Link>
      </div>

      {/* Daily Progress Bar */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Daily Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Calories: {Math.round(totals.calories)} / {dailyGoal}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Macronutrients */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Macronutrients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{Math.round(totals.protein)}g</div>
              <p className="text-sm text-gray-600">Protein</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{Math.round(totals.carbs)}g</div>
              <p className="text-sm text-gray-600">Carbs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{Math.round(totals.fat)}g</div>
              <p className="text-sm text-gray-600">Fat</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps Section */}
      <div className="animate-fade-in">
        <StepsSection />
      </div>

      {/* Today's Meals */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>📌 Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No meals logged today yet.</p>
              <Link to="/add-meal">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
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
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 animate-fade-in hover:scale-105"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{meal.name}</h3>
                    <p className="text-sm text-gray-600">{formatMealTime(meal.meal_time)}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>P: {Math.round(meal.protein || 0)}g</span>
                      <span>C: {Math.round(meal.carbs || 0)}g</span>
                      <span>F: {Math.round(meal.fat || 0)}g</span>
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <span className="font-bold text-red-600">{meal.calories}</span>
                    <p className="text-sm text-gray-600">calories</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditMeal(meal)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 hover:scale-110"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMeal(meal.id, meal.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 hover:scale-110"
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
