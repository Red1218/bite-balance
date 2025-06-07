
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target, Flame, Apple, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDailyMeals } from "@/hooks/useDailyMeals";
import EditMealDialog from "@/components/EditMealDialog";

const Dashboard = () => {
  const { meals, loading, totals, updateMeal, deleteMeal } = useDailyMeals();
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Mock daily goal - this could come from user settings
  const dailyGoal = 2200;

  const progressPercentage = (totals.calories / dailyGoal) * 100;
  const remaining = Math.max(0, dailyGoal - totals.calories);
  
  const getProgressColor = () => {
    if (progressPercentage < 70) return "bg-green-500";
    if (progressPercentage < 90) return "bg-yellow-500"; 
    return "bg-red-500";
  };

  const getStatusText = () => {
    if (progressPercentage < 70) return "On Track";
    if (progressPercentage < 90) return "Close to Goal";
    if (progressPercentage < 110) return "At Goal";
    return "Over Goal";
  };

  const handleEditMeal = (meal: any) => {
    setEditingMeal(meal);
    setIsEditDialogOpen(true);
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      await deleteMeal(mealId);
    }
  };

  const handleSaveMeal = async (updates: any) => {
    if (editingMeal) {
      await updateMeal(editingMeal.id, updates);
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

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🔢 Calories Consumed</CardTitle>
            <Flame className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totals.calories)}</div>
            <p className="text-xs text-muted-foreground">of {dailyGoal} goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🎯 Remaining</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(remaining)}</div>
            <p className="text-xs text-muted-foreground">calories left</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📊 Progress</CardTitle>
            <Apple className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <p className="text-xs text-muted-foreground">{getStatusText()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">✅ Status</CardTitle>
            <div className={`h-3 w-3 rounded-full ${getProgressColor()}`}></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusText()}</div>
            <p className="text-xs text-muted-foreground">current status</p>
          </CardContent>
        </Card>
      </div>

      {/* Calorie Progress Bar */}
      <Card>
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
      <Card>
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

      {/* Today's Meals */}
      <Card>
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
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMeal(meal.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
