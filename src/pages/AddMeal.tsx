
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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add Meal to Today</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Meal Name *</Label>
                <Input
                  id="name"
                  value={mealData.name}
                  onChange={(e) => setMealData({ ...mealData, name: e.target.value })}
                  placeholder="e.g., Grilled Chicken Salad"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mealTime">Meal Time *</Label>
                <Select 
                  value={mealData.mealTime} 
                  onValueChange={(value) => setMealData({ ...mealData, mealTime: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories *</Label>
                <Input
                  id="calories"
                  type="number"
                  value={mealData.calories}
                  onChange={(e) => setMealData({ ...mealData, calories: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={mealData.date}
                  onChange={(e) => setMealData({ ...mealData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Macronutrients (optional)</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    step="0.1"
                    value={mealData.protein}
                    onChange={(e) => setMealData({ ...mealData, protein: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    step="0.1"
                    value={mealData.carbs}
                    onChange={(e) => setMealData({ ...mealData, carbs: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    step="0.1"
                    value={mealData.fat}
                    onChange={(e) => setMealData({ ...mealData, fat: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiber">Fiber (g)</Label>
                  <Input
                    id="fiber"
                    type="number"
                    step="0.1"
                    value={mealData.fiber}
                    onChange={(e) => setMealData({ ...mealData, fiber: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="bg-red-500 hover:bg-red-600 text-white flex-1"
                disabled={loading}
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Adding..." : "Add to Today"}
              </Button>
              <Link to="/saved-meals" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Quick Add from Saved
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMeal;
