import React, { useState } from 'react';
import { Service, AddOn, Barber, DateOption } from '../types';
import { BARBERS, DATE_OPTIONS, TIME_SLOTS_AFTERNOON, TIME_SLOTS_EVENING } from '../data/groomingData';

interface BookAppointmentViewProps {
  selectedService: Service;
  selectedAddOns: AddOn[];
  selectedBarber: Barber;
  selectedDate: DateOption;
  selectedTimeSlot: string;
  hospitalityNote: string;
  onSelectBarber: (barber: Barber) => void;
  onSelectDate: (date: DateOption) => void;
  onSelectTimeSlot: (slot: string) => void;
  onChangeHospitalityNote: (note: string) => void;
  onEditService: () => void;
  onProceedToConfirmation: () => void;
}

export const BookAppointmentView: React.FC<BookAppointmentViewProps> = ({
  selectedService,
  selectedAddOns,
  selectedBarber,
  selectedDate,
  selectedTimeSlot,
  hospitalityNote,
  onSelectBarber,
  onSelectDate,
  onSelectTimeSlot,
  onChangeHospitalityNote,
  onEditService,
  onProceedToConfirmation
}) => {
  const addOnsTotal = selectedAddOns.reduce((acc, a) => acc + a.price, 0);
  const totalDuration = selectedService.duration + selectedAddOns.reduce((acc, a) => acc + a.durationMinutes, 0);
  const estimatedTotal = selectedService.price + addOnsTotal;

  return (
    <div className="flex flex-col w-full text-[#e5e1e4] pb-32 pt-2">
      {/* Step Progress Tracker */}
      <div className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between gap-2">
          {/* Step 1: Service (Completed) */}
          <div className="flex flex-col items-center flex-1 gap-1 cursor-pointer" onClick={onEditService}>
            <div className="w-full h-1 rounded-full bg-[#f2ca50]"></div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px] text-[#f2ca50]">check_circle</span>
              <span className="text-[10px] font-bold text-[#f2ca50] uppercase font-sans">Service</span>
            </div>
          </div>

          {/* Step 2: Barber (Active) */}
          <div className="flex flex-col items-center flex-1 gap-1">
            <div className="w-full h-1 rounded-full bg-[#f2ca50] shadow-[0_0_8px_rgba(242,202,80,0.5)]"></div>
            <span className="text-[10px] font-bold text-[#f2ca50] uppercase font-sans">Barber</span>
          </div>

          {/* Step 3: Time */}
          <div className="flex flex-col items-center flex-1 gap-1">
            <div className="w-full h-1 rounded-full bg-[#353437]"></div>
            <span className="text-[10px] font-bold text-[#d0c5af] uppercase font-sans">Time</span>
          </div>

          {/* Step 4: Review */}
          <div className="flex flex-col items-center flex-1 gap-1">
            <div className="w-full h-1 rounded-full bg-[#353437]"></div>
            <span className="text-[10px] font-bold text-[#d0c5af] uppercase font-sans">Review</span>
          </div>
        </div>
      </div>

      {/* Selected Service Snippet Bar */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between bg-[#1b1b1d] px-4 py-3 rounded-xl shadow-sm border border-[#2a2a2c]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#2a2a2c] flex items-center justify-center text-[#f2ca50] shrink-0 border border-[#353437]">
              <span className="material-symbols-outlined text-[19px]">content_cut</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-semibold text-[#e5e1e4] truncate font-sans">
                {selectedService.title}
                {selectedAddOns.length > 0 && ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}`}
              </span>
              <span className="text-[12px] text-[#d0c5af] font-sans">
                {totalDuration} MIN • ${estimatedTotal.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            id="edit-service-selection-btn"
            onClick={onEditService}
            className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-wider hover:text-[#ffe088] px-2 py-1 transition-colors font-sans"
            type="button"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Section: Select Artisan */}
      <section className="px-4 pt-2 pb-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-[18px] font-semibold text-[#e5e1e4] tracking-tight">
              Select Artisan
            </h2>
            <p className="text-[12px] text-[#d0c5af] font-sans">
              Curated master barbers for your requested profile
            </p>
          </div>
          <span className="text-[10px] font-bold text-[#fcb976] uppercase bg-[#6c3e04]/40 px-2 py-0.5 rounded border border-[#fcb976]/30 font-sans">
            Flagship Crew
          </span>
        </div>

        <div aria-label="Select Barber" className="flex flex-col gap-2.5" role="radiogroup">
          {BARBERS.map((barber) => {
            const isSelected = selectedBarber.id === barber.id;

            return (
              <div
                key={barber.id}
                id={`barber-card-${barber.id}`}
                aria-checked={isSelected}
                role="radio"
                tabIndex={0}
                onClick={() => onSelectBarber(barber)}
                className={`barber-card relative flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#201f21] shadow-md border-[#f2ca50]/50 bg-gradient-to-r from-[#201f21] via-[#201f21] to-[#f2ca50]/10'
                    : 'bg-[#1b1b1d] border-[#2a2a2c] hover:bg-[#201f21]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {barber.isAny ? (
                    <div className="w-12 h-12 rounded-full bg-[#2a2a2c] flex items-center justify-center text-[#f2ca50] shrink-0 border border-[#353437]">
                      <span className="material-symbols-outlined text-[24px]">all_inclusive</span>
                    </div>
                  ) : (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-1 ring-[#353437]">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-full h-full object-cover"
                      />
                      {barber.id === 'marcus' && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#d4af37] ring-2 ring-[#131315]"></div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-[#e5e1e4] truncate font-sans">
                        {barber.name}
                      </span>
                      {barber.roleBadgeType === 'director' && (
                        <span className="bg-[#f2ca50]/20 text-[#f2ca50] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide font-sans">
                          DIRECTOR
                        </span>
                      )}
                      {barber.roleBadgeType === 'architect' && (
                        <span className="bg-[#353437] text-[#d0c5af] text-[9px] font-bold px-1.5 py-0.5 rounded font-sans">
                          ARCHITECT
                        </span>
                      )}
                      {barber.roleBadgeType === 'shave-master' && (
                        <span className="bg-[#353437] text-[#d0c5af] text-[9px] font-bold px-1.5 py-0.5 rounded font-sans">
                          SHAVE MASTER
                        </span>
                      )}
                    </div>

                    {!barber.isAny && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[13px] text-[#f2ca50]">star</span>
                        <span className="text-[12px] text-[#e5e1e4] font-semibold font-sans">{barber.rating}</span>
                        <span className="text-[12px] text-[#99907c] font-sans">({barber.reviewCount})</span>
                      </div>
                    )}

                    <span
                      className={`text-[11px] mt-0.5 font-sans ${
                        isSelected ? 'text-[#f2ca50]' : 'text-[#99907c]'
                      }`}
                    >
                      {barber.isAny ? 'Recommended for fastest service accommodation' : `Next available: ${barber.nextAvailable}`}
                    </span>
                  </div>
                </div>

                <div
                  className={`barber-indicator w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_12px_rgba(242,202,80,0.6)]'
                      : 'bg-[#353437] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Select Date */}
      <section className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">calendar_month</span>
            <h2 className="font-serif text-[18px] font-semibold text-[#e5e1e4] tracking-tight">
              Select Date
            </h2>
          </div>
          <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
            {selectedDate.month} {selectedDate.year}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2" id="date-strip">
          {DATE_OPTIONS.map((dateOpt) => {
            const isSelected = selectedDate.dateKey === dateOpt.dateKey;
            return (
              <button
                key={dateOpt.dateKey}
                id={`date-chip-${dateOpt.dateKey}`}
                type="button"
                onClick={() => onSelectDate(dateOpt)}
                className={`date-chip flex flex-col items-center py-2.5 rounded-xl transition-all active:scale-95 border ${
                  isSelected
                    ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-[0_4px_16px_rgba(242,202,80,0.35)] border-[#f2ca50]'
                    : 'bg-[#1b1b1d] text-[#e5e1e4] border-[#2a2a2c] hover:bg-[#201f21]'
                }`}
              >
                <span
                  className={`text-[10px] font-bold uppercase font-sans ${
                    isSelected ? 'text-[#554300]' : 'text-[#d0c5af]'
                  }`}
                >
                  {dateOpt.dayOfWeek}
                </span>
                <span className="font-serif text-[18px] font-semibold mt-0.5">
                  {dateOpt.dayNumber}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section: Available Sessions */}
      <section className="px-4 pt-3 pb-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">schedule</span>
          <h2 className="font-serif text-[18px] font-semibold text-[#e5e1e4] tracking-tight">
            Available Sessions
          </h2>
        </div>

        {/* Afternoon Slots */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#d0c5af] uppercase tracking-widest font-sans">
              Afternoon
            </span>
            <div className="flex-1 h-[1px] bg-[#353437]"></div>
          </div>
          <div className="grid grid-cols-3 gap-2" id="slot-group-afternoon">
            {TIME_SLOTS_AFTERNOON.map((slot) => {
              const isSelected = selectedTimeSlot === slot;
              return (
                <button
                  key={slot}
                  id={`slot-${slot.replace(/[: ]/g, '-')}`}
                  type="button"
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`time-slot py-2.5 rounded-lg text-[12px] font-bold font-sans transition-all active:scale-95 border ${
                    isSelected
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_18px_rgba(242,202,80,0.5)] border-[#f2ca50]'
                      : 'bg-[#1b1b1d] text-[#e5e1e4] border-[#2a2a2c] hover:bg-[#201f21]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Evening Slots */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#d0c5af] uppercase tracking-widest font-sans">
              Evening
            </span>
            <div className="flex-1 h-[1px] bg-[#353437]"></div>
          </div>
          <div className="grid grid-cols-3 gap-2" id="slot-group-evening">
            {TIME_SLOTS_EVENING.map((slot) => {
              const isSelected = selectedTimeSlot === slot;
              return (
                <button
                  key={slot}
                  id={`slot-${slot.replace(/[: ]/g, '-')}`}
                  type="button"
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`time-slot py-2.5 rounded-lg text-[12px] font-bold font-sans transition-all active:scale-95 border ${
                    isSelected
                      ? 'bg-[#f2ca50] text-[#3c2f00] shadow-[0_0_18px_rgba(242,202,80,0.5)] border-[#f2ca50]'
                      : 'bg-[#1b1b1d] text-[#e5e1e4] border-[#2a2a2c] hover:bg-[#201f21]'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Hospitality & Lounge Preferences */}
      <section className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <label className="flex items-center justify-between" htmlFor="booking-note">
          <span className="text-[10px] font-bold text-[#d0c5af] uppercase tracking-wider font-sans">
            Hospitality & Lounge Preferences
          </span>
          <span className="text-[10px] font-bold text-[#fcb976] uppercase font-sans">
            Complimentary Bar
          </span>
        </label>
        <div className="relative w-full">
          <textarea
            id="booking-note"
            rows={2}
            value={hospitalityNote}
            onChange={(e) => onChangeHospitalityNote(e.target.value)}
            placeholder="Special requests or welcome drink (Single Malt, Double Espresso, Sparkling San Pellegrino)..."
            className="w-full bg-[#1b1b1d] text-[#e5e1e4] placeholder:text-[#99907c]/70 text-[13px] font-sans rounded-xl p-3 focus:outline-none focus:bg-[#201f21] focus:ring-1 focus:ring-[#f2ca50]/40 transition-all resize-none shadow-inner border border-[#2a2a2c]"
          />
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 pointer-events-none text-[#99907c]">
            <span className="material-symbols-outlined text-[16px]">local_bar</span>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Confirmation Tray */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#131315]/95 backdrop-blur-xl border-t border-[#2a2a2c] px-4 py-3 shadow-[0_-12px_32px_-8px_rgba(0,0,0,0.85)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col shrink-0">
            <span className="text-[10px] font-bold text-[#d0c5af] uppercase tracking-wider font-sans">
              Estimated Total
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-[24px] text-[#f2ca50] font-semibold">
                ${estimatedTotal.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#99907c] font-sans">tax incl.</span>
            </div>
          </div>

          <button
            id="confirm-booking-btn"
            type="button"
            onClick={onProceedToConfirmation}
            className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#fcb976] text-[#3c2f00] text-[13px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(242,202,80,0.3)] active:scale-[0.98] hover:brightness-105 transition-all font-sans"
          >
            <span>Proceed to Confirmation</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
