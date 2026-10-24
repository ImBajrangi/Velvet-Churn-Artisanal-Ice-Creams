import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Flavor, CartItem } from '../types/icecream';

interface FlavorDetailModalProps {
  flavor: Flavor | null;
  onClose: () => void;
  lang: 'en' | 'hi';
  onAddToCart: (item: CartItem) => void;
}

export const FlavorDetailModal: React.FC<FlavorDetailModalProps> = ({
  flavor,
  onClose,
  lang,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<'single' | 'double' | 'tub'>('single');
  const [added, setAdded] = useState<boolean>(false);

  if (!flavor) return null;

  const currentPrice =
    selectedSize === 'double'
      ? flavor.priceDouble
      : selectedSize === 'tub'
      ? flavor.priceTub
      : flavor.priceSingle;

  const handleAdd = () => {
    const label =
      selectedSize === 'double'
        ? 'Double Scoop'
        : selectedSize === 'tub'
        ? '500ml Party Tub'
        : 'Single Scoop';

    const item: CartItem = {
      id: `${flavor.id}-${selectedSize}`,
      itemType: 'flavor',
      title: flavor.name,
      titleHi: flavor.nameHi,
      variantLabel: label,
      price: currentPrice,
      quantity: 1,
      details: flavor.tag,
      color: flavor.colors.primary,
    };

    onAddToCart(item);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E8DFD3] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#2C241E] flex items-center justify-center shadow-xs cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header Banner with Scoop Preview */}
        <div
          className="relative p-6 sm:p-8 flex items-center justify-center"
          style={{ backgroundColor: flavor.colors.bgLight }}
        >
          <div
            className="w-36 h-36 rounded-full shadow-2xl relative flex items-center justify-center transition-transform hover:scale-105"
            style={{
              background: `radial-gradient(circle at 35% 30%, #FFFFFF 0%, ${flavor.colors.primary} 45%, ${flavor.colors.secondary} 100%)`,
            }}
          >
            <div
              className="absolute inset-2 rounded-full opacity-40 mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at 65% 70%, transparent 40%, ${flavor.colors.secondary} 100%)`,
              }}
            />
            <span className="text-3xl">🍨</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                {lang === 'hi' ? flavor.tagHi : flavor.tag}
              </span>
              <span className="text-xs font-mono text-[#8C7662]">
                {flavor.calories} kcal / scoop
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] mt-1">
              {lang === 'hi' ? flavor.nameHi : flavor.name}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#655343] leading-relaxed">
              {lang === 'hi' ? flavor.descriptionHi : flavor.description}
            </p>
          </div>

          {/* Sourcing Origin */}
          <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD3] flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
            <div className="text-xs text-[#655343]">
              <span className="font-bold text-[#2C241E] block">
                {lang === 'hi' ? 'सामग्री का स्रोत:' : 'Origin & Sourcing:'}
              </span>
              <span>{flavor.sourcing}</span>
            </div>
          </div>

          {/* Pure Ingredients Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C241E] mb-2">
              {lang === 'hi' ? 'शुद्ध सामग्री:' : 'Pure Ingredients:'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(lang === 'hi' ? flavor.ingredientsHi : flavor.ingredients).map((ing, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs bg-[#FAF7F2] border border-[#E8DFD3] rounded-lg text-[#655343]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Sensory Texture Profile */}
          <div className="border-t border-[#F0E6D8] pt-4">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
                <div className="text-[#8C7662] text-[10px] uppercase font-bold">
                  {lang === 'hi' ? 'मिठास' : 'Sweetness'}
                </div>
                <div className="font-serif text-base font-bold text-[#2C241E]">
                  {flavor.flavorProfile.sweetness} / 5
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
                <div className="text-[#8C7662] text-[10px] uppercase font-bold">
                  {lang === 'hi' ? 'मलाईदार' : 'Creaminess'}
                </div>
                <div className="font-serif text-base font-bold text-[#2C241E]">
                  {flavor.flavorProfile.creaminess} / 5
                </div>
              </div>
              <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3]">
                <div className="text-[#8C7662] text-[10px] uppercase font-bold">
                  {lang === 'hi' ? 'समृद्धता' : 'Richness'}
                </div>
                <div className="font-serif text-base font-bold text-[#2C241E]">
                  {flavor.flavorProfile.richness} / 5
                </div>
              </div>
            </div>
          </div>

          {/* Size Choice & Order Row */}
          <div className="border-t border-[#F0E6D8] pt-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setSelectedSize('single')}
                className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSize === 'single'
                    ? 'border-[#C2410C] bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FED7AA]'
                    : 'border-[#E8DFD3] bg-[#FAF7F2] text-[#655343]'
                }`}
              >
                Single (₹{flavor.priceSingle})
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize('double')}
                className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSize === 'double'
                    ? 'border-[#C2410C] bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FED7AA]'
                    : 'border-[#E8DFD3] bg-[#FAF7F2] text-[#655343]'
                }`}
              >
                Double (₹{flavor.priceDouble})
              </button>
              <button
                type="button"
                onClick={() => setSelectedSize('tub')}
                className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSize === 'tub'
                    ? 'border-[#C2410C] bg-[#FFF7ED] text-[#C2410C] ring-1 ring-[#FED7AA]'
                    : 'border-[#E8DFD3] bg-[#FAF7F2] text-[#655343]'
                }`}
              >
                500ml Tub (₹{flavor.priceTub})
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#C2410C] hover:bg-[#9A3412] text-white shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'बैग में जोड़ा गया!' : 'Added to Bag!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {lang === 'hi' ? 'बैग में जोड़ें' : 'Add to Bag'} · ₹{currentPrice}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
