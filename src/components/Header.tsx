import React from 'react';
import { BRAND_LOGO, USER_AVATAR } from '../data/groomingData';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  onOpenProfile: () => void;
  onBack?: () => void;
  isBookingFlow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenProfile,
  onBack,
  isBookingFlow
}) => {
  if (isBookingFlow) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131315]/90 backdrop-blur-xl border-b border-[#2a2a2c]/60 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)]">
        <div className="max-w-md mx-auto h-20 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="back-to-menu-btn"
              aria-label="Go back"
              onClick={onBack || (() => onNavigate('services'))}
              className="w-10 h-10 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] flex items-center justify-center text-[#e5e1e4] hover:text-[#f2ca50] transition-colors active:scale-95 border border-[#353437]/50"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2.5">
              <img
                alt="Saloon MORA Brand Logo"
                className="h-7 w-auto object-contain cursor-pointer"
                src={BRAND_LOGO}
                onClick={() => onNavigate('services')}
              />
              <div className="flex flex-col">
                <h1 className="font-serif text-[18px] font-semibold text-[#e5e1e4] tracking-tight leading-tight line-clamp-1">
                  Book Appointment
                </h1>
                <span className="text-[10px] font-bold text-[#d0c5af] uppercase tracking-widest font-sans">
                  Downtown Flagship
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-[#f2ca50] uppercase hidden sm:inline tracking-widest font-sans">
              VIP Concierge
            </span>
            <button
              id="vip-avatar-booking-btn"
              onClick={onOpenProfile}
              className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f2ca50] to-[#fcb976] active:scale-95 transition-transform"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#131315]"
                src={USER_AVATAR}
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#131315]/85 backdrop-blur-xl border-b border-[#2a2a2c]/60 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)]">
      <div className="max-w-md mx-auto h-20 px-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <img
            alt="Saloon MORA Brand Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            src={BRAND_LOGO}
            onClick={() => onNavigate('services')}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-[19px] font-semibold text-[#e5e1e4] tracking-tight leading-none">
                MORA
              </span>
              <span className="px-1.5 py-0.5 rounded-[2px] bg-[#d4af37]/20 text-[#f2ca50] text-[10px] font-bold uppercase tracking-widest leading-none font-sans">
                Atelier
              </span>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
              <span className="text-[10px] font-medium text-[#d0c5af] truncate uppercase tracking-wider font-sans">
                Downtown Flagship • Open
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:flex flex-col">
            <span className="text-[10px] font-bold text-[#f2ca50] tracking-widest uppercase font-sans">
              VIP Member
            </span>
            <span className="text-[11px] text-[#d0c5af] font-sans">
              {activeTab === 'services' ? 'Services' : activeTab === 'book' ? 'Booking' : activeTab === 'passes' ? 'Digital Wallet' : 'Lounge'}
            </span>
          </div>
          <button
            id="vip-profile-btn"
            onClick={onOpenProfile}
            className="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f2ca50] to-[#fcb976] hover:brightness-110 active:scale-95 transition-all"
            title="View Member Lounge Profile"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={USER_AVATAR}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#d4af37] flex items-center justify-center ring-1 ring-[#131315]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0e0e10]"></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
