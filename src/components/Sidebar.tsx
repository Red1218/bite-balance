
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
  Heart,
  Menu,
  X,
  Activity
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
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

  const handleStepsClick = () => {
    // Scroll to steps section if on dashboard
    if (location.pathname === "/") {
      const stepsSection = document.getElementById('steps-section');
      if (stepsSection) {
        stepsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-white shadow-md hover:bg-gray-50"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300 ease-in-out",
        isOpen 
          ? "w-64 translate-x-0" 
          : "w-16 -translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          
          {/* Logo Section */}
          <div className={cn(
            "p-6 border-b border-gray-200 transition-all duration-300",
            !isOpen && "md:p-4"
          )}>
            {isOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">BiteBalance</h1>
                  <p className="text-xs text-gray-500">Fuel Better, Live Better</p>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
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
                    onClick={() => {
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 768) {
                        onToggle();
                      }
                    }}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? "bg-red-50 text-red-600 border-l-4 border-red-500 shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      !isOpen && "md:justify-center md:space-x-0"
                    )}
                    title={!isOpen ? item.label : undefined}
                  >
                    <Icon className={cn(
                      "w-5 h-5 flex-shrink-0", 
                      isActive ? "text-red-500" : "text-gray-400"
                    )} />
                    {isOpen && <span>{item.label}</span>}
                    
                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
              
              {/* Steps Section Link */}
              <button
                onClick={handleStepsClick}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                  !isOpen && "md:justify-center md:space-x-0"
                )}
                title={!isOpen ? "Steps" : undefined}
              >
                <Activity className="w-5 h-5 flex-shrink-0 text-gray-400" />
                {isOpen && <span>Steps</span>}
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    Steps
                  </div>
                )}
              </button>
            </div>
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 group relative",
                !isOpen && "md:justify-center"
              )}
              title={!isOpen ? "Sign Out" : undefined}
            >
              <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
              {isOpen && "Sign Out"}
              
              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Sign Out
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
