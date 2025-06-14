
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, ChevronDown, Clock } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link } from "react-router-dom";

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
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

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const contentVariants: Variants = {
    collapsed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  const chevronVariants: Variants = {
    collapsed: { 
      rotate: 0,
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
    },
    expanded: { 
      rotate: 180,
      transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
    }
  };

  const mealEntries = category.meals.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="seamless-meal-card overflow-hidden">
        {/* Category Header */}
        <motion.div 
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-all duration-300 backdrop-blur-md"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.emoji}</span>
            <div>
              <h3 className="font-semibold text-white text-lg">{category.name}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-300">
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
                className="w-8 h-8 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30 rounded-full backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </Link>
            
            <motion.div
              variants={chevronVariants}
              animate={isExpanded ? "expanded" : "collapsed"}
            >
              <ChevronDown className="w-5 h-5 text-gray-300" />
            </motion.div>
          </div>
        </motion.div>

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
              <div className="border-t border-white/10 bg-black/10 backdrop-blur-md">
                {category.meals.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-300 text-sm mb-3">No meals logged yet</p>
                    <Link to={`/add-meal?mealTime=${category.key}`}>
                      <Button className="primary-button text-sm backdrop-blur-sm">
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
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ 
                            duration: 0.35, 
                            delay: mealIndex * 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          className="glass-card p-3 border border-white/10 hover:bg-white/10 transition-all duration-200 group backdrop-blur-md"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-white text-sm mb-1">{meal.name}</h4>
                              <div className="flex items-center gap-1 text-xs text-gray-300">
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
                                className="w-7 h-7 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30 backdrop-blur-sm"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeleteMeal(meal.id, meal.name)}
                                className="w-7 h-7 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30 backdrop-blur-sm"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-2 text-xs">
                            <div className="text-center">
                              <div className="text-[#ff4d4d] font-semibold">{meal.calories}</div>
                              <div className="text-gray-300">kcal</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.protein || 0)}g</div>
                              <div className="text-gray-300">protein</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.carbs || 0)}g</div>
                              <div className="text-gray-300">carbs</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.fat || 0)}g</div>
                              <div className="text-gray-300">fats</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{Math.round(meal.fiber || 0)}g</div>
                              <div className="text-gray-300">fiber</div>
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
