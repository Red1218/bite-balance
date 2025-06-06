
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Search, Edit, Trash2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const SavedMeals = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock saved meals data
  const savedMeals = [
    {
      id: 1,
      name: "🥣 Greek Yogurt with Berries",
      calories: 180,
      protein: 15,
      carbs: 20,
      fat: 5,
      tags: ["Protein", "Healthy", "Quick"],
      notes: "Perfect for breakfast or snack"
    },
    {
      id: 2,
      name: "🍗 Grilled Chicken Breast",
      calories: 250,
      protein: 45,
      carbs: 0,
      fat: 6,
      tags: ["Protein", "Lean", "Dinner"],
      notes: "Plain grilled chicken, 6oz serving"
    },
    {
      id: 3,
      name: "🥑 Avocado Toast",
      calories: 320,
      protein: 8,
      carbs: 30,
      fat: 22,
      tags: ["Healthy Fat", "Breakfast", "Fiber"],
      notes: "Whole grain bread with half avocado"
    },
    {
      id: 4,
      name: "🥤 Protein Smoothie",
      calories: 280,
      protein: 30,
      carbs: 25,
      fat: 8,
      tags: ["Protein", "Post-workout", "Quick"],
      notes: "Protein powder, banana, and almond milk"
    }
  ];

  const filteredMeals = savedMeals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleQuickAdd = (meal: any) => {
    console.log("Adding meal:", meal);
    toast({
      title: "Meal Added!",
      description: `${meal.name} has been added to today's log.`,
    });
  };

  const handleEditMeal = (meal: any) => {
    console.log("Editing meal:", meal);
    toast({
      title: "Edit Meal",
      description: `Editing ${meal.name}. Feature coming soon!`,
    });
  };

  const handleDeleteMeal = (meal: any) => {
    console.log("Deleting meal:", meal);
    toast({
      title: "Meal Deleted",
      description: `${meal.name} has been removed from saved meals.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">💾 Saved Meals</h1>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search saved meals or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Saved Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal) => (
          <Card key={meal.id} className="hover:shadow-lg transition-all duration-200 border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg leading-tight">{meal.name}</CardTitle>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditMeal(meal)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 w-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMeal(meal)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    🏷️ {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{meal.calories}</div>
                <p className="text-sm text-gray-600">calories</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="font-semibold text-red-500">{meal.protein}g</div>
                  <div className="text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-500">{meal.carbs}g</div>
                  <div className="text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="font-semibold text-yellow-500">{meal.fat}g</div>
                  <div className="text-gray-600">Fat</div>
                </div>
              </div>

              {meal.notes && (
                <p className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                  📝 {meal.notes}
                </p>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={() => handleQuickAdd(meal)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Today
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3"
                  title="Quick add with time selection"
                >
                  <Clock className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">No saved meals found matching your search.</p>
            <Link to="/add-meal">
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Meal
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SavedMeals;
