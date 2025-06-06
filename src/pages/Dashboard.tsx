
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target, Flame, Apple, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Mock data - this would come from your state management/API
  const todayData = {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    consumed: 1650,
    goal: 2200,
    protein: 120,
    carbs: 180,
    fat: 75,
    meals: [
      { id: 1, name: "Oatmeal with Berries", time: "Breakfast", calories: 350, protein: 12, carbs: 65, fat: 8 },
      { id: 2, name: "Grilled Chicken Salad", time: "Lunch", calories: 450, protein: 35, carbs: 20, fat: 25 },
      { id: 3, name: "Greek Yogurt", time: "Snack", calories: 150, protein: 15, carbs: 12, fat: 5 },
      { id: 4, name: "Salmon with Rice", time: "Dinner", calories: 700, protein: 45, carbs: 60, fat: 22 },
    ]
  };

  const progressPercentage = (todayData.consumed / todayData.goal) * 100;
  const remaining = Math.max(0, todayData.goal - todayData.consumed);
  
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

  const handleEditMeal = (mealId: number) => {
    console.log("Editing meal:", mealId);
    toast({
      title: "Edit Meal",
      description: "Meal editing functionality coming soon!",
    });
  };

  const handleDeleteMeal = (mealId: number) => {
    console.log("Deleting meal:", mealId);
    toast({
      title: "Meal Deleted",
      description: "The meal has been removed from today's log.",
    });
  };

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
            <div className="text-2xl font-bold">{todayData.consumed}</div>
            <p className="text-xs text-muted-foreground">of {todayData.goal} goal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🎯 Remaining</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remaining}</div>
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
              <span>Calories: {todayData.consumed} / {todayData.goal}</span>
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
              <div className="text-2xl font-bold text-red-500">{todayData.protein}g</div>
              <p className="text-sm text-gray-600">Protein</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{todayData.carbs}g</div>
              <p className="text-sm text-gray-600">Carbs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{todayData.fat}g</div>
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
          <div className="space-y-4">
            {todayData.meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-gray-600">{meal.time}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fat}g</span>
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
                    onClick={() => handleEditMeal(meal.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
