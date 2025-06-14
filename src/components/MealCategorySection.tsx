
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, ChevronDown, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_time: string;
  logged_at: string;
}

interface MealCategory {
  key: string;
  name: string;
  emoji: string;
  meals: MealItem[];
  totalCalories: number;
}

interface MealCategorySectionProps {
  category: MealCategory;
  index: number;
  onEditMeal: (meal: any) => void;
  onDeleteMeal: (mealId: string, mealName: string) => void;
}

const MealCategorySection = ({ 
  category, 
  index, 
  onEditMeal, 
  onDeleteMeal 
}: MealCategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const contentVariants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const chevronVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 }
  };

  const mealEntries = category.meals.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg">
        {/* Category Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.emoji}</span>
            <div>
              <h3 className="font-semibold text-white text-lg">{category.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span className="text-[#ff4d4d] font-medium">{category.totalCalories} kcal</span>
                <span>•</span>
                <span>{mealEntries} {mealEntries === 1 ? 'entry' : 'entries'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to={`/add-meal?mealTime=${category.key}`}>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
            
            <motion.div
              variants={chevronVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="overflow-hidden"
            >
              <div className="border-t border-white/10 bg-white/[0.02]">
                {category.meals.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-400 text-sm mb-3">No meals logged yet</p>
                    <Link to={`/add-meal?mealTime=${category.key}`}>
                      <Button className="primary-button text-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add {category.name}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    <AnimatePresence mode="popLayout">
                      {category.meals.map((meal, mealIndex) => (
                        <motion.div
                          key={meal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: mealIndex * 0.05 }}
                          className="bg-white/5 rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-sm mb-1">{meal.name}</h4>
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>
                                  {new Date(meal.logged_at).toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditMeal(meal)}
                                className="w-7 h-7 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeleteMeal(meal.id, meal.name)}
                                className="w-7 h-7 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="text-center">
                              <div className="text-[#ff4d4d] font-semibold">{meal.calories}</div>
                              <div className="text-gray-400">kcal</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.protein || 0)}g</div>
                              <div className="text-gray-400">protein</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.carbs || 0)}g</div>
                              <div className="text-gray-400">carbs</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.fat || 0)}g</div>
                              <div className="text-gray-400">fats</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MealCategorySection;
