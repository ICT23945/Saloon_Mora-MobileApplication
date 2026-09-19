import React, { useState } from 'react';
import { AppointmentPass } from '../types';

interface PassesViewProps {
  passes: AppointmentPass[];
  onCancelPass: (id: string) => void;
  onBookAnother: () => void;
}

export const PassesView: React.FC<PassesViewProps> = ({
  passes,
  onCancelPass,
  onBookAnother
}) => {
  const [checkedInMap, setCheckedInMap] = useState<Record<string, boolean>>({});
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleToggleCheckIn = (id: string) => {
    setCheckedInMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="flex flex-col w-full text-[#e5e1e4] px-4 space-y-4 pb-28 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
            Digital Wallet
          </span>
          <h1 className="font-serif text-[24px] font-semibold text-[#e5e1e4] tracking-tight">
            Atelier Passes
          </h1>
        </div>
        <button
          onClick={onBookAnother}
          className="px-3 py-1.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#f2ca50] text-[11px] font-bold uppercase tracking-wider border border-[#353437] transition-all flex items-center gap-1 font-sans"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Session</span>
        </button>
      </div>

      {passes.length === 0 ? (
        <div className="rounded-xl bg-[#1b1b1d] p-8 text-center border border-[#2a2a2c] flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#201f21] flex items-center justify-center text-[#99907c] mb-3">
            <span className="material-symbols-outlined text-[28px]">event_busy</span>
          </div>
          <h3 className="font-serif text-[18px] text-[#e5e1e4] font-semibold">
            No Active Passes
          </h3>
          <p className="text-[13px] text-[#d0c5af] mt-1 max-w-xs leading-relaxed font-sans">
            Your reserved grooming appointments and VIP passes will appear here for easy lounge check-in.
          </p>
          <button
            onClick={onBookAnother}
            className="mt-4 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#e4a857] via-[#f2ca50] to-[#fcb976] text-[#3c2f00] text-[12px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-transform font-sans"
          >
            Explore Grooming Menu
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {passes.map((pass) => {
            const isCheckedIn = !!checkedInMap[pass.id];
            const { booking } = pass;

            return (
              <div
                key={pass.id}
                className="relative rounded-2xl bg-[#1b1b1d] overflow-hidden border border-[#353437] shadow-xl"
              >
                {/* Gold Top Header Banner */}
                <div className="bg-gradient-to-r from-[#201f21] via-[#2a2a2c] to-[#201f21] px-4 py-3 border-b border-[#353437] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
                    <span className="text-[11px] font-bold text-[#f2ca50] uppercase tracking-widest font-sans">
                      {isCheckedIn ? 'Checked-In to Lounge' : 'Upcoming Session'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(pass.bookingCode)}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#d0c5af] bg-[#131315] px-2 py-0.5 rounded border border-[#353437] hover:text-[#f2ca50]"
                  >
                    <span>{pass.bookingCode}</span>
                    <span className="material-symbols-outlined text-[13px]">
                      {copiedCode === pass.bookingCode ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>

                <div className="p-4 space-y-3">
                  {/* Service & Price */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-serif text-[18px] text-[#e5e1e4] font-semibold">
                        {booking.service.title}
                      </h2>
                      <p className="text-[12px] text-[#d0c5af] mt-0.5 font-sans">
                        {booking.service.duration} mins • Tailored with Master Barber
                      </p>
                    </div>
                    <span className="font-serif text-[20px] text-[#f2ca50] font-bold">
                      ${booking.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Artisan & Time Information */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#201f21] border border-[#2a2a2c]">
                    <div className="flex items-center gap-2.5">
                      {booking.barber.avatar ? (
                        <img
                          src={booking.barber.avatar}
                          alt={booking.barber.name}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-[#f2ca50]/40 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2a2a2c] flex items-center justify-center text-[#f2ca50] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">all_inclusive</span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#99907c] uppercase font-bold tracking-wider font-sans block">
                          Artisan
                        </span>
                        <p className="text-[12px] font-bold text-[#e5e1e4] truncate">
                          {booking.barber.name}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#99907c] uppercase font-bold tracking-wider font-sans block">
                        Date & Time
                      </span>
                      <p className="text-[12px] font-bold text-[#e5e1e4]">
                        {booking.date.dayOfWeek}, {booking.date.month} {booking.date.dayNumber}
                      </p>
                      <span className="text-[11px] text-[#f2ca50] font-semibold">
                        {booking.timeSlot}
                      </span>
                    </div>
                  </div>

                  {/* Hospitality drink selection */}
                  {booking.hospitalityNote && (
                    <div className="flex items-start gap-2 text-[12px] text-[#d0c5af] bg-[#201f21]/60 px-3 py-2 rounded-lg border border-[#2a2a2c]">
                      <span className="material-symbols-outlined text-[16px] text-[#fcb976] shrink-0 mt-0.5">
                        local_bar
                      </span>
                      <span className="italic">
                        Preferred drink: {booking.hospitalityNote}
                      </span>
                    </div>
                  )}

                  {/* QR Visual Barcode for Entrance Check-in */}
                  <div className="p-3 bg-[#131315] rounded-xl border border-[#2a2a2c] flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#99907c] uppercase tracking-wider font-sans">
                        Fast-Track Lounge Access
                      </span>
                      <span className="text-[12px] text-[#e5e1e4] font-medium font-sans">
                        Scan at Atelier Front Desk
                      </span>
                    </div>
                    {/* Stylized QR Code placeholder representation */}
                    <div className="w-12 h-12 bg-white p-1 rounded-md flex items-center justify-center">
                      <div className="w-full h-full border-2 border-black flex flex-col justify-between p-0.5">
                        <div className="flex justify-between">
                          <div className="w-2.5 h-2.5 bg-black"></div>
                          <div className="w-2.5 h-2.5 bg-black"></div>
                        </div>
                        <div className="w-2 h-2 bg-black self-center"></div>
                        <div className="flex justify-between">
                          <div className="w-2.5 h-2.5 bg-black"></div>
                          <div className="w-1.5 h-1.5 bg-black"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleToggleCheckIn(pass.id)}
                      className={`flex-1 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all font-sans flex items-center justify-center gap-1.5 ${
                        isCheckedIn
                          ? 'bg-[#201f21] text-[#f2ca50] border border-[#f2ca50]'
                          : 'bg-[#f2ca50] text-[#3c2f00] hover:brightness-105'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isCheckedIn ? 'done_all' : 'badge'}
                      </span>
                      <span>{isCheckedIn ? 'Checked-In' : 'Self Check-In'}</span>
                    </button>

                    <button
                      onClick={() => onCancelPass(pass.id)}
                      className="px-3 py-2.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#99907c] hover:text-[#ffb4ab] text-[11px] font-bold uppercase tracking-wider border border-[#353437] transition-colors font-sans"
                      title="Cancel Appointment"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
