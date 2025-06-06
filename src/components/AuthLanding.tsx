
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Heart } from 'lucide-react';

const motivationalQuotes = [
  "Every bite counts.",
  "You don't have to be extreme, just consistent.",
  "Eat to fuel your body, not your emotions.",
  "Progress, not perfection.",
  "Small changes, big results.",
  "Your body is your temple, treat it well.",
  "Healthy eating is a form of self-respect."
];

const AuthLanding = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    weight: '',
    height: ''
  });

  // Rotate quotes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const userData = {
          name: formData.name,
          age: parseInt(formData.age) || null,
          weight: parseFloat(formData.weight) || null,
          height: parseFloat(formData.height) || null
        };

        const { error } = await signUp(formData.email, formData.password, userData);
        
        if (error) {
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome to CalTracker!",
            description: "Your account has been created successfully.",
          });
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            title: "Sign In Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You've been signed in successfully.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Branding and Quote */}
        <div className="text-center md:text-left space-y-6">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CalTracker</h1>
              <p className="text-gray-600">Track. Eat. Repeat.</p>
            </div>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-red-100">
            <div className="h-16 flex items-center justify-center">
              <p className="text-lg font-medium text-gray-700 text-center transition-all duration-500 transform">
                "{motivationalQuotes[currentQuote]}"
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-red-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <p className="text-center text-gray-600">
              {isSignUp ? 'Start your healthy journey today' : 'Sign in to continue tracking'}
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="70"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    minLength={6}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-500 hover:bg-red-600"
                disabled={loading}
              >
                {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLanding;
