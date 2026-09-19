import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  passesCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onSelectTab,
  passesCount = 0
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e10]/95 backdrop-blur-xl border-t border-[#2a2a2c]/80 shadow-[0_-8px_24px_rgba(0,0,0,0.7)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-around">
        {/* Home */}
        <button
          id="nav-tab-home"
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-1 transition-colors ${
            activeTab === 'home'
              ? 'text-[#f2ca50] font-semibold'
              : 'text-[#d0c5af] hover:text-[#e5e1e4]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">home</span>
          <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
            Home
          </span>
        </button>

        {/* Services */}
        <button
          id="nav-tab-services"
          type="button"
          onClick={() => onSelectTab('services')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-1 transition-colors ${
            activeTab === 'services'
              ? 'text-[#f2ca50] font-semibold'
              : 'text-[#d0c5af] hover:text-[#e5e1e4]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">content_cut</span>
          <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
            Services
          </span>
        </button>

        {/* Floating Book Button */}
        <button
          id="nav-tab-book"
          type="button"
          onClick={() => onSelectTab('book')}
          className="flex flex-col items-center justify-center -translate-y-3 relative group focus:outline-none"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-95 transition-transform ${
              activeTab === 'book'
                ? 'bg-gradient-to-tr from-[#d4af37] via-[#f2ca50] to-[#fcb976] text-[#3c2f00] ring-2 ring-[#f2ca50]'
                : 'bg-gradient-to-tr from-[#d4af37] via-[#f2ca50] to-[#fcb976] text-[#3c2f00]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">calendar_today</span>
          </div>
          <span
            className={`text-[10px] uppercase tracking-wider mt-1 font-sans ${
              activeTab === 'book' ? 'text-[#f2ca50] font-bold' : 'text-[#f2ca50]'
            }`}
          >
            Book
          </span>
        </button>

        {/* Passes / Wallet */}
        <button
          id="nav-tab-passes"
          type="button"
          onClick={() => onSelectTab('passes')}
          className={`relative flex flex-col items-center justify-center w-16 h-12 gap-1 transition-colors ${
            activeTab === 'passes'
              ? 'text-[#f2ca50] font-semibold'
              : 'text-[#d0c5af] hover:text-[#e5e1e4]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">event_available</span>
          <span className="text-[10px] font-bold uppercase tracking-wider font-sans">
            Passes
          </span>
          {passesCount > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[9px] font-bold flex items-center justify-center">
              {passesCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};
