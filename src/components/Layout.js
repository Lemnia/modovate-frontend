import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24 md:pt-32 px-4 sm:px-6 lg:px-14">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-40 pointer-events-none select-none z-[999]">
        modovatestudio.com
      </div>
    </div>
  );
};

export default Layout;
