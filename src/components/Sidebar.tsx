
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { SidebarProps } from '@/types/sidebar';
import SidebarLogo from './sidebar/SidebarLogo';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarSignOut from './sidebar/SidebarSignOut';

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 glass-card hover:bg-card/70 border-white/10"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full glass-card border-r border-white/10 z-50 transition-all duration-300 ease-in-out",
        isOpen 
          ? "w-64 translate-x-0" 
          : "w-16 -translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          <SidebarLogo isOpen={isOpen} />
          <SidebarNavigation isOpen={isOpen} onToggle={onToggle} />
          <SidebarSignOut isOpen={isOpen} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
