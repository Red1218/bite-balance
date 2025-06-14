import { useState } from "react";
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
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-medium text-foreground">⚙️ Settings</h1>
        </div>

        {/* Daily Goal */}
        <div className="glass-card p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Daily Calorie Goal</h3>
          <div className="space-y-3">
            <Label htmlFor="calorieGoal" className="text-foreground text-sm">Target Calories per Day</Label>
            <Input
              id="calorieGoal"
              type="number"
              value={settings.dailyCalorieGoal}
              onChange={(e) => setSettings({ ...settings, dailyCalorieGoal: e.target.value })}
              placeholder="2200"
              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12 backdrop-blur-sm"
            />
            <p className="text-xs text-muted-foreground">
              This goal will be used to track your daily progress. You can also set this automatically in your Profile.
            </p>
          </div>
        </div>

        {/* Meal Tags */}
        <div className="glass-card p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Default Meal Tags</h3>
          <div className="space-y-3">
            <Label htmlFor="mealTags" className="text-foreground text-sm">Common Tags (comma-separated)</Label>
            <Input
              id="mealTags"
              value={settings.defaultMealTags}
              onChange={(e) => setSettings({ ...settings, defaultMealTags: e.target.value })}
              placeholder="Healthy, Quick, Protein, Carb, Fiber"
              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12 backdrop-blur-sm"
            />
            <p className="text-xs text-muted-foreground">
              These tags will be available as quick options when adding meals.
            </p>
          </div>
        </div>

        {/* Reminders */}
        <div className="glass-card p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Meal Reminders</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reminders" className="text-foreground text-sm">Enable Meal Reminders</Label>
                <p className="text-xs text-muted-foreground">Get notified to log your meals</p>
              </div>
              <Switch
                id="reminders"
                checked={settings.remindersEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, remindersEnabled: checked })}
              />
            </div>

            {settings.remindersEnabled && (
              <div className="space-y-4 border-t border-border pt-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="breakfastTime" className="text-foreground text-sm">Breakfast</Label>
                    <Input
                      id="breakfastTime"
                      type="time"
                      value={settings.reminderTimes.breakfast}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        reminderTimes: { ...settings.reminderTimes, breakfast: e.target.value }
                      })}
                      className="bg-background/50 border-border text-foreground rounded-xl h-12 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lunchTime" className="text-foreground text-sm">Lunch</Label>
                    <Input
                      id="lunchTime"
                      type="time"
                      value={settings.reminderTimes.lunch}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        reminderTimes: { ...settings.reminderTimes, lunch: e.target.value }
                      })}
                      className="bg-background/50 border-border text-foreground rounded-xl h-12 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dinnerTime" className="text-foreground text-sm">Dinner</Label>
                    <Input
                      id="dinnerTime"
                      type="time"
                      value={settings.reminderTimes.dinner}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        reminderTimes: { ...settings.reminderTimes, dinner: e.target.value }
                      })}
                      className="bg-background/50 border-border text-foreground rounded-xl h-12 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Theme */}
        <div className="glass-card p-4">
          <h3 className="text-base font-medium text-foreground mb-4">App Theme</h3>
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-foreground text-sm">Color Theme</Label>
            <Select 
              value={settings.theme} 
              onValueChange={(value) => setSettings({ ...settings, theme: value })}
            >
              <SelectTrigger className="bg-background/50 border-border text-foreground rounded-xl h-12 backdrop-blur-sm [&>svg]:text-muted-foreground">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border backdrop-blur-xl">
                <SelectItem value="light" className="text-foreground hover:bg-accent focus:bg-accent">Light</SelectItem>
                <SelectItem value="dark" className="text-foreground hover:bg-accent focus:bg-accent">Dark</SelectItem>
                <SelectItem value="red" className="text-foreground hover:bg-accent focus:bg-accent">Red Accent (Current)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button onClick={handleSave} className="w-full primary-button h-12">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
