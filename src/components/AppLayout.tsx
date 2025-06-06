
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pt-16 md:pt-8 px-4 md:px-8 pb-8 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
