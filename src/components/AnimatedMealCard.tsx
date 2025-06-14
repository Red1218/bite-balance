
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

interface AnimatedMealCardProps {
  meal: MealItem;
  index: number;
  onEditMeal: (meal: any) => void;
  onDeleteMeal: (mealId: string, mealName: string) => void;
}

const AnimatedMealCard = ({ 
  meal, 
  index, 
  onEditMeal, 
  onDeleteMeal 
}: AnimatedMealCardProps) => {
  const mealTimeEmoji = {
    breakfast: '🌅',
    lunch: '🌞', 
    dinner: '🌙',
    snack: '🍎'
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 0.3 + index * 0.1 }
    },
    hover: { 
      scale: 1.1,
      boxShadow: "0 0 20px rgba(255, 77, 77, 0.5)"
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      className="relative group"
    >
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl">
        {/* Header with meal name and action buttons */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {mealTimeEmoji[meal.meal_time as keyof typeof mealTimeEmoji] || '🍽️'}
            </span>
            <h3 className="font-semibold text-white text-sm sm:text-base truncate">
              {meal.name}
            </h3>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditMeal(meal)}
                className="w-8 h-8 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30"
              >
                <Edit className="w-3 h-3" />
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteMeal(meal.id, meal.name)}
                className="w-8 h-8 p-0 text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/20 border border-[#ff4d4d]/30"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Time indicator */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <Clock className="w-3 h-3" />
          <span>
            {new Date(meal.logged_at).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          <span className="capitalize ml-2 text-[#ff4d4d]">
            {meal.meal_time}
          </span>
        </div>

        {/* Nutrition grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            className="bg-[#ff4d4d]/10 rounded-lg p-3 border border-[#ff4d4d]/20"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-lg font-bold text-[#ff4d4d]">
              {meal.calories}
            </div>
            <div className="text-xs text-gray-400">kcal</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/5 rounded-lg p-3 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-lg font-bold text-white">
              {Math.round(meal.protein || 0)}g
            </div>
            <div className="text-xs text-gray-400">protein</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/5 rounded-lg p-3 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-lg font-bold text-white">
              {Math.round(meal.carbs || 0)}g
            </div>
            <div className="text-xs text-gray-400">carbs</div>
          </motion.div>
          
          <motion.div 
            className="bg-white/5 rounded-lg p-3 border border-white/10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-lg font-bold text-white">
              {Math.round(meal.fat || 0)}g
            </div>
            <div className="text-xs text-gray-400">fats</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedMealCard;
