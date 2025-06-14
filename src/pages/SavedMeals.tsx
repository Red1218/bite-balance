
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 bg-[#ff4d4d] rounded-full animate-pulse mx-auto mb-4"></div>
              <p className="text-gray-300">Loading saved meals...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-medium text-white">💾 Saved Meals</h1>
          <div className="ml-auto">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-[#ff4d4d] hover:bg-[#ff4d4d]/90 text-white h-10 px-4 shadow-lg"
              disabled={showAddForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search saved meals or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Add New Meal Form */}
        {showAddForm && (
          <AddSavedMealForm
            onMealAdded={handleMealAdded}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Saved Meals List */}
        <div className="space-y-4">
          {filteredMeals.map((meal) => (
            <div key={meal.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium text-white truncate pr-2 flex-1">{meal.name}</h3>
                <div className="flex gap-1 flex-shrink-0">
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

              <div className="flex flex-wrap gap-2 mb-4">
                {meal.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-gray-300 border-white/20">
                    🏷️ {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-[#ff4d4d]">{meal.calories}</div>
                <p className="text-sm text-gray-400">calories</p>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-sm mb-4">
                <div>
                  <div className="font-semibold text-red-400">{Math.round(meal.protein || 0)}g</div>
                  <div className="text-gray-400 text-xs">Protein</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-400">{Math.round(meal.carbs || 0)}g</div>
                  <div className="text-gray-400 text-xs">Carbs</div>
                </div>
                <div>
                  <div className="font-semibold text-yellow-400">{Math.round(meal.fat || 0)}g</div>
                  <div className="text-gray-400 text-xs">Fat</div>
                </div>
                <div>
                  <div className="font-semibold text-green-400">{Math.round(meal.fiber || 0)}g</div>
                  <div className="text-gray-400 text-xs">Fiber</div>
                </div>
              </div>

              {meal.notes && (
                <p className="text-sm text-gray-300 italic bg-white/5 p-2 rounded border border-white/10 mb-4">
                  📝 {meal.notes}
                </p>
              )}

              <Button 
                onClick={() => handleQuickAdd(meal)}
                className="w-full bg-[#ff4d4d] hover:bg-[#ff4d4d]/90 text-white h-12 shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Today
              </Button>
            </div>
          ))}
        </div>

        {filteredMeals.length === 0 && !showAddForm && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center shadow-lg">
            <p className="text-gray-300 mb-4">
              {searchTerm ? "No saved meals found matching your search." : "No saved meals yet."}
            </p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-[#ff4d4d] hover:bg-[#ff4d4d]/90 text-white h-12 px-6 shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Meal
            </Button>
          </div>
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
