/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, Service, AddOn, Barber, DateOption, BookingState, AppointmentPass } from './types';
import { SERVICES, BARBERS, DATE_OPTIONS, INITIAL_PASSES } from './data/groomingData';
import { Header } from './components/Header';
import { CuratedGroomingMenu } from './components/CuratedGroomingMenu';
import { BookAppointmentView } from './components/BookAppointmentView';
import { PassesView } from './components/PassesView';
import { HomeView } from './components/HomeView';
import { BottomNavigation } from './components/BottomNavigation';
import { ConfirmationModal } from './components/ConfirmationModal';
import { VipProfileModal } from './components/VipProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('services');
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber>(BARBERS[0]);
  const [selectedDate, setSelectedDate] = useState<DateOption>(DATE_OPTIONS[1]); // Tue 15
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('3:30 PM');
  const [hospitalityNote, setHospitalityNote] = useState<string>('');
  const [passes, setPasses] = useState<AppointmentPass[]>(INITIAL_PASSES);

  // Modals
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isVipProfileOpen, setIsVipProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  const handleToggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.id === addon.id);
      if (exists) {
        return prev.filter((a) => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleProceedToBooking = () => {
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditService = () => {
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickBookBarber = (barber: Barber) => {
    setSelectedBarber(barber);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentBookingState: BookingState = {
    service: selectedService,
    selectedAddOns,
    barber: selectedBarber,
    date: selectedDate,
    timeSlot: selectedTimeSlot,
    hospitalityNote,
    totalPrice: selectedService.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  };

  const handleConfirmPass = (newPass: AppointmentPass) => {
    setPasses((prev) => [newPass, ...prev]);
    setIsConfirmationOpen(false);
    setActiveTab('passes');
    showToast(`Appointment Confirmed with ${newPass.booking.barber.name}! Pass #${newPass.bookingCode} generated.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelPass = (id: string) => {
    setPasses((prev) => prev.filter((p) => p.id !== id));
    showToast('Reservation pass cancelled.');
  };

  const isBookingFlow = activeTab === 'book';

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col items-center">
      {/* Container restricted to mobile width for authentic app experience or scales fluidly */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#131315] relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-[#2a2a2c]/40">
        
        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed top-24 left-4 right-4 max-w-md mx-auto z-50 animate-bounce">
            <div className="bg-[#f2ca50] text-[#3c2f00] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider font-sans border border-[#d4af37]">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="flex-1">{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Global Navigation Header */}
        <Header
          activeTab={activeTab}
          onNavigate={(tab) => setActiveTab(tab)}
          onOpenProfile={() => setIsVipProfileOpen(true)}
          onBack={handleEditService}
          isBookingFlow={isBookingFlow}
        />

        {/* Main Content Body */}
        <main className="flex-1 flex flex-col relative w-full pt-20">
          {activeTab === 'services' && (
            <CuratedGroomingMenu
              selectedService={selectedService}
              selectedAddOns={selectedAddOns}
              onSelectService={handleSelectService}
              onToggleAddOn={handleToggleAddOn}
              onProceedToBooking={handleProceedToBooking}
            />
          )}

          {activeTab === 'book' && (
            <BookAppointmentView
              selectedService={selectedService}
              selectedAddOns={selectedAddOns}
              selectedBarber={selectedBarber}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              hospitalityNote={hospitalityNote}
              onSelectBarber={setSelectedBarber}
              onSelectDate={setSelectedDate}
              onSelectTimeSlot={setSelectedTimeSlot}
              onChangeHospitalityNote={setHospitalityNote}
              onEditService={handleEditService}
              onProceedToConfirmation={() => setIsConfirmationOpen(true)}
            />
          )}

          {activeTab === 'passes' && (
            <PassesView
              passes={passes}
              onCancelPass={handleCancelPass}
              onBookAnother={() => setActiveTab('services')}
            />
          )}

          {activeTab === 'home' && (
            <HomeView
              onExploreMenu={() => setActiveTab('services')}
              onQuickBookBarber={handleQuickBookBarber}
            />
          )}
        </main>

        {/* Bottom Navigation Tabs */}
        <BottomNavigation
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          passesCount={passes.length}
        />

        {/* Reservation Review & Pass Confirmation Modal */}
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          booking={currentBookingState}
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleConfirmPass}
        />

        {/* VIP Member Lounge Profile Modal */}
        <VipProfileModal
          isOpen={isVipProfileOpen}
          onClose={() => setIsVipProfileOpen(false)}
        />
      </div>
    </div>
  );
}
