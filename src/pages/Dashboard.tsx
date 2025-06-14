
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StepsSection from "@/components/StepsSection";
import MacronutrientsTracker from "@/components/MacronutrientsTracker";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDailyMeals } from "@/hooks/useDailyMeals";
import EditMealDialog from "@/components/EditMealDialog";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const { meals, loading, totals, updateMeal, deleteMeal } = useDailyMeals();
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Calorie goal and percent animated
  const dailyGoal = 2200;
  const progressPercentage = (totals.calories / dailyGoal) * 100;

  const formatMealTime = (mealTime: string) => mealTime.charAt(0).toUpperCase() + mealTime.slice(1);

  const todayData = {
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 rounded-full animate-pulse mx-auto mb-4" style={{background:'#ff4d4d'}}></div>
        <p className="text-gray-300 ml-3">Loading your meals...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-400">📅 {todayData.date}</p>
        </div>
        <Link to="/add-meal">
          <Button className="button-accent shadow-2xl hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Add Meal
          </Button>
        </Link>
      </div>

      {/* Calorie Card */}
      <motion.div
        className="glass-card p-6 flex flex-col items-center justify-center text-center mb-2"
        initial={{ opacity: 0, y: -24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 22 }}
        style={{ background: "rgba(30,36,50,0.75)" }}
      >
        <h2 className="uppercase tracking-widest text-xs mb-1 font-semibold text-accent/90">Calorie Summary</h2>
        <span className="text-5xl font-bold text-white tracking-tight">{totals.calories || 0}</span>
        <p className="text-lg text-gray-300">of <span className="font-semibold">{dailyGoal}</span> kcal</p>
        <div className="w-full mt-4 bg-white/10 rounded-full overflow-hidden h-3">
          <motion.div
            className="h-3 rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          className="mt-2 text-accent font-mono tracking-wider text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >{Math.round(progressPercentage)}% to goal</motion.div>
      </motion.div>

      {/* Macronutrients */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.13, type: "spring", stiffness: 75 }}
      >
        <MacronutrientsTracker totals={totals} />
      </motion.div>

      {/* Steps Section */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.22 }}
      >
        <StepsSection />
      </motion.div>

      {/* Today's Meals */}
      <motion.div
        className="glass-card p-0 animate-fade-in"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 60 }}
      >
        <CardHeader className="pb-1 bg-transparent">
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">🍽️</span> Today's Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {meals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No meals logged yet today!</p>
              <Link to="/add-meal">
                <Button className="button-accent hover:scale-105 duration-150">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Meal
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {meals.map((meal, i) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { 
                        delay: i * 0.07, 
                        type: "spring", 
                        stiffness: 200, 
                        damping: 24 
                      }
                    }}
                    exit={{ opacity: 0, x: 90, rotate: 1, transition: { duration: 0.16 } }}
                    layout
                    className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all shadow-sm border border-white/10 hover:scale-[1.012] duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{meal.name}</h3>
                      <p className="text-xs text-gray-400">{formatMealTime(meal.meal_time)}</p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-400">
                        <span>P: {Math.round(meal.protein || 0)}g</span>
                        <span>C: {Math.round(meal.carbs || 0)}g</span>
                        <span>F: {Math.round(meal.fat || 0)}g</span>
                      </div>
                    </div>
                    <div className="text-right mr-4 min-w-[65px]">
                      <span className="font-bold text-accent text-lg">{meal.calories}</span>
                      <p className="text-xs text-gray-400">cal</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setEditingMeal(meal); setIsEditDialogOpen(true); }}
                        className="text-accent hover:scale-110 duration-100 px-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this meal?')) {
                            await deleteMeal(meal.id);
                            toast({
                              title: "Meal deleted",
                              description: `"${meal.name}" has been removed from your daily log.`,
                              duration: 3000,
                            });
                          }
                        }}
                        className="text-red-400 hover:text-red-600 hover:scale-110 duration-100 px-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </motion.div>
      <EditMealDialog
        meal={editingMeal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={async (updates: any) => {
          if (editingMeal) {
            await updateMeal(editingMeal.id, updates);
            toast({
              title: "Meal updated",
              description: `"${updates.name || editingMeal.name}" has been updated.`,
              duration: 2200,
            });
          }
        }}
        isDailyMeal={true}
      />
    </div>
  );
};

export default Dashboard;
