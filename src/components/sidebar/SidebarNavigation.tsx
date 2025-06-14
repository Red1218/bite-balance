
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/sidebar';
import { 
  Home, 
  Plus, 
  BookOpen, 
  History, 
  Settings, 
  User,
  Footprints
} from 'lucide-react';

interface SidebarNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarNavigation = ({ isOpen, onToggle }: SidebarNavigationProps) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/add-meal", icon: Plus, label: "Add Meal" },
    { path: "/saved-meals", icon: BookOpen, label: "Saved Meals" },
    { path: "/history", icon: History, label: "History" },
    { path: "/steps", icon: Footprints, label: "Steps" },
    { path: "/settings", icon: Settings, label: "Settings" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <nav className="flex-1 px-2 py-6">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative glass-card",
                isActive
                  ? "border-l-4 border-accent/80 bg-white/10 shadow-md text-accent"
                  : "text-white hover:bg-white/10 hover:text-accent/80",
                !isOpen && "md:justify-center md:space-x-0"
              )}
              title={!isOpen ? item.label : undefined}
              style={{ boxShadow: isActive ? '0 0 10px #ff4d4d88' : undefined }}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 glow-icon",
                isActive ? "text-accent" : "text-gray-200"
              )} />
              {isOpen && <span className="font-semibold tracking-wide">{item.label}</span>}
              {!isOpen && (
                <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNavigation;
