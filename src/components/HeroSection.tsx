import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Snowflake, Heart } from 'lucide-react';
import { FLAVORS } from '../data/iceCreamData';
import { Flavor } from '../types/icecream';

interface HeroSectionProps {
  lang: 'en' | 'hi';
  onExploreMenu: () => void;
  onOpenSundaeBuilder: () => void;
  onSelectFlavor: (flavor: Flavor) => void;
  onQuickAddFlavor: (flavor: Flavor) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExploreMenu,
  onOpenSundaeBuilder,
  onSelectFlavor,
  onQuickAddFlavor,
}) => {
  // Active featured scoop in the interactive visualizer
  const [activeFlavorIndex, setActiveFlavorIndex] = useState<number>(0);
  const featuredFlavors = FLAVORS.slice(0, 4); // Mango, Pistachio, Belgian Chocolate, Sitaphal
  const currentFlavor = featuredFlavors[activeFlavorIndex];

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle organic ambient background glows */}
      <div className="pointer-events-none absolute -top-24 right-10 w-96 h-96 rounded-full bg-[#FED7AA]/40 blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#FDE68A]/30 blur-3xl -z-10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Manifesto & Actions */}
          <div className="lg:col-span-7">
            {/* Unboxed metadata line (No static pill badges) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#8C7662] mb-4">
              <span className="text-[#C2410C] font-semibold">
                {lang === 'hi' ? 'हस्तनिर्मित मलाईदार आइसक्रीम' : 'Hand-Churned Micro Batches'}
              </span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'hi' ? 'शुद्ध A2 देशी दूध' : '100% Pure A2 Cow Milk'}</span>
              <span aria-hidden="true">·</span>
              <span>{lang === 'hi' ? 'असली मौसमी फल' : 'Zero Synthetic Flavours'}</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C241E] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {lang === 'hi' ? (
                <>
                  हर स्कूप में ताज़गी, <br />
                  <span className="italic text-[#C2410C]">असली दूध और फलों</span> का जादू।
                </>
              ) : (
                <>
                  Slow-churned gelato <br />
                  &amp; artisanal scoops, <br />
                  <span className="italic text-[#C2410C]">crafted at 4 AM daily.</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-[#655343] leading-relaxed max-w-2xl">
              {lang === 'hi'
                ? 'रत्नागिरी के असली हापुस आम, सिसिली के भुने हुए पिस्ते और बेल्जियन डार्क चॉकलेट से बनी मखमली आइसक्रीम। घर बैठे मंगवाएं ड्राई-आइस सुरक्षित डिलीवरी में।'
                : 'From Ratnagiri Alphonso Hapus to roasted Sicilian pistachios and single-origin Belgian chocolate. Churned without air pump fluff, delivered freezing cold with eco dry ice.'}
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>{lang === 'hi' ? 'मेन्यू और फ़्लेवर्स देखें' : 'Explore All 10 Flavors'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenSundaeBuilder}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#2C241E] bg-white hover:bg-[#F5EFE6] border border-[#D8CBBF] active:scale-95 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C2410C]" />
                <span>{lang === 'hi' ? 'संडे बनाएं (Custom Sundae)' : 'Custom Sundae Builder'}</span>
              </button>
            </div>

            {/* Adjacency Proof Numbers (Unboxed, Tabular Numerals) */}
            <div className="mt-12 pt-8 border-t border-[#E8DFD3] grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] tabular-nums">
                  4:00 <span className="text-xs font-sans text-[#8C7662] font-semibold">AM</span>
                </div>
                <div className="text-xs text-[#8C7662] mt-0.5">
                  {lang === 'hi' ? 'दैनिक ताज़ा चर्निंग' : 'Daily Morning Churn'}
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#8C7662] mt-0.5">
                  {lang === 'hi' ? 'शुद्ध A2 मलाईदार दूध' : 'Pure Farm A2 Cream'}
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] tabular-nums">
                  -78°C
                </div>
                <div className="text-xs text-[#8C7662] mt-0.5">
                  {lang === 'hi' ? 'ड्राई-आइस कोल्ड डिलीवरी' : 'Dry-Ice Sub-Zero Box'}
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] tabular-nums">
                  0%
                </div>
                <div className="text-xs text-[#8C7662] mt-0.5">
                  {lang === 'hi' ? 'कृत्रिम रंग या प्रिजर्वेटिव' : 'Synthetic Flavors'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Daily Churn Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xl relative overflow-hidden transition-all">
              
              {/* Header inside showcase */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8]">
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#C2410C] block">
                    {lang === 'hi' ? 'लाइव चर्न डिस्प्ले' : 'Interactive Flavor Spotlight'}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2C241E]">
                    {lang === 'hi' ? currentFlavor.nameHi : currentFlavor.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-[#FAF7F2] border border-[#E8DFD3] rounded-md text-[#655343] tabular-nums">
                  ₹{currentFlavor.priceSingle} / scoop
                </span>
              </div>

              {/* Interactive Scoop Vessel Graphic (SVG with dynamic color changes & textures) */}
              <div className="relative h-64 sm:h-72 my-4 flex items-center justify-center">
                {/* Background glow matching the current flavor's color */}
                <div
                  className="absolute inset-4 rounded-full opacity-35 blur-2xl transition-all duration-700"
                  style={{ backgroundColor: currentFlavor.colors.primary }}
                />

                {/* SVG Sundae / Cone Vector Illustration */}
                <svg
                  viewBox="0 0 300 320"
                  className="w-full h-full relative z-10 transition-transform duration-500 hover:scale-105"
                >
                  <defs>
                    <radialGradient id="coneScoopGlow" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                      <stop offset="60%" stopColor={currentFlavor.colors.primary} />
                      <stop offset="100%" stopColor={currentFlavor.colors.secondary} />
                    </radialGradient>
                    <linearGradient id="wafflePattern" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5A663" />
                      <stop offset="50%" stopColor="#D98A3C" />
                      <stop offset="100%" stopColor="#B36821" />
                    </linearGradient>
                    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2C241E" floodOpacity="0.18" />
                    </filter>
                  </defs>

                  {/* Ambient drop shadow under cone */}
                  <ellipse cx="150" cy="295" rx="55" ry="9" fill="#2C241E" fillOpacity="0.1" />

                  {/* Waffle Cone Body */}
                  <polygon
                    points="105,170 195,170 150,290"
                    fill="url(#wafflePattern)"
                    filter="url(#softShadow)"
                  />
                  {/* Waffle Grid lines */}
                  <line x1="120" y1="170" x2="160" y2="280" stroke="#8C4909" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="140" y1="170" x2="175" y2="245" stroke="#8C4909" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="160" y1="170" x2="135" y2="245" stroke="#8C4909" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="180" y1="170" x2="140" y2="280" stroke="#8C4909" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="110" y1="190" x2="175" y2="230" stroke="#8C4909" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="115" y1="215" x2="165" y2="250" stroke="#8C4909" strokeWidth="1.5" strokeOpacity="0.6" />

                  {/* Cone Rim */}
                  <ellipse cx="150" cy="170" rx="46" ry="9" fill="#C97A2E" />

                  {/* Bottom Supporting Scoop (Subtle) */}
                  <circle cx="150" cy="155" r="42" fill={currentFlavor.colors.secondary} opacity="0.8" />

                  {/* Main Majestic Scoop with Floaty Animation */}
                  <g className="animate-scoop-float origin-center">
                    <circle
                      cx="150"
                      cy="125"
                      r="54"
                      fill="url(#coneScoopGlow)"
                      filter="url(#softShadow)"
                    />
                    
                    {/* Natural Artisanal Scoop Textures & Ripples */}
                    <path
                      d="M 112 145 Q 130 160 150 148 Q 170 160 188 145 Q 192 120 150 115 Q 110 120 112 145 Z"
                      fill={currentFlavor.colors.secondary}
                      opacity="0.35"
                    />

                    {/* Melting drip */}
                    <path
                      d="M 125 152 Q 123 175 128 178 Q 132 175 130 152 Z"
                      fill={currentFlavor.colors.primary}
                    />
                    <path
                      d="M 170 155 Q 172 172 175 174 Q 178 172 176 155 Z"
                      fill={currentFlavor.colors.primary}
                    />

                    {/* Fresh Garnish / Topping Sprinkle on the Scoop */}
                    {activeFlavorIndex === 0 && (
                      /* Mango chunks */
                      <g fill="#D97706">
                        <rect x="135" y="88" width="8" height="6" rx="2" transform="rotate(15 135 88)" />
                        <rect x="155" y="94" width="7" height="6" rx="2" transform="rotate(-10 155 94)" />
                        <circle cx="145" cy="80" r="3" fill="#F59E0B" />
                      </g>
                    )}
                    {activeFlavorIndex === 1 && (
                      /* Pistachio and saffron */
                      <g>
                        <circle cx="138" cy="85" r="3.5" fill="#4D7C0F" />
                        <circle cx="155" cy="92" r="3" fill="#65A30D" />
                        <circle cx="160" cy="82" r="3.5" fill="#365314" />
                        <path d="M 142 80 Q 146 76 150 82" stroke="#DC2626" strokeWidth="1.5" fill="none" />
                      </g>
                    )}
                    {activeFlavorIndex === 2 && (
                      /* Chocolate curls & sea salt */
                      <g>
                        <rect x="135" y="85" width="10" height="4" rx="2" fill="#1C1917" transform="rotate(25 135 85)" />
                        <rect x="154" y="90" width="11" height="4" rx="2" fill="#1C1917" transform="rotate(-15 154 90)" />
                        <circle cx="148" cy="80" r="2" fill="#FFFFFF" opacity="0.9" />
                        <circle cx="162" cy="82" r="2" fill="#FFFFFF" opacity="0.9" />
                      </g>
                    )}
                    {activeFlavorIndex === 3 && (
                      /* Sitaphal cream texture */
                      <g fill="#A8AB75">
                        <circle cx="136" cy="90" r="3" />
                        <circle cx="150" cy="84" r="3.5" />
                        <circle cx="162" cy="92" r="3" />
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {/* Flavor selector switcher buttons */}
              <div className="pt-2">
                <div className="text-[11px] font-medium text-[#8C7662] mb-2 flex items-center justify-between">
                  <span>{lang === 'hi' ? 'फ़्लेवर बदलें (क्लिक करें):' : 'Switch live scoop:'}</span>
                  <span className="text-[#C2410C] font-semibold">{currentFlavor.tag}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {featuredFlavors.map((f, idx) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFlavorIndex(idx)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        activeFlavorIndex === idx
                          ? 'border-[#C2410C] bg-[#FFF7ED] ring-2 ring-[#FED7AA]'
                          : 'border-[#E8DFD3] bg-[#FAF7F2] hover:bg-white'
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: f.colors.primary }}
                      />
                      <span className="text-[10px] font-semibold text-[#2C241E] truncate max-w-full">
                        {f.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Footer: Quick Add & Details */}
              <div className="mt-4 pt-4 border-t border-[#F0E6D8] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onQuickAddFlavor(currentFlavor)}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'hi' ? 'बैग में जोड़ें' : 'Add Single Scoop'}</span>
                  <span className="opacity-80">· ₹{currentFlavor.priceSingle}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectFlavor(currentFlavor)}
                  className="py-2.5 px-3 text-xs font-semibold text-[#655343] hover:text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EFE8DC] border border-[#E8DFD3] rounded-lg transition-all cursor-pointer"
                >
                  {lang === 'hi' ? 'विवरण' : 'Details'}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
