import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AddMeal = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mealData, setMealData] = useState({
    name: "",
    mealTime: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add meals",
        variant: "destructive"
      });
      return;
    }

    if (!mealData.name || !mealData.mealTime || !mealData.calories) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('daily_meals')
        .insert({
          user_id: user.id,
          name: mealData.name,
          calories: Number(mealData.calories),
          protein: Number(mealData.protein) || 0,
          carbs: Number(mealData.carbs) || 0,
          fat: Number(mealData.fat) || 0,
          fiber: Number(mealData.fiber) || 0,
          meal_time: mealData.mealTime,
          logged_date: mealData.date
        });

      if (error) throw error;

      toast({
        title: "Meal added",
        description: `"${mealData.name}" has been added to your daily log.`,
      });
      
      // Reset form
      setMealData({
        name: "",
        mealTime: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        fiber: "",
        date: new Date().toISOString().split('T')[0],
        notes: ""
      });

      // Navigate back to dashboard
      navigate("/");
    } catch (error) {
      console.error('Error adding meal:', error);
      toast({
        title: "Error",
        description: "Failed to add meal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-medium text-white">Add New Meal</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Meal Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white text-base">Meal Name</Label>
            <Input
              id="name"
              value={mealData.name}
              onChange={(e) => setMealData({ ...mealData, name: e.target.value })}
              placeholder="e.g., Chicken Salad"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-14 text-base"
              required
            />
          </div>

          {/* Calories */}
          <div className="space-y-2">
            <Label htmlFor="calories" className="text-white text-base">Calories</Label>
            <Input
              id="calories"
              type="number"
              value={mealData.calories}
              onChange={(e) => setMealData({ ...mealData, calories: e.target.value })}
              placeholder="Enter total calories"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-14 text-base"
              required
            />
          </div>

          {/* Macronutrients */}
          <div className="space-y-4">
            <h3 className="text-white text-base font-medium">Macronutrients</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="protein" className="text-gray-300 text-sm">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  value={mealData.protein}
                  onChange={(e) => setMealData({ ...mealData, protein: e.target.value })}
                  placeholder="g"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="carbs" className="text-gray-300 text-sm">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  value={mealData.carbs}
                  onChange={(e) => setMealData({ ...mealData, carbs: e.target.value })}
                  placeholder="g"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fat" className="text-gray-300 text-sm">Fats (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  value={mealData.fat}
                  onChange={(e) => setMealData({ ...mealData, fat: e.target.value })}
                  placeholder="g"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fiber" className="text-gray-300 text-sm">Fiber (g)</Label>
                <Input
                  id="fiber"
                  type="number"
                  step="0.1"
                  value={mealData.fiber}
                  onChange={(e) => setMealData({ ...mealData, fiber: e.target.value })}
                  placeholder="g"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl h-12"
                />
              </div>
            </div>
          </div>

          {/* Meal Time */}
          <div className="space-y-2">
            <Label htmlFor="mealTime" className="text-white text-base">Meal Time</Label>
            <Select 
              value={mealData.mealTime} 
              onValueChange={(value) => setMealData({ ...mealData, mealTime: value })}
              required
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white rounded-xl h-14 text-base [&>svg]:text-gray-400">
                <SelectValue placeholder="Select meal time" className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="breakfast" className="text-white hover:bg-gray-700">Breakfast</SelectItem>
                <SelectItem value="lunch" className="text-white hover:bg-gray-700">Lunch</SelectItem>
                <SelectItem value="dinner" className="text-white hover:bg-gray-700">Dinner</SelectItem>
                <SelectItem value="snack" className="text-white hover:bg-gray-700">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hidden Date Field (keeping existing functionality) */}
          <input
            type="hidden"
            value={mealData.date}
            onChange={(e) => setMealData({ ...mealData, date: e.target.value })}
          />

          {/* Submit Button */}
          <div className="pt-8">
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white h-14 text-lg font-medium rounded-xl"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Meal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
