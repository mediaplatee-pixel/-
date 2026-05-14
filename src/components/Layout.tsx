import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0" />
      <div className="fixed top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-sphere pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[800px] h-[800px] glow-sphere opacity-50 pointer-events-none z-0" />

      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
