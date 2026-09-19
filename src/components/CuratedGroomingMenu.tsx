import React, { useState, useMemo } from 'react';
import { Service, AddOn } from '../types';
import { SERVICES, ADD_ONS } from '../data/groomingData';

interface CuratedGroomingMenuProps {
  selectedService: Service;
  selectedAddOns: AddOn[];
  onSelectService: (service: Service) => void;
  onToggleAddOn: (addon: AddOn) => void;
  onProceedToBooking: () => void;
}

export const CuratedGroomingMenu: React.FC<CuratedGroomingMenuProps> = ({
  selectedService,
  selectedAddOns,
  onSelectService,
  onToggleAddOn,
  onProceedToBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDuration, setMaxDuration] = useState<'all' | '30' | '45' | '60'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'haircut' | 'shave' | 'facial' | 'combo'>('all');

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Category filter
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }
      // Duration filter
      if (maxDuration === '30' && service.duration > 30) return false;
      if (maxDuration === '45' && service.duration > 45) return false;
      if (maxDuration === '60' && service.duration < 60) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(q);
        const matchesDesc = service.description.toLowerCase().includes(q);
        const matchesTags = service.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTags) return false;
      }
      return true;
    });
  }, [selectedCategory, maxDuration, searchQuery]);

  const addOnTotal = useMemo(() => {
    return selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedAddOns]);

  const estimatedTotal = selectedService.price + addOnTotal;

  return (
    <div className="flex flex-col w-full text-[#e5e1e4] px-4 space-y-5 pb-28 pt-2">
      {/* Subtle Ambient Glow Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#1b1b1d] p-4 shadow-md border border-[#2a2a2c]/60">
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#f2ca50]/10 blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#d4af37]/15 text-[#f2ca50] text-[10px] font-bold uppercase tracking-widest font-sans">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            <span>Artisanal Services</span>
          </div>
          <span className="text-[10px] font-semibold text-[#d0c5af] uppercase tracking-widest font-sans">
            Spring 2025 Edition
          </span>
        </div>

        <h1 className="font-serif text-[26px] sm:text-[30px] font-semibold text-[#e5e1e4] tracking-tight leading-snug">
          Curated Grooming Menu
        </h1>
        <p className="text-[13px] text-[#d0c5af] mt-1 leading-relaxed font-sans">
          Precision craftsmanship balanced with sensorial wellness. Every ritual is bespoke to your facial architecture and lifestyle.
        </p>

        {/* Search & Duration Quick Filter */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#99907c] text-[19px] pointer-events-none">
              search
            </span>
            <input
              id="serviceSearch"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatment, cut, or package..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#353437]/70 text-[#e5e1e4] placeholder:text-[#99907c] text-[13px] font-sans focus:outline-none focus:bg-[#39393b] focus:ring-1 focus:ring-[#f2ca50]/40 transition-all border border-[#4d4635]/40"
            />
            {searchQuery && (
              <button
                id="clearSearch"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#99907c] hover:text-[#f2ca50] transition-colors"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            <span className="text-[10px] font-bold text-[#99907c] uppercase tracking-wider shrink-0 flex items-center gap-1 font-sans mr-1">
              <span className="material-symbols-outlined text-[14px]">timer</span> Max:
            </span>
            {(['all', '30', '45', '60'] as const).map((durationKey) => {
              const isActive = maxDuration === durationKey;
              const label = durationKey === 'all' ? 'All' : durationKey === '60' ? '60m+' : `${durationKey}m`;
              return (
                <button
                  key={durationKey}
                  onClick={() => setMaxDuration(durationKey)}
                  className={`px-3 py-1 rounded-[4px] text-[11px] font-semibold tracking-wide uppercase transition-all font-sans shrink-0 ${
                    isActive
                      ? 'bg-[#2a2a2c] text-[#f2ca50] ring-1 ring-[#f2ca50]/40'
                      : 'bg-[#201f21] text-[#d0c5af] hover:text-[#f2ca50]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
        {[
          { key: 'all', label: 'All (5)' },
          { key: 'haircut', label: 'Haircuts' },
          { key: 'shave', label: 'Beard & Shave' },
          { key: 'facial', label: 'Facial & Spa' },
          { key: 'combo', label: 'Combos' }
        ].map((tab) => {
          const isActive = selectedCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wider uppercase transition-all shrink-0 font-sans shadow-sm ${
                isActive
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-semibold'
                  : 'bg-[#201f21] text-[#d0c5af] hover:text-[#e5e1e4] hover:bg-[#2a2a2c]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Service List items */}
      <div className="flex flex-col space-y-4" id="servicesContainer">
        {filteredServices.length === 0 ? (
          <div className="text-center py-10 bg-[#1b1b1d] rounded-xl p-6 border border-[#2a2a2c]">
            <span className="material-symbols-outlined text-[32px] text-[#99907c] mb-2">content_cut</span>
            <p className="text-[14px] text-[#e5e1e4] font-medium">No treatments matching criteria</p>
            <p className="text-[12px] text-[#99907c] mt-1">Try resetting the duration or search filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setMaxDuration('all');
                setSelectedCategory('all');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#201f21] text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredServices.map((service) => {
            const isSelected = selectedService.id === service.id;
            const isGentlemanReset = service.id === 'the-gentlemans-reset';

            return (
              <article
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`service-card group relative rounded-xl p-4 transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#201f21] border-[#f2ca50] shadow-[0_0_24px_rgba(242,202,80,0.18)]'
                    : isGentlemanReset
                    ? 'bg-[#2a2a2c] border-[#4d4635]/80 shadow-xl'
                    : 'bg-[#1b1b1d]/90 backdrop-blur-md border-[#2a2a2c]/80 shadow-md hover:border-[#4d4635]'
                }`}
              >
                <div className="flex flex-col gap-3">
                  {/* Photo with Overlay */}
                  <div className="relative w-full h-44 rounded-lg overflow-hidden bg-[#201f21]">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/95 via-[#0e0e10]/25 to-transparent"></div>

                    {/* Top Badges */}
                    {service.badge && (
                      <div className="absolute top-2.5 left-2.5 flex gap-1.5 items-center">
                        <span
                          className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase tracking-widest font-sans flex items-center gap-1 ${
                            service.badge === 'Client Favorite'
                              ? 'bg-[#f2ca50] text-[#3c2f00]'
                              : 'bg-[#0e0e10]/80 backdrop-blur-md text-[#f2ca50]'
                          }`}
                        >
                          {service.badge === 'Client Favorite' && (
                            <span className="material-symbols-outlined text-[13px]">star</span>
                          )}
                          {service.badge}
                        </span>
                      </div>
                    )}

                    {/* Bottom Info Ribbon */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end">
                      <div className="flex items-center gap-1.5 text-[#d0c5af] text-[10px] font-bold uppercase tracking-widest bg-[#0e0e10]/80 backdrop-blur-sm px-2 py-0.5 rounded-[2px] font-sans">
                        <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">schedule</span>
                        {service.duration} MINS
                      </div>
                      <div className="text-right">
                        {service.originalPrice && (
                          <span className="text-[11px] font-semibold text-[#99907c] line-through mr-1 font-sans">
                            ${service.originalPrice}
                          </span>
                        )}
                        <span className="font-serif text-[22px] text-[#f2ca50] font-semibold leading-none drop-shadow">
                          ${service.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-1">
                    <h2
                      className={`font-serif text-[19px] tracking-tight font-semibold transition-colors ${
                        isSelected || isGentlemanReset ? 'text-[#f2ca50]' : 'text-[#e5e1e4] group-hover:text-[#f2ca50]'
                      }`}
                    >
                      {service.title}
                    </h2>
                    <p className="text-[13px] text-[#d0c5af] leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>

                  {/* Tags for Combos if any */}
                  {service.tags && (
                    <div className="flex flex-wrap gap-1.5 py-0.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-[#353437] text-[#e5e1e4] text-[10px] font-semibold font-sans tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Bottom Perks & Action Button */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#2a2a2c]/50">
                    <div className="flex items-center gap-2 flex-wrap">
                      {service.perks.map((perk, idx) => (
                        <React.Fragment key={perk.label}>
                          {idx > 0 && <span className="text-[#99907c]/40 text-xs">•</span>}
                          <span
                            className={`flex items-center gap-1 text-[11px] font-semibold font-sans ${
                              perk.isSecondary ? 'text-[#fcb976]' : perk.isPrimary ? 'text-[#99907c]' : 'text-[#d0c5af]'
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[15px] ${
                                perk.isSecondary ? 'text-[#fcb976]' : perk.isPrimary ? 'text-[#f2ca50]' : 'text-[#99907c]'
                              }`}
                            >
                              {perk.icon}
                            </span>
                            {perk.label}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      id={`select-service-${service.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service);
                      }}
                      className={`book-btn flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-[12px] font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all font-sans ${
                        isSelected
                          ? 'bg-[#f2ca50] text-[#3c2f00] ring-2 ring-[#f2ca50]'
                          : isGentlemanReset
                          ? 'bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#d4af37] text-[#3c2f00]'
                          : 'bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#d4af37] text-[#3c2f00]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          <span>Selected</span>
                        </>
                      ) : (
                        <>
                          <span>{service.actionText || 'Select'}</span>
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Custom Add-Ons Section */}
      <section className="flex flex-col space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
              Enhancements
            </span>
            <h3 className="font-serif text-[19px] font-semibold text-[#e5e1e4] tracking-tight">
              Artisan Add-Ons
            </h3>
          </div>
          <span className="text-[12px] text-[#d0c5af] font-sans">Tap to include</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {ADD_ONS.map((addon) => {
            const isChecked = selectedAddOns.some((a) => a.id === addon.id);
            return (
              <label
                key={addon.id}
                className={`addon-item flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer select-none border ${
                  isChecked
                    ? 'bg-[#201f21] border-[#f2ca50]/50'
                    : 'bg-[#1b1b1d] border-[#2a2a2c] hover:bg-[#201f21]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleAddOn(addon)}
                    className="addon-check w-4 h-4 rounded-[2px] bg-[#353437] text-[#f2ca50] accent-[#f2ca50] cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#e5e1e4] font-sans">
                      {addon.title}
                    </span>
                    <span className="text-[12px] text-[#d0c5af] font-sans">
                      {addon.description}
                    </span>
                  </div>
                </div>
                <span className="text-[13px] font-semibold text-[#fcb976] font-sans shrink-0 ml-2">
                  +${addon.price}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Hospitality / Scotch Privilege Banner */}
      <aside className="relative overflow-hidden rounded-xl bg-[#201f21] p-4 shadow-md flex items-center gap-3.5 border border-[#353437]">
        <div className="w-12 h-12 rounded-lg bg-[#6c3e04]/40 flex items-center justify-center shrink-0 text-[#fcb976] border border-[#fcb976]/30">
          <span className="material-symbols-outlined text-[26px]">local_bar</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-[#fcb976] uppercase tracking-widest font-sans">
              MORA Hospitality
            </span>
            <span className="w-1 h-1 rounded-full bg-[#fcb976]"></span>
            <span className="text-[10px] font-medium text-[#d0c5af] font-sans">On the House</span>
          </div>
          <p className="text-[12px] text-[#e5e1e4] mt-0.5 leading-snug font-sans">
            All services include your choice of complimentary 12-year single-malt scotch, artisan espresso, or nitro cold brew.
          </p>
        </div>
      </aside>

      {/* Sticky Reservation Summary Tray */}
      <div
        id="bookingTray"
        className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-30 rounded-xl bg-[#2a2a2c]/95 backdrop-blur-xl p-3 shadow-2xl flex items-center justify-between border border-[#4d4635]/60"
      >
        <div className="flex flex-col pl-1 min-w-0 pr-2">
          <span className="text-[10px] font-bold text-[#99907c] uppercase tracking-wider font-sans">
            Estimated Total
          </span>
          <div className="flex items-baseline gap-1.5 truncate">
            <span className="font-serif text-[22px] text-[#f2ca50] font-bold leading-none" id="totalDisplay">
              ${estimatedTotal}
            </span>
            <span
              className="text-[12px] text-[#d0c5af] truncate max-w-[150px] font-sans"
              id="serviceSummary"
              title={selectedService.title}
            >
              {selectedService.title}
            </span>
          </div>
        </div>

        <button
          id="mainBookCTA"
          onClick={onProceedToBooking}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#d4af37] text-[#3c2f00] text-[12px] font-bold uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 font-sans"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};
