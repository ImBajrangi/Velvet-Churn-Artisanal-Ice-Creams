import React, { useState } from 'react';
import { MapPin, Clock, Phone, Sparkles, Check, Calendar, Users } from 'lucide-react';
import { PARLOR_LOCATIONS, REVIEWS } from '../data/iceCreamData';
import { ParlorLocation } from '../types/icecream';

interface ParlorExperienceProps {
  lang: 'en' | 'hi';
}

export const ParlorExperience: React.FC<ParlorExperienceProps> = ({ lang }) => {
  const [selectedLocation, setSelectedLocation] = useState<ParlorLocation>(PARLOR_LOCATIONS[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('2');
  const [bookingDate, setBookingDate] = useState<string>('Today, 8:30 PM');

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsModalOpen(false);
      setGuestName('');
      setGuestPhone('');
    }, 2500);
  };

  return (
    <section id="parlors" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD3] bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider mb-2">
            {lang === 'hi' ? 'हमारे पार्लर्स' : 'Parlour & Tasting Bar'}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] tracking-tight">
            {lang === 'hi' ? 'पार्लर पधारें या देर रात आर्डर करें' : 'Visit Our Flagship Parlours'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#655343]">
            {lang === 'hi'
              ? 'मुंबई, बेंगलुरु और दिल्ली में हमारी लाइव स्कूप शॉप्स। रात 1:30 बजे तक खुली रहती हैं।'
              : 'Warm oak counters, brass churners, live gelato bars, and late-night cravings fulfilled till 1:30 AM.'}
          </p>
        </div>

        {/* Parlor Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PARLOR_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#C2410C] bg-white ring-2 ring-[#FED7AA] shadow-md'
                    : 'border-[#E8DFD3] bg-white/80 hover:bg-white shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                      {loc.city}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{lang === 'hi' ? 'खुला है' : 'Open Now'}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2C241E] mb-2">
                    {loc.name}
                  </h3>

                  <div className="space-y-2 text-xs text-[#655343] mt-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#8C7662] shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8C7662] shrink-0" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#8C7662] shrink-0" />
                      <span className="font-mono">{loc.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0E6D8] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C7662] font-medium">
                    {loc.highlight}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                      setIsModalOpen(true);
                    }}
                    className="text-xs font-semibold text-[#C2410C] hover:underline"
                  >
                    {lang === 'hi' ? 'टेबल बुक करें →' : 'Book Table →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Customer & Critic Reviews */}
        <div className="border-t border-[#E8DFD3] pt-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
              {lang === 'hi' ? 'ग्राहकों का प्यार' : 'Guest Reviews & Praise'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] mt-1">
              {lang === 'hi' ? 'आइसक्रीम प्रेमियों की राय' : 'What Churn Lovers Say'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-3xl border border-[#E8DFD3] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm mb-3">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#4A3B2C] leading-relaxed italic">
                    "{lang === 'hi' ? rev.textHi : rev.text}"
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#2C241E]">{rev.author}</div>
                    <div className="text-[#8C7662] text-[11px]">{rev.city}</div>
                  </div>
                  <span className="text-[11px] font-medium text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded-md">
                    {rev.favoriteFlavor.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Table Reservation & Tasting Flight Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFD3] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-lg w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer"
            >
              ✕
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#2C241E]">
                  {lang === 'hi' ? 'टेबल आरक्षण सफल!' : 'Tasting Table Reserved!'}
                </h4>
                <p className="mt-2 text-sm text-[#655343]">
                  {lang === 'hi'
                    ? `धन्यवाद ${guestName}! हमने ${selectedLocation.name} में आपका समय रिज़र्व कर लिया है। कन्फर्मेशन SMS भेज दिया गया है।`
                    : `Thank you ${guestName}! We have reserved your table at ${selectedLocation.name}. A confirmation SMS has been dispatched.`}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider block mb-1">
                  {lang === 'hi' ? 'टेबल आरक्षण' : 'Table Reservation'}
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#2C241E]">
                  {selectedLocation.name}
                </h4>
                <p className="text-xs text-[#655343] mt-1 mb-5">
                  {lang === 'hi'
                    ? 'लाइव चर्निंग बार और आइसक्रीम टेस्टिंग फ्लाइट का आनंद लें।'
                    : 'Reserve a spot at our live gelato bar or garden patio.'}
                </p>

                <form onSubmit={handleSubmitBooking} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#2C241E] mb-1">
                      {lang === 'hi' ? 'आपका नाम' : 'Your Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8CBBF] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2C241E] mb-1">
                      {lang === 'hi' ? 'मोबाइल नंबर (SMS पुष्टि हेतु)' : 'Phone Number (for SMS)'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#D8CBBF] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#2C241E] mb-1">
                        {lang === 'hi' ? 'मेहमानों की संख्या' : 'Party Size'}
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8CBBF] bg-white focus:outline-none"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="4">4 People</option>
                        <option value="6">6+ (Party)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2C241E] mb-1">
                        {lang === 'hi' ? 'पसंदीदा समय' : 'Time Slot'}
                      </label>
                      <select
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D8CBBF] bg-white focus:outline-none"
                      >
                        <option value="Today, 7:00 PM">Today, 7:00 PM</option>
                        <option value="Today, 8:30 PM">Today, 8:30 PM</option>
                        <option value="Today, 10:00 PM">Today, 10:00 PM (Late)</option>
                        <option value="Tomorrow, 4:00 PM">Tomorrow, 4:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold text-xs transition-all cursor-pointer"
                    >
                      {lang === 'hi' ? 'आरक्षण कन्फर्म करें' : 'Confirm Tasting Table'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
