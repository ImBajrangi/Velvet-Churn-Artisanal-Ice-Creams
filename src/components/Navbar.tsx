import React from 'react';
import { ShoppingBag, Sparkles, MapPin, Clock } from 'lucide-react';
import { CartItem } from '../types/icecream';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  lang,
  onToggleLang,
  onNavigate,
}) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD3] transition-all">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <span className="text-2xl text-[#C2410C] transition-transform group-hover:rotate-12 duration-300">
            🍨
          </span>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C241E] group-hover:text-[#C2410C] transition-colors">
              Velvet &amp; Churn
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-[#8C7662] font-medium -mt-1">
              {lang === 'hi' ? 'मलाई & स्कूप क्रिमरी' : 'Artisanal Creamery'}
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#655343]">
          <button
            onClick={() => onNavigate('flavors')}
            className="hover:text-[#C2410C] transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'फ़्लेवर्स मेन्यू' : 'Flavors Menu'}
          </button>
          <button
            onClick={() => onNavigate('sundae-builder')}
            className="flex items-center gap-1.5 hover:text-[#C2410C] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>{lang === 'hi' ? 'संडे बिल्डर' : 'Sundae Builder'}</span>
          </button>
          <button
            onClick={() => onNavigate('taste-quiz')}
            className="hover:text-[#C2410C] transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'टेस्ट क्विज़' : 'Taste Matcher'}
          </button>
          <button
            onClick={() => onNavigate('craft-story')}
            className="hover:text-[#C2410C] transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'हमारी कहानी' : 'Our Craft'}
          </button>
          <button
            onClick={() => onNavigate('parlors')}
            className="hover:text-[#C2410C] transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'पार्लर लोकेशन' : 'Parlours'}
          </button>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Late-night parlour indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFE8DC] text-[#655343] text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium">{lang === 'hi' ? 'खुला है: 1:30 AM तक' : 'Open till 1:30 AM'}</span>
          </div>

          {/* Language Toggle Button */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-2.5 py-1 text-xs font-semibold text-[#655343] hover:text-[#C2410C] border border-[#D8CBBF] rounded-lg bg-white/70 hover:bg-white transition-all cursor-pointer"
            title="Switch Language"
          >
            {lang === 'hi' ? 'English' : 'हिंदी'}
          </button>

          {/* Cart Trigger Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">
              {lang === 'hi' ? 'बैग' : 'Bag'}
            </span>
            {totalItems > 0 && (
              <span className="flex items-center gap-1">
                <span className="bg-white text-[#C2410C] px-1.5 py-0.2 rounded-full text-xs font-bold tabular-nums">
                  {totalItems}
                </span>
                <span className="hidden md:inline text-xs font-medium opacity-90 tabular-nums">
                  · ₹{totalPrice}
                </span>
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
