import React, { useState } from 'react';
import { Search, Filter, Plus, Check, Info, Sparkles, Leaf, Eye } from 'lucide-react';
import { FLAVORS } from '../data/iceCreamData';
import { Flavor, CartItem, CategoryType } from '../types/icecream';

interface FlavorMenuProps {
  lang: 'en' | 'hi';
  onAddToCart: (item: CartItem) => void;
  onOpenFlavorDetail: (flavor: Flavor) => void;
}

export const FlavorMenu: React.FC<FlavorMenuProps> = ({
  lang,
  onAddToCart,
  onOpenFlavorDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegan' | 'nut_free' | 'gluten_free'>('all');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, 'single' | 'double' | 'tub'>>({});
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // Filter logic
  const filteredFlavors = FLAVORS.filter((flavor) => {
    // Category match
    if (selectedCategory !== 'all' && flavor.category !== selectedCategory) {
      return false;
    }
    // Dietary match
    if (dietaryFilter === 'vegan' && !flavor.dietary.isVegan) return false;
    if (dietaryFilter === 'nut_free' && !flavor.dietary.isNutFree) return false;
    if (dietaryFilter === 'gluten_free' && !flavor.dietary.isGlutenFree) return false;

    // Search query match (in English or Hindi)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = flavor.name.toLowerCase().includes(q) || flavor.nameHi.toLowerCase().includes(q);
      const matchDesc = flavor.description.toLowerCase().includes(q) || flavor.descriptionHi.toLowerCase().includes(q);
      const matchIng = flavor.ingredients.some((ing) => ing.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchIng) return false;
    }
    return true;
  });

  const getVariant = (flavorId: string) => selectedVariants[flavorId] || 'single';

  const handleVariantChange = (flavorId: string, variant: 'single' | 'double' | 'tub') => {
    setSelectedVariants((prev) => ({ ...prev, [flavorId]: variant }));
  };

  const handleAdd = (flavor: Flavor) => {
    const variant = getVariant(flavor.id);
    let price = flavor.priceSingle;
    let label = 'Single Scoop';
    let labelHi = 'सिंगल स्कूप';

    if (variant === 'double') {
      price = flavor.priceDouble;
      label = 'Double Scoop';
      labelHi = 'डबल स्कूप';
    } else if (variant === 'tub') {
      price = flavor.priceTub;
      label = '500ml Party Tub';
      labelHi = '500ml पार्टी टब';
    }

    const cartItem: CartItem = {
      id: `${flavor.id}-${variant}`,
      itemType: 'flavor',
      title: flavor.name,
      titleHi: flavor.nameHi,
      variantLabel: label,
      price: price,
      quantity: 1,
      details: flavor.tag,
      color: flavor.colors.primary,
    };

    onAddToCart(cartItem);
    setAddedItemKey(`${flavor.id}-${variant}`);
    setTimeout(() => setAddedItemKey(null), 1800);
  };

  return (
    <section id="flavors" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD3]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E8DFD3]">
          <div>
            <div className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider mb-2">
              {lang === 'hi' ? 'दैनिक ताज़ा मेन्यू' : 'Daily Churned Menu'}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] tracking-tight">
              {lang === 'hi' ? 'कारीगरी आइसक्रीम फ़्लेवर्स' : 'Artisanal Flavors'}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#655343] max-w-xl">
              {lang === 'hi'
                ? 'शुद्ध A2 क्रीम, फार्म-फ्रेश फलों और विश्वस्तरीय मसालों से बनी 10 मास्टरपीस आइसक्रीम।'
                : '10 small-batch recipes churned fresh every morning. Free from chemical emulsifiers and artificial essence.'}
            </p>
          </div>

          {/* Quick Dietary Filters */}
          <div className="mt-4 md:mt-0 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'border-[#2C241E] bg-[#2C241E] text-white'
                  : 'border-[#E8DFD3] bg-white text-[#655343] hover:bg-[#FAF7F2]'
              }`}
            >
              {lang === 'hi' ? 'सभी आहार' : 'All Diet'}
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter('vegan')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                dietaryFilter === 'vegan'
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-[#E8DFD3] bg-white text-[#655343] hover:bg-[#FAF7F2]'
              }`}
            >
              🌱 {lang === 'hi' ? 'वीगन' : 'Vegan & Sorbet'}
            </button>
            <button
              type="button"
              onClick={() => setDietaryFilter('nut_free')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                dietaryFilter === 'nut_free'
                  ? 'border-[#C2410C] bg-[#C2410C] text-white'
                  : 'border-[#E8DFD3] bg-white text-[#655343] hover:bg-[#FAF7F2]'
              }`}
            >
              {lang === 'hi' ? 'नट-फ़्री' : 'Nut-Free'}
            </button>
          </div>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#EFE8DC] rounded-xl overflow-x-auto max-w-full w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white text-[#2C241E] shadow-xs'
                  : 'text-[#655343] hover:text-[#2C241E]'
              }`}
            >
              {lang === 'hi' ? 'सभी (10)' : 'All Flavors (10)'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('signature')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'signature'
                  ? 'bg-white text-[#2C241E] shadow-xs'
                  : 'text-[#655343] hover:text-[#2C241E]'
              }`}
            >
              {lang === 'hi' ? 'सिग्नेचर चर्न' : 'Signature Churns'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('desi_fusion')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'desi_fusion'
                  ? 'bg-white text-[#2C241E] shadow-xs'
                  : 'text-[#655343] hover:text-[#2C241E]'
              }`}
            >
              {lang === 'hi' ? 'देसी हेरिटेज' : 'Desi Heritage'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('vegan_sorbet')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'vegan_sorbet'
                  ? 'bg-white text-[#2C241E] shadow-xs'
                  : 'text-[#655343] hover:text-[#2C241E]'
              }`}
            >
              {lang === 'hi' ? 'वीगन सॉर्बे' : 'Vegan Sorbets'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('chocolate')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'chocolate'
                  ? 'bg-white text-[#2C241E] shadow-xs'
                  : 'text-[#655343] hover:text-[#2C241E]'
              }`}
            >
              {lang === 'hi' ? 'डार्क कोको' : 'Rich Cocoa'}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8C7662] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'फ़्लेवर या सामग्री खोजें...' : 'Search flavor or ingredient...'}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-[#D8CBBF] text-[#2C241E] placeholder-[#8C7662] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/30 focus:border-[#C2410C]"
            />
          </div>

        </div>

        {/* Product Cards Grid: 3-column desktop */}
        {filteredFlavors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD3]">
            <p className="text-base font-serif text-[#2C241E]">
              {lang === 'hi' ? 'कोई फ़्लेवर नहीं मिला।' : 'No flavors matched your search.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-3 text-xs font-semibold text-[#C2410C] underline cursor-pointer"
            >
              {lang === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear all filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredFlavors.map((flavor) => {
              const activeVariant = getVariant(flavor.id);
              const isAdded = addedItemKey === `${flavor.id}-${activeVariant}`;
              const activePrice =
                activeVariant === 'double'
                  ? flavor.priceDouble
                  : activeVariant === 'tub'
                  ? flavor.priceTub
                  : flavor.priceSingle;

              return (
                <div
                  key={flavor.id}
                  className="bg-white rounded-3xl border border-[#E8DFD3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                >
                  
                  {/* Visual Header / Realistic Styled Scoop Presentation Canvas */}
                  <div
                    className="relative h-56 sm:h-60 p-6 flex flex-col justify-between overflow-hidden transition-colors"
                    style={{ backgroundColor: flavor.colors.bgLight }}
                  >
                    {/* Top tags (Unboxed metadata with typographic dot) */}
                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C]">
                        {lang === 'hi' ? flavor.tagHi : flavor.tag}
                      </span>
                      {flavor.dietary.isVegan && (
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                          Vegan
                        </span>
                      )}
                    </div>

                    {/* Central Artisanal Scoop Vector Illustration with rich drop shadow & garnish */}
                    <div className="my-auto flex items-center justify-center relative">
                      <div
                        className="w-32 h-32 rounded-full relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 shadow-xl"
                        style={{
                          background: `radial-gradient(circle at 35% 30%, #FFFFFF 0%, ${flavor.colors.primary} 45%, ${flavor.colors.secondary} 100%)`,
                        }}
                      >
                        {/* Scoop Texture Overlay */}
                        <div
                          className="absolute inset-2 rounded-full opacity-40 mix-blend-overlay"
                          style={{
                            background: `radial-gradient(circle at 65% 70%, transparent 40%, ${flavor.colors.secondary} 100%)`,
                          }}
                        />

                        {/* Scoop edge ripple */}
                        <div
                          className="absolute bottom-1 w-24 h-6 rounded-full opacity-35"
                          style={{ backgroundColor: flavor.colors.secondary }}
                        />

                        {/* Distinct Garnish detail per flavor */}
                        {flavor.id === 'alphonso-mango-gold' && (
                          <div className="absolute top-4 left-6 text-xs">🥭</div>
                        )}
                        {flavor.id === 'sicilian-pistachio-cardamom' && (
                          <div className="absolute top-5 right-6 flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#365314]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4D7C0F]" />
                          </div>
                        )}
                        {flavor.id === 'belgian-midnight-truffle' && (
                          <div className="absolute top-5 left-7 flex gap-1">
                            <span className="w-2.5 h-2.5 rounded-sm bg-black rotate-12" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                          </div>
                        )}
                        {flavor.id === 'kesar-rose-falooda-swirl' && (
                          <div className="absolute top-4 right-7 text-xs">🌹</div>
                        )}
                        {flavor.id === 'chikmagalur-filter-coffee' && (
                          <div className="absolute top-4 right-7 text-xs">☕</div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Quick Look Button */}
                    <div className="flex items-center justify-between text-xs text-[#8C7662] relative z-10">
                      <span>{flavor.calories} kcal / scoop</span>
                      <button
                        type="button"
                        onClick={() => onOpenFlavorDetail(flavor)}
                        className="flex items-center gap-1 font-semibold text-[#655343] hover:text-[#C2410C] transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lang === 'hi' ? 'सामग्री देखें' : 'View Story'}</span>
                      </button>
                    </div>

                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                        {lang === 'hi' ? flavor.nameHi : flavor.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-sm text-[#655343] leading-relaxed line-clamp-2">
                        {lang === 'hi' ? flavor.descriptionHi : flavor.description}
                      </p>

                      {/* Flavor Profile Bars (Sweetness, Creaminess, Richness) */}
                      <div className="mt-4 pt-3 border-t border-[#F0E6D8] space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#8C7662]">
                          <span>{lang === 'hi' ? 'मिठास' : 'Sweetness'}</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span
                                key={level}
                                className={`w-2.5 h-1 rounded-sm ${
                                  level <= flavor.flavorProfile.sweetness
                                    ? 'bg-[#C2410C]'
                                    : 'bg-[#E8DFD3]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#8C7662]">
                          <span>{lang === 'hi' ? 'मलाईदार' : 'Creaminess'}</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <span
                                key={level}
                                className={`w-2.5 h-1 rounded-sm ${
                                  level <= flavor.flavorProfile.creaminess
                                    ? 'bg-[#D97706]'
                                    : 'bg-[#E8DFD3]'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Variant Selector: Single Scoop / Double Scoop / 500ml Tub */}
                    <div className="mt-6 pt-4 border-t border-[#E8DFD3]">
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] mb-3">
                        <button
                          type="button"
                          onClick={() => handleVariantChange(flavor.id, 'single')}
                          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer text-center ${
                            activeVariant === 'single'
                              ? 'bg-white text-[#2C241E] shadow-2xs font-bold'
                              : 'text-[#8C7662] hover:text-[#2C241E]'
                          }`}
                        >
                          Single (₹{flavor.priceSingle})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVariantChange(flavor.id, 'double')}
                          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer text-center ${
                            activeVariant === 'double'
                              ? 'bg-white text-[#2C241E] shadow-2xs font-bold'
                              : 'text-[#8C7662] hover:text-[#2C241E]'
                          }`}
                        >
                          Double (₹{flavor.priceDouble})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVariantChange(flavor.id, 'tub')}
                          className={`py-1.5 px-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer text-center ${
                            activeVariant === 'tub'
                              ? 'bg-white text-[#2C241E] shadow-2xs font-bold'
                              : 'text-[#8C7662] hover:text-[#2C241E]'
                          }`}
                        >
                          500ml Tub (₹{flavor.priceTub})
                        </button>
                      </div>

                      {/* Buy Action Button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(flavor)}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 text-white shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{lang === 'hi' ? 'बैग में जोड़ा गया!' : 'Added to Bag!'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>
                              {lang === 'hi' ? 'बैग में जोड़ें' : 'Add to Bag'} · ₹{activePrice}
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
