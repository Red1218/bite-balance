
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Search, Edit, Trash2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedMeals } from "@/hooks/useSavedMeals";
import { useDailyMeals } from "@/hooks/useDailyMeals";
import EditMealDialog from "@/components/EditMealDialog";
import AddSavedMealForm from "@/components/AddSavedMealForm";
import MealTimeSelector from "@/components/MealTimeSelector";

const SavedMeals = () => {
  const { meals: savedMeals, loading, updateMeal, deleteMeal, refetch } = useSavedMeals();
  const { addMealFromSaved } = useDailyMeals();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMeal, setEditingMeal] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMealForToday, setSelectedMealForToday] = useState<any>(null);
  const [isMealTimeSelectorOpen, setIsMealTimeSelectorOpen] = useState(false);

  const filteredMeals = savedMeals.filter(meal =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meal.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleQuickAdd = async (meal: any) => {
    setSelectedMealForToday(meal);
    setIsMealTimeSelectorOpen(true);
  };

  const handleMealTimeSelect = async (mealTime: string) => {
    if (selectedMealForToday) {
      await addMealFromSaved(selectedMealForToday, mealTime);
    }
    setIsMealTimeSelectorOpen(false);
    setSelectedMealForToday(null);
  };

  const handleEditMeal = (meal: any) => {
    setEditingMeal(meal);
    setIsEditDialogOpen(true);
  };

  const handleDeleteMeal = async (meal: any) => {
    if (window.confirm(`Are you sure you want to delete "${meal.name}"?`)) {
      await deleteMeal(meal.id);
    }
  };

  const handleSaveMeal = async (updates: any) => {
    if (editingMeal) {
      await updateMeal(editingMeal.id, updates);
    }
  };

  const handleMealAdded = () => {
    setShowAddForm(false);
    refetch();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse mx-auto mb-4"></div>
              <p className="text-gray-300">Loading saved meals...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-white">💾 Saved Meals</h1>
          <div className="ml-auto">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
              disabled={showAddForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Meal
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="glass-card border-white/10">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search saved meals or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Add New Meal Form */}
        {showAddForm && (
          <AddSavedMealForm
            onMealAdded={handleMealAdded}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Saved Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <Card key={meal.id} className="glass-card border-white/10 hover:border-white/20 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight text-white">{meal.name}</CardTitle>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditMeal(meal)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteMeal(meal)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20 h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {meal.tags?.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-gray-300 border-white/20">
                      🏷️ {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{meal.calories}</div>
                  <p className="text-sm text-gray-400">calories</p>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                  <div>
                    <div className="font-semibold text-red-400">{Math.round(meal.protein || 0)}g</div>
                    <div className="text-gray-400">Protein</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-400">{Math.round(meal.carbs || 0)}g</div>
                    <div className="text-gray-400">Carbs</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-400">{Math.round(meal.fat || 0)}g</div>
                    <div className="text-gray-400">Fat</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-400">{Math.round(meal.fiber || 0)}g</div>
                    <div className="text-gray-400">Fiber</div>
                  </div>
                </div>

                {meal.notes && (
                  <p className="text-sm text-gray-300 italic bg-white/5 p-2 rounded border border-white/10">
                    📝 {meal.notes}
                  </p>
                )}

                <Button 
                  onClick={() => handleQuickAdd(meal)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Today
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMeals.length === 0 && !showAddForm && (
          <Card className="glass-card border-white/10">
            <CardContent className="text-center py-12">
              <p className="text-gray-300 mb-4">
                {searchTerm ? "No saved meals found matching your search." : "No saved meals yet."}
              </p>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Meal
              </Button>
            </CardContent>
          </Card>
        )}

        <EditMealDialog
          meal={editingMeal}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleSaveMeal}
          isDailyMeal={false}
        />

        <MealTimeSelector
          open={isMealTimeSelectorOpen}
          onOpenChange={setIsMealTimeSelectorOpen}
          onSelect={handleMealTimeSelect}
          mealName={selectedMealForToday?.name || ""}
        />
      </div>
    </div>
  );
};

export default SavedMeals;
