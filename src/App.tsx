import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SundaeBuilder } from './components/SundaeBuilder';
import { FlavorMenu } from './components/FlavorMenu';
import { TasteQuiz } from './components/TasteQuiz';
import { CraftStory } from './components/CraftStory';
import { ParlorExperience } from './components/ParlorExperience';
import { FlavorDetailModal } from './components/FlavorDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { Footer } from './components/Footer';
import { FLAVORS } from './data/iceCreamData';
import { CartItem, Flavor } from './types/icecream';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // Application State
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial delightful sample in cart to invite interaction
    {
      id: 'alphonso-mango-gold-single',
      itemType: 'flavor',
      title: 'Ratnagiri Alphonso Gold',
      titleHi: 'रत्नागिरी अलफ़ांसो आम मलाई',
      variantLabel: 'Single Scoop',
      price: 140,
      quantity: 1,
      details: "Chef's Summer Harvest",
      color: '#F59E0B',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedFlavorForModal, setSelectedFlavorForModal] = useState<Flavor | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [recentToast, setRecentToast] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prevItems, newItem];
    });

    setRecentToast(
      lang === 'hi'
        ? `"${newItem.titleHi}" बैग में जोड़ा गया!`
        : `Added "${newItem.title}" to bag!`
    );
    setTimeout(() => setRecentToast(null), 2500);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = (orderDetails: any) => {
    setIsCartOpen(false);
    setConfirmedOrder(orderDetails);
    setCartItems([]); // Cleared upon confirmed order placement
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex flex-col font-sans selection:bg-[#C2410C]/20 selection:text-[#9A3412]">
      
      {/* Top Bar Navigation (Strict 1-row, 3-zone contract) */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'en' ? 'hi' : 'en'))}
        onNavigate={handleScrollTo}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          lang={lang}
          onExploreMenu={() => handleScrollTo('flavors')}
          onOpenSundaeBuilder={() => handleScrollTo('sundae-builder')}
          onSelectFlavor={(flavor) => setSelectedFlavorForModal(flavor)}
          onQuickAddFlavor={(flavor) => {
            handleAddToCart({
              id: `${flavor.id}-single`,
              itemType: 'flavor',
              title: flavor.name,
              titleHi: flavor.nameHi,
              variantLabel: 'Single Scoop',
              price: flavor.priceSingle,
              quantity: 1,
              details: flavor.tag,
              color: flavor.colors.primary,
            });
          }}
        />

        {/* 2. Artisanal Flavors Menu Catalog */}
        <FlavorMenu
          lang={lang}
          onAddToCart={handleAddToCart}
          onOpenFlavorDetail={(flavor) => setSelectedFlavorForModal(flavor)}
        />

        {/* 3. Interactive Custom Sundae & Cone Builder */}
        <SundaeBuilder
          lang={lang}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Taste Matcher / Quiz */}
        <TasteQuiz
          lang={lang}
          onAddToCart={handleAddToCart}
          onViewFlavor={(flavor) => setSelectedFlavorForModal(flavor)}
        />

        {/* 5. Craft Story & Pillars */}
        <CraftStory lang={lang} />

        {/* 6. Parlour Experience & Store Locations */}
        <ParlorExperience lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleScrollTo} />

      {/* Flavor Detail Modal */}
      {selectedFlavorForModal && (
        <FlavorDetailModal
          flavor={selectedFlavorForModal}
          onClose={() => setSelectedFlavorForModal(null)}
          lang={lang}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
        lang={lang}
      />

      {/* Order Confirmation & Cold-Chain Tracker Modal */}
      {confirmedOrder && (
        <OrderConfirmationModal
          orderDetails={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
          lang={lang}
        />
      )}

      {/* Floating Add Notification Toast */}
      {recentToast && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-40 bg-[#2C241E] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/10 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="text-sm">🍨</span>
          <span>{recentToast}</span>
        </div>
      )}

      {/* Mobile Sticky Floating Cart Bar (within 15% mobile sticky height cap) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/90 backdrop-blur-md border-t border-[#E8DFD3] md:hidden shadow-lg">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div>
              <span className="text-[11px] text-[#8C7662] block">
                {totalCartCount} {lang === 'hi' ? 'स्कूप्स बैग में' : 'items in bag'}
              </span>
              <span className="font-serif text-base font-bold text-[#2C241E] tabular-nums">
                ₹{totalCartPrice}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="py-2 px-4 rounded-xl bg-[#C2410C] text-white text-xs font-semibold flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>{lang === 'hi' ? 'बैग देखें' : 'View Bag'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
