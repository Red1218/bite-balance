
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Plus, 
  BookOpen, 
  History, 
  Settings, 
  User, 
  LogOut,
  Heart 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/add-meal", icon: Plus, label: "Add Meal" },
    { path: "/saved-meals", icon: BookOpen, label: "Saved Meals" },
    { path: "/history", icon: History, label: "History" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50">
      <div className="flex flex-col h-full">
        
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CalTracker</h1>
              <p className="text-xs text-gray-500">Track. Eat. Repeat.</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-red-50 text-red-600 border-l-4 border-red-500 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-red-500" : "text-gray-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sign Out Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
