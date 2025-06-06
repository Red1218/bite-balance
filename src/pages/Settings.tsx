
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    dailyCalorieGoal: "2200",
    defaultMealTags: "Healthy, Quick, Protein",
    remindersEnabled: true,
    reminderTimes: {
      breakfast: "08:00",
      lunch: "12:00",
      dinner: "19:00"
    },
    theme: "light"
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    toast({
      title: "Settings Saved!",
      description: "Your preferences have been updated successfully.",
    });
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
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Daily Goal */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Calorie Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calorieGoal">Target Calories per Day</Label>
            <Input
              id="calorieGoal"
              type="number"
              value={settings.dailyCalorieGoal}
              onChange={(e) => setSettings({ ...settings, dailyCalorieGoal: e.target.value })}
              placeholder="2200"
            />
            <p className="text-sm text-gray-600">
              This goal will be used to track your daily progress. You can also set this automatically in your Profile.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meal Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Default Meal Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealTags">Common Tags (comma-separated)</Label>
            <Input
              id="mealTags"
              value={settings.defaultMealTags}
              onChange={(e) => setSettings({ ...settings, defaultMealTags: e.target.value })}
              placeholder="Healthy, Quick, Protein, Carb, Fiber"
            />
            <p className="text-sm text-gray-600">
              These tags will be available as quick options when adding meals.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Meal Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminders">Enable Meal Reminders</Label>
              <p className="text-sm text-gray-600">Get notified to log your meals</p>
            </div>
            <Switch
              id="reminders"
              checked={settings.remindersEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, remindersEnabled: checked })}
            />
          </div>

          {settings.remindersEnabled && (
            <div className="space-y-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="breakfastTime">Breakfast</Label>
                  <Input
                    id="breakfastTime"
                    type="time"
                    value={settings.reminderTimes.breakfast}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      reminderTimes: { ...settings.reminderTimes, breakfast: e.target.value }
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lunchTime">Lunch</Label>
                  <Input
                    id="lunchTime"
                    type="time"
                    value={settings.reminderTimes.lunch}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      reminderTimes: { ...settings.reminderTimes, lunch: e.target.value }
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dinnerTime">Dinner</Label>
                  <Input
                    id="dinnerTime"
                    type="time"
                    value={settings.reminderTimes.dinner}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      reminderTimes: { ...settings.reminderTimes, dinner: e.target.value }
                    })}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle>App Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="theme">Color Theme</Label>
            <Select 
              value={settings.theme} 
              onValueChange={(value) => setSettings({ ...settings, theme: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="red">Red Accent (Current)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
