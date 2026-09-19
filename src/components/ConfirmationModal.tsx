import React, { useState } from 'react';
import { BookingState, AppointmentPass } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  booking: BookingState;
  onClose: () => void;
  onConfirm: (pass: AppointmentPass) => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  booking,
  onClose,
  onConfirm
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFinalConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const newPass: AppointmentPass = {
        id: `pass-${Date.now()}`,
        bookingCode: `MORA-${randomId}-VIP`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        booking: { ...booking }
      };
      setIsSubmitting(false);
      onConfirm(newPass);
    }, 700);
  };

  const addOnsTotal = booking.selectedAddOns.reduce((acc, a) => acc + a.price, 0);
  const total = booking.service.price + addOnsTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#1b1b1d] rounded-t-2xl sm:rounded-2xl border border-[#353437] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#2a2a2c] flex items-center justify-between bg-[#201f21]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">verified</span>
            <h2 className="font-serif text-[18px] font-semibold text-[#e5e1e4]">
              Review Reservation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-[#99907c] hover:text-[#e5e1e4] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          {/* Digital Atelier Ticket Preview */}
          <div className="relative rounded-xl bg-[#201f21] p-4 border border-[#4d4635]/60 shadow-lg">
            <div className="flex justify-between items-start border-b border-[#353437] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
                  MORA ATELIER DOWNTOWN
                </span>
                <h3 className="font-serif text-[18px] text-[#e5e1e4] font-semibold mt-0.5">
                  {booking.service.title}
                </h3>
              </div>
              <div className="px-2 py-1 rounded bg-[#d4af37]/20 text-[#f2ca50] text-[10px] font-bold font-sans">
                FLAGSHIP PASS
              </div>
            </div>

            {/* Barber and Time Details */}
            <div className="grid grid-cols-2 gap-3 py-3 border-b border-[#353437]">
              <div>
                <span className="text-[10px] text-[#99907c] uppercase font-bold tracking-wider font-sans">
                  Assigned Artisan
                </span>
                <p className="text-[13px] font-bold text-[#e5e1e4] mt-0.5">
                  {booking.barber.name}
                </p>
                <span className="text-[11px] text-[#fcb976]">
                  {booking.barber.role}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#99907c] uppercase font-bold tracking-wider font-sans">
                  Date & Session
                </span>
                <p className="text-[13px] font-bold text-[#e5e1e4] mt-0.5">
                  {booking.date.dayOfWeek}, {booking.date.month} {booking.date.dayNumber}
                </p>
                <span className="text-[12px] text-[#f2ca50] font-semibold">
                  {booking.timeSlot}
                </span>
              </div>
            </div>

            {/* Add-ons list if any */}
            {booking.selectedAddOns.length > 0 && (
              <div className="py-2.5 border-b border-[#353437]">
                <span className="text-[10px] text-[#99907c] uppercase font-bold tracking-wider font-sans">
                  Selected Add-Ons
                </span>
                <div className="mt-1 space-y-1">
                  {booking.selectedAddOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-[12px]">
                      <span className="text-[#d0c5af]">{addon.title}</span>
                      <span className="text-[#fcb976] font-semibold">+${addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hospitality Beverage Preference */}
            <div className="pt-2.5">
              <span className="text-[10px] text-[#fcb976] uppercase font-bold tracking-wider font-sans flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_bar</span>
                Complimentary Hospitality
              </span>
              <p className="text-[12px] text-[#d0c5af] mt-0.5 italic">
                {booking.hospitalityNote.trim()
                  ? `"${booking.hospitalityNote.trim()}"`
                  : '12-Year Single Malt Scotch / Espresso (Default VIP selection)'}
              </p>
            </div>
          </div>

          {/* Pricing summary */}
          <div className="bg-[#201f21] rounded-xl p-3.5 border border-[#2a2a2c] space-y-2">
            <div className="flex justify-between text-[12px] text-[#d0c5af]">
              <span>Base Service ({booking.service.duration} min)</span>
              <span>${booking.service.price.toFixed(2)}</span>
            </div>
            {addOnsTotal > 0 && (
              <div className="flex justify-between text-[12px] text-[#d0c5af]">
                <span>Artisan Enhancements ({booking.selectedAddOns.length})</span>
                <span>+${addOnsTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[12px] text-[#d0c5af]">
              <span>Taxes & VIP Service Amenities</span>
              <span className="text-[#f2ca50]">Included</span>
            </div>
            <div className="border-t border-[#353437] pt-2 flex justify-between items-baseline">
              <span className="font-bold text-[13px] text-[#e5e1e4]">Total Due at Atelier</span>
              <span className="font-serif text-[20px] font-bold text-[#f2ca50]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-[#201f21] border-t border-[#2a2a2c] flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-3 rounded-xl bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#353437] text-[12px] font-bold uppercase tracking-wider font-sans transition-colors"
          >
            Modify
          </button>
          <button
            id="modal-confirm-pass-btn"
            type="button"
            disabled={isSubmitting}
            onClick={handleFinalConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#fcb976] text-[#3c2f00] text-[13px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform font-sans"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Securing Slot...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Confirm & Issue Pass</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
