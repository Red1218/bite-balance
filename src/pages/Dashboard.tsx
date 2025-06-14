import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Utensils, Calendar, Clock } from "lucide-react";
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

  // Group meals by meal_time and calculate totals
  const groupedMeals = meals.reduce((acc, meal) => {
    const mealTime = meal.meal_time || 'snack';
    if (!acc[mealTime]) {
      acc[mealTime] = {
        meals: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0
      };
    }
    acc[mealTime].meals.push(meal);
    acc[mealTime].totalCalories += meal.calories || 0;
    acc[mealTime].totalProtein += meal.protein || 0;
    acc[mealTime].totalCarbs += meal.carbs || 0;
    acc[mealTime].totalFat += meal.fat || 0;
    return acc;
  }, {} as any);

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

  if (loading) {
    return (
      <div className="space-y-6 max-w-full px-2 sm:px-4">
        <div className="flex flex-col gap-4">
          <div>
            <Skeleton className="h-6 sm:h-8 w-32 sm:w-48 mb-2" />
            <Skeleton className="h-4 sm:h-5 w-48 sm:w-64" />
          </div>
          <Skeleton className="h-8 sm:h-10 w-24 sm:w-32" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-64 sm:h-80 w-full" />
          <Skeleton className="h-48 sm:h-64 w-full" />
          <Skeleton className="h-48 sm:h-64 w-full" />
          <Skeleton className="h-48 sm:h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full px-2 sm:px-4">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <Calendar className="w-4 h-4" />
            <p className="text-sm sm:text-base">{todayData.date}</p>
          </div>
        </div>
        <Link to="/add-meal" className="w-full sm:w-auto">
          <Button className="primary-button w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </Link>
      </div>

      {/* Mobile-First Layout - Stacked */}
      <div className="space-y-6">
        {/* Daily Summary */}
        <DailySummary calories={totals.calories} goal={dailyGoal} />

        {/* Today's Meals - New Design */}
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
                <div 
                  key={category.key}
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
                          <span>{hasEntries ? categoryData.totalCalories : 0} kcal</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {hasEntries ? categoryData.meals.length : 0} entries
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
                      {categoryData.meals.map((meal: any, mealIndex: number) => (
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
                                onClick={() => handleEditMeal(meal)}
                                className="w-6 h-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteMeal(meal.id, meal.name)}
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
            })}

            {meals.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">No meals logged today yet.</p>
                <Link to="/add-meal">
                  <Button className="primary-button w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Meal
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Macronutrients Tracker */}
        <MacronutrientsTracker totals={totals} />

        {/* Steps Section */}
        <div className="animate-slide-in-right" style={{ animationDelay: '400ms' }}>
          <StepsSection />
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
