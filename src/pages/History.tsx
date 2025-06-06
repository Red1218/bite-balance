
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const History = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock history data
  const historyData = [
    {
      date: "2024-06-06",
      totalCalories: 1850,
      goal: 2200,
      meals: [
        { name: "Oatmeal with Berries", calories: 350, time: "Breakfast" },
        { name: "Chicken Caesar Salad", calories: 480, time: "Lunch" },
        { name: "Apple with Peanut Butter", calories: 220, time: "Snack" },
        { name: "Grilled Salmon with Vegetables", calories: 800, time: "Dinner" }
      ],
      reflection: "Felt good energy throughout the day. Could use more protein at breakfast."
    },
    {
      date: "2024-06-05",
      totalCalories: 2100,
      goal: 2200,
      meals: [
        { name: "Protein Smoothie", calories: 280, time: "Breakfast" },
        { name: "Turkey Sandwich", calories: 420, time: "Lunch" },
        { name: "Greek Yogurt", calories: 150, time: "Snack" },
        { name: "Pasta with Meat Sauce", calories: 750, time: "Dinner" },
        { name: "Dark Chocolate", calories: 500, time: "Dessert" }
      ],
      reflection: "Hit my calorie goal perfectly. The chocolate was a nice treat!"
    },
    {
      date: "2024-06-04",
      totalCalories: 1950,
      goal: 2200,
      meals: [
        { name: "Scrambled Eggs with Toast", calories: 400, time: "Breakfast" },
        { name: "Quinoa Buddha Bowl", calories: 550, time: "Lunch" },
        { name: "Protein Bar", calories: 200, time: "Snack" },
        { name: "Chicken Stir Fry", calories: 800, time: "Dinner" }
      ],
      reflection: "Good variety of foods. Need to add more snacks to reach calorie goal."
    }
  ];

  const selectedDayData = historyData.find(day => day.date === selectedDate);

  const getProgressColor = (consumed: number, goal: number) => {
    const percentage = (consumed / goal) * 100;
    if (percentage < 70) return "text-green-600";
    if (percentage < 90) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">History</h1>
      </div>

      {/* Date Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            max={new Date().toISOString().split('T')[0]}
          />
        </CardContent>
      </Card>

      {/* Daily Summary */}
      {selectedDayData ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Daily Summary - {new Date(selectedDayData.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getProgressColor(selectedDayData.totalCalories, selectedDayData.goal)}`}>
                    {selectedDayData.totalCalories}
                  </div>
                  <p className="text-gray-600">Calories Consumed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-700">{selectedDayData.goal}</div>
                  <p className="text-gray-600">Daily Goal</p>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getProgressColor(selectedDayData.totalCalories, selectedDayData.goal)}`}>
                    {Math.round((selectedDayData.totalCalories / selectedDayData.goal) * 100)}%
                  </div>
                  <p className="text-gray-600">Goal Achievement</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meals */}
          <Card>
            <CardHeader>
              <CardTitle>Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDayData.meals.map((meal, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{meal.name}</h3>
                      <p className="text-sm text-gray-600">{meal.time}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-red-600">{meal.calories}</span>
                      <p className="text-sm text-gray-600">calories</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Reflection */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Reflection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 italic">"{selectedDayData.reflection}"</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600">No data available for this date.</p>
            <p className="text-sm text-gray-500 mt-2">Start logging meals to see your history!</p>
          </CardContent>
        </Card>
      )}

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Week Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyData.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <p className="text-sm text-gray-600">{day.meals.length} meals logged</p>
                </div>
                <div className="text-right">
                  <span className={`font-bold ${getProgressColor(day.totalCalories, day.goal)}`}>
                    {day.totalCalories} / {day.goal}
                  </span>
                  <p className="text-sm text-gray-600">
                    {Math.round((day.totalCalories / day.goal) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
