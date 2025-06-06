import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calculator, Save, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: "active",
    gender: "male",
    goal: "maintain"
  });

  const [calculatedGoal, setCalculatedGoal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setProfile({
          name: data.name || "",
          age: data.age?.toString() || "",
          weight: data.weight?.toString() || "",
          height: data.height?.toString() || "",
          activityLevel: "active",
          gender: "male",
          goal: "maintain"
        });
      }
    };

    loadProfile();
  }, [user]);

  const calculateCalorieGoal = () => {
    const weight = parseFloat(profile.weight);
    const height = parseFloat(profile.height);
    const age = parseInt(profile.age);

    if (!weight || !height || !age) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive"
      });
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (profile.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      active: 1.55,
      very_active: 1.725
    };

    const tdee = bmr * activityMultipliers[profile.activityLevel as keyof typeof activityMultipliers];

    // Goal adjustments
    let goalCalories = tdee;
    switch (profile.goal) {
      case "lose":
        goalCalories = tdee - 500;
        break;
      case "gain":
        goalCalories = tdee + 500;
        break;
      default:
        goalCalories = tdee;
    }

    setCalculatedGoal(Math.round(goalCalories));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          age: parseInt(profile.age) || null,
          weight: parseFloat(profile.weight) || null,
          height: parseFloat(profile.height) || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated!",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
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
        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                placeholder="Years"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={profile.weight}
                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                placeholder="Kilograms"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={profile.height}
                onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                placeholder="Centimeters"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={profile.gender} 
                onValueChange={(value) => setProfile({ ...profile, gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select 
                value={profile.activityLevel} 
                onValueChange={(value) => setProfile({ ...profile, activityLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="active">Active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select 
              value={profile.goal} 
              onValueChange={(value) => setProfile({ ...profile, goal: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calorie Goal Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Calorie Goal Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Calculate your daily calorie goal based on your personal information and activity level.
          </p>
          
          <Button 
            onClick={calculateCalorieGoal}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Calorie Goal
          </Button>

          {calculatedGoal && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Recommended Daily Calorie Goal</h3>
              <div className="text-3xl font-bold text-red-600 mb-2">{calculatedGoal} calories</div>
              <p className="text-sm text-red-700">
                This is based on your current profile settings and {profile.goal} goal.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Health Metrics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Health Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {profile.weight ? parseFloat(profile.weight).toFixed(1) : "--"}
              </div>
              <p className="text-sm text-gray-600">Weight (kg)</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">
                {profile.height ? parseFloat(profile.height).toFixed(0) : "--"}
              </div>
              <p className="text-sm text-gray-600">Height (cm)</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {profile.weight && profile.height 
                  ? (parseFloat(profile.weight) / Math.pow(parseFloat(profile.height) / 100, 2)).toFixed(1)
                  : "--"
                }
              </div>
              <p className="text-sm text-gray-600">BMI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          className="bg-red-500 hover:bg-red-600 text-white"
          disabled={loading}
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
