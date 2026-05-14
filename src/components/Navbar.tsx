import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tighter flex items-center">
          <span className="text-white">MEDIA</span>
          <span className="text-primary">PLATE</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-10">
          <NavLink to="/">홈</NavLink>
          <NavLink to="/#services">서비스</NavLink>
          <NavLink to="/portfolio">포트폴리오</NavLink>
          <NavLink to="/#process">제작 프로세스</NavLink>
          <NavLink to="/contact">문의하기</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            to="/contact" 
            className="hidden sm:block bg-primary text-black px-6 py-2 rounded-sm font-bold hover:bg-primary/90 transition-colors text-sm"
          >
            견적 문의하기
          </Link>
          <Link to="/login" className="text-xs text-muted-foreground hover:text-white transition-colors">
            ADMIN
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link 
      to={to} 
      className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors tracking-wide"
    >
      {children}
    </Link>
  );
}
