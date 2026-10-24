import React, { useState } from 'react';
import { Sparkles, Check, Plus, Minus, RotateCcw, ShoppingBag, Flame, DollarSign } from 'lucide-react';
import { SUNDAE_BASES, SUNDAE_TOPPINGS, SUNDAE_SAUCES, FLAVORS } from '../data/iceCreamData';
import { SundaeBase, SundaeTopping, SundaeSauce, Flavor, CartItem } from '../types/icecream';

interface SundaeBuilderProps {
  lang: 'en' | 'hi';
  onAddToCart: (item: CartItem) => void;
}

export const SundaeBuilder: React.FC<SundaeBuilderProps> = ({ lang, onAddToCart }) => {
  // Builder state
  const [selectedBase, setSelectedBase] = useState<SundaeBase>(SUNDAE_BASES[0]);
  const [selectedScoops, setSelectedScoops] = useState<Flavor[]>([FLAVORS[0], FLAVORS[1]]); // Default 2 scoops (Mango + Pistachio)
  const [selectedToppings, setSelectedToppings] = useState<SundaeTopping[]>([SUNDAE_TOPPINGS[0], SUNDAE_TOPPINGS[1]]); // Pistachio dust + Chocolate pearls
  const [selectedSauce, setSelectedSauce] = useState<SundaeSauce | null>(SUNDAE_SAUCES[1]); // Salted Caramel
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Calculations
  const basePrice = selectedBase.price;
  const scoopsPrice = selectedScoops.length * 120; // flat discounted rate per custom scoop
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const saucePrice = selectedSauce ? selectedSauce.price : 0;
  const totalPrice = basePrice + scoopsPrice + toppingsPrice + saucePrice;

  const totalCalories =
    selectedBase.calories +
    selectedScoops.reduce((sum, s) => sum + s.calories, 0) +
    selectedToppings.reduce((sum, t) => sum + t.calories, 0) +
    (selectedSauce ? selectedSauce.calories : 0);

  // Scoop management
  const addScoop = (flavor: Flavor) => {
    if (selectedScoops.length < 3) {
      setSelectedScoops([...selectedScoops, flavor]);
    }
  };

  const removeScoop = (index: number) => {
    if (selectedScoops.length > 1) {
      setSelectedScoops(selectedScoops.filter((_, i) => i !== index));
    }
  };

  const toggleTopping = (topping: SundaeTopping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleReset = () => {
    setSelectedBase(SUNDAE_BASES[0]);
    setSelectedScoops([FLAVORS[0]]);
    setSelectedToppings([]);
    setSelectedSauce(null);
  };

  const handleAddCustomSundae = () => {
    const scoopNames = selectedScoops.map((s) => (lang === 'hi' ? s.nameHi : s.name)).join(' + ');
    const toppingNames = selectedToppings.map((t) => (lang === 'hi' ? t.nameHi : t.name)).join(', ');
    const sauceName = selectedSauce ? (lang === 'hi' ? selectedSauce.nameHi : selectedSauce.name) : 'No Sauce';

    const customItem: CartItem = {
      id: `custom-sundae-${Date.now()}`,
      itemType: 'custom_sundae',
      title: `${selectedScoops.length}-Scoop Artisan Sundae`,
      titleHi: `${selectedScoops.length}-स्कूप कस्टम संडे`,
      variantLabel: `${selectedBase.name}`,
      price: totalPrice,
      quantity: 1,
      details: `Scoops: ${scoopNames} | Toppings: ${toppingNames || 'None'} | Drizzle: ${sauceName}`,
      color: selectedScoops[0]?.colors.primary || '#F59E0B',
    };

    onAddToCart(customItem);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <section id="sundae-builder" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD3] bg-[#F7F2EA]/60">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C2410C] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'hi' ? 'इंटरैक्टिव संडे क्राफ़्टिंग' : 'Interactive Craft Studio'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] tracking-tight">
            {lang === 'hi' ? 'अपना ड्रीम संडे खुद बनाएं' : 'Build Your Dream Sundae'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#655343] leading-relaxed">
            {lang === 'hi'
              ? 'अपना मनपसंद कोन या बाउल चुनें, 1 से 3 ताज़ा स्कूप्स मिलाएं, रोस्टेड टॉपिंग्स और वॉर्म सॉस की परत जोड़ें।'
              : 'Mix and match hand-churned scoops, artisanal vessels, gourmet toppings, and warm glazes in our real-time interactive canvas.'}
          </p>
        </div>

        {/* Builder Studio Grid: Left Canvas, Right Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Visual Canvas & Order Summary (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD3] shadow-lg">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E6D8]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8C7662]">
                  {lang === 'hi' ? 'लाइव विज़ुअलाइज़र' : 'Live Canvas'}
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-[#8C7662] hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'रीसेट' : 'Reset'}</span>
                </button>
              </div>

              {/* Dynamic SVG Visualizer Rendering the Vessel, Scoops, Toppings & Sauce */}
              <div className="relative h-72 sm:h-80 my-2 flex items-center justify-center select-none">
                <svg viewBox="0 0 320 340" className="w-full h-full">
                  <defs>
                    {/* Waffle gradient */}
                    <linearGradient id="coneWaffle" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5A663" />
                      <stop offset="100%" stopColor="#9C5212" />
                    </linearGradient>
                    {/* Charcoal cone gradient */}
                    <linearGradient id="charcoalWaffle" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4A4A4A" />
                      <stop offset="100%" stopColor="#1C1917" />
                    </linearGradient>
                    {/* Brioche bun */}
                    <linearGradient id="briocheGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F6C87C" />
                      <stop offset="100%" stopColor="#C47D2B" />
                    </linearGradient>
                    {/* Glass coupe */}
                    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#2C241E" floodOpacity="0.16" />
                    </filter>
                  </defs>

                  {/* Surface Shadow */}
                  <ellipse cx="160" cy="315" rx="65" ry="10" fill="#2C241E" fillOpacity="0.1" />

                  {/* 1. VESSEL RENDERING */}
                  {selectedBase.id === 'waffle-cone' && (
                    <g>
                      <polygon points="110,185 210,185 160,310" fill="url(#coneWaffle)" filter="url(#shadowFilter)" />
                      <line x1="125" y1="185" x2="170" y2="300" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.5" />
                      <line x1="145" y1="185" x2="180" y2="260" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.5" />
                      <line x1="175" y1="185" x2="150" y2="260" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.5" />
                      <line x1="195" y1="185" x2="150" y2="300" stroke="#78350F" strokeWidth="1.2" strokeOpacity="0.5" />
                      <ellipse cx="160" cy="185" rx="50" ry="10" fill="#B45309" />
                    </g>
                  )}

                  {selectedBase.id === 'charcoal-cone' && (
                    <g>
                      <polygon points="110,185 210,185 160,310" fill="url(#charcoalWaffle)" filter="url(#shadowFilter)" />
                      <line x1="125" y1="185" x2="170" y2="300" stroke="#111" strokeWidth="1.2" strokeOpacity="0.8" />
                      <line x1="175" y1="185" x2="150" y2="300" stroke="#111" strokeWidth="1.2" strokeOpacity="0.8" />
                      <ellipse cx="160" cy="185" rx="50" ry="10" fill="#262626" />
                    </g>
                  )}

                  {selectedBase.id === 'glazed-brioche' && (
                    <g>
                      {/* Brioche bottom bun */}
                      <path
                        d="M 90 220 Q 160 255 230 220 Q 230 260 160 280 Q 90 260 90 220 Z"
                        fill="url(#briocheGrad)"
                        filter="url(#shadowFilter)"
                      />
                      <ellipse cx="160" cy="225" rx="68" ry="14" fill="#A16207" />
                    </g>
                  )}

                  {selectedBase.id === 'waffle-bowl' && (
                    <g>
                      <path
                        d="M 90 190 Q 160 210 230 190 Q 220 270 160 285 Q 100 270 90 190 Z"
                        fill="url(#coneWaffle)"
                        filter="url(#shadowFilter)"
                      />
                      <ellipse cx="160" cy="190" rx="70" ry="16" fill="#B45309" />
                    </g>
                  )}

                  {selectedBase.id === 'crystal-cup' && (
                    <g>
                      <path
                        d="M 100 180 L 115 260 Q 160 270 205 260 L 220 180 Z"
                        fill="url(#glassGrad)"
                        stroke="#7DD3FC"
                        strokeWidth="1.5"
                        filter="url(#shadowFilter)"
                      />
                      <ellipse cx="160" cy="180" rx="60" ry="12" fill="#E0F2FE" fillOpacity="0.7" />
                      <path d="M 158 265 L 158 295 L 162 295 L 162 265 Z" fill="#BAE6FD" />
                      <ellipse cx="160" cy="298" rx="35" ry="6" fill="#BAE6FD" />
                    </g>
                  )}

                  {/* 2. STACKED SCOOPS RENDERING */}
                  {/* Bottom Scoop (Scoop 0) */}
                  {selectedScoops[0] && (
                    <g>
                      <circle
                        cx="160"
                        cy={selectedScoops.length === 1 ? 140 : selectedScoops.length === 2 ? 155 : 170}
                        r={selectedScoops.length === 1 ? 50 : 44}
                        fill={selectedScoops[0].colors.primary}
                        filter="url(#shadowFilter)"
                      />
                      <path
                        d={
                          selectedScoops.length === 1
                            ? 'M 120 155 Q 160 172 200 155 Q 190 135 160 132 Q 130 135 120 155 Z'
                            : 'M 124 170 Q 160 185 196 170 Q 186 150 160 148 Q 134 150 124 170 Z'
                        }
                        fill={selectedScoops[0].colors.secondary}
                        opacity="0.3"
                      />
                    </g>
                  )}

                  {/* Middle Scoop (Scoop 1) */}
                  {selectedScoops[1] && (
                    <g>
                      <circle
                        cx="160"
                        cy={selectedScoops.length === 2 ? 100 : 120}
                        r={selectedScoops.length === 2 ? 45 : 40}
                        fill={selectedScoops[1].colors.primary}
                        filter="url(#shadowFilter)"
                      />
                      <path
                        d="M 125 115 Q 160 128 195 115 Q 185 95 160 92 Q 135 95 125 115 Z"
                        fill={selectedScoops[1].colors.secondary}
                        opacity="0.3"
                      />
                    </g>
                  )}

                  {/* Top Scoop (Scoop 2) */}
                  {selectedScoops[2] && (
                    <g>
                      <circle
                        cx="160"
                        cy="75"
                        r="38"
                        fill={selectedScoops[2].colors.primary}
                        filter="url(#shadowFilter)"
                      />
                      <path
                        d="M 130 88 Q 160 100 190 88 Q 180 70 160 68 Q 140 70 130 88 Z"
                        fill={selectedScoops[2].colors.secondary}
                        opacity="0.3"
                      />
                    </g>
                  )}

                  {/* 3. SAUCE DRIZZLE OVER SCOOPS */}
                  {selectedSauce && (
                    <g opacity="0.88">
                      <path
                        d={
                          selectedScoops.length === 3
                            ? 'M 140 50 Q 155 45 170 50 Q 185 65 175 90 Q 165 115 180 145 Q 155 175 140 190 Q 135 170 148 135 Q 138 95 140 50 Z'
                            : selectedScoops.length === 2
                            ? 'M 135 75 Q 160 70 180 80 Q 190 105 175 130 Q 155 160 170 180 Q 140 170 145 125 Q 130 100 135 75 Z'
                            : 'M 135 110 Q 160 102 185 115 Q 192 140 175 160 Q 150 175 140 160 Q 132 135 135 110 Z'
                        }
                        fill={selectedSauce.color}
                      />
                    </g>
                  )}

                  {/* 4. TOPPINGS SPRINKLES */}
                  {selectedToppings.map((topping, idx) => {
                    const topY =
                      selectedScoops.length === 3 ? 65 : selectedScoops.length === 2 ? 90 : 125;
                    return (
                      <g key={topping.id}>
                        {idx % 2 === 0 ? (
                          <>
                            <circle cx="145" cy={topY - 12} r="3.5" fill={topping.color} />
                            <circle cx="165" cy={topY - 16} r="4" fill={topping.color} />
                            <circle cx="178" cy={topY - 8} r="3" fill={topping.color} />
                            <circle cx="135" cy={topY + 5} r="3" fill={topping.color} />
                            <circle cx="185" cy={topY + 12} r="3.5" fill={topping.color} />
                          </>
                        ) : (
                          <>
                            <rect x="150" y={topY - 18} width="6" height="6" rx="1.5" fill={topping.color} transform="rotate(25 150 72)" />
                            <rect x="170" y={topY - 6} width="6" height="5" rx="1.5" fill={topping.color} transform="rotate(-15 170 84)" />
                            <rect x="140" y={topY + 8} width="5" height="5" rx="1.5" fill={topping.color} transform="rotate(45 140 98)" />
                            <rect x="160" y={topY + 18} width="7" height="4" rx="1.5" fill={topping.color} />
                          </>
                        )}
                      </g>
                    );
                  })}

                  {/* Brioche Top Bun if brioche selected */}
                  {selectedBase.id === 'glazed-brioche' && (
                    <path
                      d="M 95 105 Q 160 55 225 105 Q 220 125 160 120 Q 100 125 95 105 Z"
                      fill="url(#briocheGrad)"
                      filter="url(#shadowFilter)"
                    />
                  )}
                </svg>
              </div>

              {/* Price & Nutritional Stat Bar */}
              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFD3] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C7662]">
                  <span>{lang === 'hi' ? 'स्कूप्स संख्या:' : 'Scoops Selected:'}</span>
                  <span className="font-semibold text-[#2C241E]">{selectedScoops.length} of 3</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#8C7662]">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>{lang === 'hi' ? 'अनुमानित कैलोरी:' : 'Estimated Calories:'}</span>
                  </span>
                  <span className="font-semibold text-[#2C241E] tabular-nums">{totalCalories} kcal</span>
                </div>
                <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8C7662] block">
                      {lang === 'hi' ? 'कुल राशि' : 'Total Sundae Price'}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#C2410C] tabular-nums">
                      ₹{totalPrice}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCustomSundae}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer ${
                      addedAnimation
                        ? 'bg-emerald-600'
                        : 'bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 shadow-md'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'hi' ? 'बैग में जोड़ा गया!' : 'Added to Bag!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{lang === 'hi' ? 'बैग में जोड़ें' : 'Add to Bag'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Step-by-Step Customization Controls */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1: Vessel Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                    {lang === 'hi' ? 'चरण 1' : 'Step 1'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                    {lang === 'hi' ? 'अपना बेस / वेसल चुनें' : 'Choose Your Vessel'}
                  </h3>
                </div>
                <span className="text-xs text-[#8C7662]">
                  {selectedBase.price === 0 ? 'Free' : `+₹${selectedBase.price}`}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUNDAE_BASES.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => setSelectedBase(base)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#C2410C] bg-[#FFF7ED] ring-1 ring-[#FED7AA]'
                          : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#2C241E]">
                          {lang === 'hi' ? base.nameHi : base.name}
                        </div>
                        <div className="text-[11px] text-[#8C7662] mt-0.5">
                          {base.calories > 0 ? `${base.calories} kcal` : 'Calorie-Free'}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#C2410C] tabular-nums">
                        {base.price === 0 ? 'Free' : `+₹${base.price}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Scoop Flavor Selection (1 to 3 Scoops) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                    {lang === 'hi' ? 'चरण 2' : 'Step 2'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                    {lang === 'hi' ? 'स्कूप्स चुनें (1 से 3 स्कूप)' : 'Pick Your Scoops (1 to 3)'}
                  </h3>
                </div>
                <span className="text-xs font-medium text-[#655343] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8DFD3]">
                  {selectedScoops.length} / 3 {lang === 'hi' ? 'चुने गए' : 'Selected'}
                </span>
              </div>

              {/* Selected Scoops Tray */}
              <div className="mb-4 p-3 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD3] flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#8C7662] font-medium mr-1">
                  {lang === 'hi' ? 'चुने हुए स्कूप्स:' : 'Current stack:'}
                </span>
                {selectedScoops.map((sc, idx) => (
                  <div
                    key={`${sc.id}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E8DFD3] text-xs font-semibold text-[#2C241E] shadow-2xs"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: sc.colors.primary }}
                    />
                    <span>{lang === 'hi' ? sc.nameHi.split(' ')[0] : sc.name.split(' ')[0]}</span>
                    {selectedScoops.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeScoop(idx)}
                        className="text-[#8C7662] hover:text-red-600 ml-1 cursor-pointer"
                        title="Remove scoop"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Flavor Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {FLAVORS.map((flavor) => {
                  const countInStack = selectedScoops.filter((s) => s.id === flavor.id).length;
                  return (
                    <button
                      key={flavor.id}
                      type="button"
                      onClick={() => addScoop(flavor)}
                      disabled={selectedScoops.length >= 3 && countInStack === 0}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        countInStack > 0
                          ? 'border-[#C2410C] bg-[#FFF7ED]'
                          : selectedScoops.length >= 3
                          ? 'opacity-50 border-[#E8DFD3] bg-[#FAF7F2] cursor-not-allowed'
                          : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10"
                          style={{ backgroundColor: flavor.colors.primary }}
                        />
                        {countInStack > 0 && (
                          <span className="text-[10px] font-bold bg-[#C2410C] text-white px-1.5 py-0.2 rounded-full">
                            x{countInStack}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-[#2C241E] line-clamp-1">
                        {lang === 'hi' ? flavor.nameHi : flavor.name}
                      </div>
                      <div className="text-[10px] text-[#8C7662] mt-1 font-mono">
                        {flavor.calories} kcal
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Gourmet Toppings (Multiselect) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                    {lang === 'hi' ? 'चरण 3' : 'Step 3'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                    {lang === 'hi' ? 'गॉरमे टॉपिंग्स जोड़ें' : 'Gourmet Toppings (Optional)'}
                  </h3>
                </div>
                <span className="text-xs text-[#8C7662]">
                  {selectedToppings.length} {lang === 'hi' ? 'चुने' : 'selected'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUNDAE_TOPPINGS.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#C2410C] bg-[#FFF7ED] ring-1 ring-[#FED7AA]'
                          : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: topping.color }}
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#2C241E]">
                            {lang === 'hi' ? topping.nameHi : topping.name}
                          </div>
                          <div className="text-[10px] text-[#8C7662]">
                            +{topping.calories} kcal
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#C2410C] tabular-nums">
                        +₹{topping.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Drizzle / Sauce */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                    {lang === 'hi' ? 'चरण 4' : 'Step 4'}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                    {lang === 'hi' ? 'सॉस ड्रिजल चुनें' : 'Artisanal Sauce Drizzle'}
                  </h3>
                </div>
                {selectedSauce && (
                  <button
                    type="button"
                    onClick={() => setSelectedSauce(null)}
                    className="text-xs text-[#8C7662] hover:text-[#C2410C] underline cursor-pointer"
                  >
                    {lang === 'hi' ? 'कोई सॉस नहीं' : 'Remove Sauce'}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUNDAE_SAUCES.map((sauce) => {
                  const isSelected = selectedSauce?.id === sauce.id;
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => setSelectedSauce(sauce)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#C2410C] bg-[#FFF7ED] ring-1 ring-[#FED7AA]'
                          : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: sauce.color }}
                        />
                        <div>
                          <div className="text-xs font-semibold text-[#2C241E]">
                            {lang === 'hi' ? sauce.nameHi : sauce.name}
                          </div>
                          <div className="text-[10px] text-[#8C7662]">
                            +{sauce.calories} kcal
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#C2410C] tabular-nums">
                        +₹{sauce.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
