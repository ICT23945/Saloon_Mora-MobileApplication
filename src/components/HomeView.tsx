import React from 'react';
import { BARBERS, BRAND_LOGO } from '../data/groomingData';
import { Barber, Service } from '../types';

interface HomeViewProps {
  onExploreMenu: () => void;
  onQuickBookBarber: (barber: Barber) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onExploreMenu,
  onQuickBookBarber
}) => {
  return (
    <div className="flex flex-col w-full text-[#e5e1e4] px-4 space-y-5 pb-28 pt-2">
      {/* Atelier Sanctuary Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1b1b1d] border border-[#2a2a2c] p-5 shadow-xl">
        <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#f2ca50]/15 blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src={BRAND_LOGO} alt="MORA Logo" className="h-6 w-auto" />
            <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
              Downtown Flagship Sanctuary
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-[#fcb976] font-semibold uppercase bg-[#6c3e04]/40 px-2 py-0.5 rounded border border-[#fcb976]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#fcb976] animate-pulse"></span>
            Open Now
          </span>
        </div>

        <h1 className="font-serif text-[28px] font-semibold text-[#e5e1e4] tracking-tight leading-tight">
          Where Architectural Precision Meets Ritual Wellness
        </h1>
        <p className="text-[13px] text-[#d0c5af] mt-2 leading-relaxed font-sans">
          MORA is an exclusive sanctuary crafted for discerning gentlemen. Experience single-malt hospitality, Japanese steel straight razor craftsmanship, and bespoke facial architecture.
        </p>

        <div className="mt-5 flex gap-2.5">
          <button
            onClick={onExploreMenu}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#fcb976] text-[#3c2f00] text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform font-sans"
          >
            <span className="material-symbols-outlined text-[18px]">content_cut</span>
            <span>View Services Menu</span>
          </button>
        </div>
      </div>

      {/* Flagship Privileges Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[18px] font-semibold text-[#e5e1e4]">
            Sanctuary Privileges
          </h2>
          <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
            Included in All Sessions
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#fcb976] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">local_bar</span>
            </div>
            <span className="font-serif text-[14px] font-semibold text-[#e5e1e4]">
              Speakeasy Bar
            </span>
            <p className="text-[11px] text-[#d0c5af] leading-tight font-sans">
              12-year single malt, Kyoto cold brew, and Pellegrino.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#f2ca50] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">hot_tub</span>
            </div>
            <span className="font-serif text-[14px] font-semibold text-[#e5e1e4]">
              Hot Towel Rituals
            </span>
            <p className="text-[11px] text-[#d0c5af] leading-tight font-sans">
              Cedarwood & eucalyptus infusions with marble stone press.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#f2ca50] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">airline_seat_recline_extra</span>
            </div>
            <span className="font-serif text-[14px] font-semibold text-[#e5e1e4]">
              Custom Leather Chairs
            </span>
            <p className="text-[11px] text-[#d0c5af] leading-tight font-sans">
              Ergonomic Japanese Takara Belmont hydraulic recliners.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] flex flex-col gap-1.5">
            <div className="w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#fcb976] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </div>
            <span className="font-serif text-[14px] font-semibold text-[#e5e1e4]">
              Quiet Chair Option
            </span>
            <p className="text-[11px] text-[#d0c5af] leading-tight font-sans">
              Silent appointments tailored for deep focus and tranquility.
            </p>
          </div>
        </div>
      </section>

      {/* Master Artisans Spotlight */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[18px] font-semibold text-[#e5e1e4]">
            Master Artisans on Duty
          </h2>
          <span className="text-[10px] font-bold text-[#d0c5af] uppercase tracking-wider font-sans">
            Flagship Crew
          </span>
        </div>

        <div className="space-y-2.5">
          {BARBERS.filter(b => !b.isAny).map((barber) => (
            <div
              key={barber.id}
              className="p-3 rounded-xl bg-[#1b1b1d] border border-[#2a2a2c] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={barber.avatar}
                  alt={barber.name}
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-[#f2ca50]/50"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#e5e1e4] font-sans">
                      {barber.name}
                    </span>
                    <span className="bg-[#f2ca50]/20 text-[#f2ca50] text-[9px] font-bold px-1.5 py-0.2 rounded tracking-wide">
                      {barber.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#99907c] mt-0.5 font-sans">
                    <span className="material-symbols-outlined text-[13px] text-[#f2ca50]">star</span>
                    <span className="text-[#e5e1e4] font-semibold">{barber.rating}</span>
                    <span>({barber.reviewCount} client reviews)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onQuickBookBarber(barber)}
                className="px-3 py-1.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider border border-[#353437] transition-all font-sans"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship Location & Hours */}
      <section className="p-4 rounded-xl bg-[#201f21] border border-[#2a2a2c] space-y-2">
        <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
          Downtown Flagship Location
        </span>
        <div className="flex justify-between items-start text-[13px]">
          <div>
            <p className="font-semibold text-[#e5e1e4]">480 Grand Avenue, Suite 100</p>
            <p className="text-[12px] text-[#99907c]">Valet parking available at private salon court</p>
          </div>
          <span className="text-[11px] text-[#fcb976] font-semibold">
            Mon-Sat 9AM-8PM
          </span>
        </div>
      </section>
    </div>
  );
};
