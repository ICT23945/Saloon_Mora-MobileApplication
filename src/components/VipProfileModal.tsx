import React from 'react';
import { USER_AVATAR } from '../data/groomingData';

interface VipProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipProfileModal: React.FC<VipProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-sm bg-[#1b1b1d] rounded-2xl border border-[#353437] shadow-2xl overflow-hidden flex flex-col">
        {/* Header with Gold Accents */}
        <div className="relative p-5 bg-[#201f21] border-b border-[#2a2a2c] flex flex-col items-center text-center">
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f2ca50] to-[#fcb976] mb-3">
            <img
              src={USER_AVATAR}
              alt="VIP Profile"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-[#131315]"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#f2ca50] flex items-center justify-center ring-2 ring-[#131315]">
              <span className="material-symbols-outlined text-[10px] text-[#3c2f00] font-bold">star</span>
            </span>
          </div>

          <h3 className="font-serif text-[18px] font-semibold text-[#e5e1e4]">
            Charitha Wijayakoon
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="px-2 py-0.5 rounded-[2px] bg-[#d4af37]/20 text-[#f2ca50] text-[10px] font-bold uppercase tracking-widest font-sans">
              Black Label VIP
            </span>
            <span className="text-[11px] text-[#99907c]">• Member #8924</span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#99907c] hover:text-[#e5e1e4] p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Benefits List */}
        <div className="p-5 space-y-3.5 text-[13px] font-sans">
          <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest block">
            Atelier Privileges
          </span>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#fcb976] text-[20px] shrink-0 mt-0.5">
              local_bar
            </span>
            <div>
              <p className="font-semibold text-[#e5e1e4]">Unlimited Speakeasy Bar</p>
              <p className="text-[12px] text-[#d0c5af]">Complimentary 12-year single malt scotch & nitro cold brew.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px] shrink-0 mt-0.5">
              bolt
            </span>
            <div>
              <p className="font-semibold text-[#e5e1e4]">Priority Fast-Track Booking</p>
              <p className="text-[12px] text-[#d0c5af]">Hold guaranteed same-day appointments with Director Marcus.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px] shrink-0 mt-0.5">
              clean_hands
            </span>
            <div>
              <p className="font-semibold text-[#e5e1e4]">Mid-Cycle Cleanups</p>
              <p className="text-[12px] text-[#d0c5af]">Complimentary hot towel neck shave between haircut appointments.</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-[#201f21] border-t border-[#2a2a2c]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#2a2a2c] hover:bg-[#353437] text-[#e5e1e4] text-[12px] font-bold uppercase tracking-wider font-sans transition-colors"
          >
            Return to Atelier
          </button>
        </div>
      </div>
    </div>
  );
};
