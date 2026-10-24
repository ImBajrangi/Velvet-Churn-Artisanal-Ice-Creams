import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Snowflake, Sparkles, ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { CartItem } from '../types/icecream';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: (orderDetails: any) => void;
  lang: 'en' | 'hi';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  lang,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup' | 'dinein'>('delivery');
  const [includeDryIce, setIncludeDryIce] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');
  
  // Customer details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Dry ice is free on orders >= 499
  const dryIceFee = includeDryIce ? (subtotal >= 499 ? 0 : 35) : 0;
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 399 ? 0 : 40) : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + dryIceFee + deliveryFee);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'VELVET15') {
      setDiscountPercent(15);
      setPromoSuccess(lang === 'hi' ? '15% छूट लागू हुई!' : '15% Discount Applied!');
    } else if (code === 'FIRSTSCOOP') {
      setDiscountPercent(20);
      setPromoSuccess(lang === 'hi' ? '20% पहली आर्डर छूट!' : '20% First Scoop Discount Applied!');
    } else {
      setPromoError(lang === 'hi' ? 'अमान्य कोड। "VELVET15" आज़माएं' : 'Invalid code. Try "VELVET15"');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (orderType === 'delivery' && (!deliveryAddress.trim() || !customerPhone.trim())) {
      alert(lang === 'hi' ? 'कृपया अपना पता और मोबाइल नंबर दर्ज करें' : 'Please provide address and phone number for delivery');
      return;
    }

    const orderData = {
      orderId: `VC-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      subtotal,
      discountAmount,
      dryIceFee,
      deliveryFee,
      grandTotal,
      orderType,
      customerName: customerName || 'Valued Guest',
      customerPhone: customerPhone || '+91 98765 43210',
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : 'Parlour Pickup Counter',
      paymentMethod,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onCheckout(orderData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E8DFD3] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-[#E8DFD3] flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C241E]">
                {lang === 'hi' ? 'आपका आइसक्रीम बैग' : 'Your Dessert Bag'}
              </h3>
              <span className="text-xs text-[#8C7662]">
                {cartItems.length} {lang === 'hi' ? 'प्रकार के आइटम' : 'item variations'}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#2C241E] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Order Mode Toggle */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#EFE8DC] rounded-xl border border-[#D8CBBF]">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-white text-[#2C241E] shadow-2xs'
                    : 'text-[#655343] hover:text-[#2C241E]'
                }`}
              >
                {lang === 'hi' ? 'डिलीवरी' : 'Delivery'}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  orderType === 'pickup'
                    ? 'bg-white text-[#2C241E] shadow-2xs'
                    : 'text-[#655343] hover:text-[#2C241E]'
                }`}
              >
                {lang === 'hi' ? 'टेकअवे' : 'Pickup'}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dinein')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  orderType === 'dinein'
                    ? 'bg-white text-[#2C241E] shadow-2xs'
                    : 'text-[#655343] hover:text-[#2C241E]'
                }`}
              >
                {lang === 'hi' ? 'डाइन-इन' : 'Dine-In'}
              </button>
            </div>

            {/* Empty State */}
            {cartItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFD3] p-6">
                <span className="text-4xl block mb-3">🍨</span>
                <p className="font-serif text-lg font-bold text-[#2C241E]">
                  {lang === 'hi' ? 'आपका बैग खाली है' : 'Your bag is empty'}
                </p>
                <p className="text-xs text-[#8C7662] mt-1 mb-4">
                  {lang === 'hi'
                    ? 'मेन्यू में से अपने पसंदीदा फ़्लेवर्स चुनें या कस्टम संडे बनाएं।'
                    : 'Select handcrafted scoops or craft a custom sundae to get started.'}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#C2410C] bg-[#FFF7ED] border border-[#FED7AA] rounded-xl hover:bg-[#FED7AA]/30"
                >
                  {lang === 'hi' ? 'फ़्लेवर्स मेन्यू देखें' : 'Browse Flavors'}
                </button>
              </div>
            ) : (
              /* Itemized Cart List */
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-[#E8DFD3] flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {item.color && (
                          <span
                            className="w-3 h-3 rounded-full shrink-0 border border-black/10"
                            style={{ backgroundColor: item.color }}
                          />
                        )}
                        <h4 className="text-xs sm:text-sm font-bold text-[#2C241E] leading-snug">
                          {lang === 'hi' ? item.titleHi : item.title}
                        </h4>
                      </div>

                      <div className="text-[11px] text-[#C2410C] font-medium mt-0.5">
                        {item.variantLabel}
                      </div>

                      {item.details && (
                        <div className="text-[10px] text-[#8C7662] mt-1 leading-tight">
                          {item.details}
                        </div>
                      )}

                      <div className="text-xs font-bold text-[#2C241E] mt-2 tabular-nums">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-lg border border-[#E8DFD3]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-[#655343] hover:bg-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-[#655343] hover:bg-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8C7662] hover:text-red-600 p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Dry Ice Thermal Packaging Option */}
            {cartItems.length > 0 && orderType === 'delivery' && (
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] flex items-start gap-3">
                <Snowflake className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2C241E]">
                      {lang === 'hi' ? 'सब-ज़ीरो ड्राई-आइस बॉक्स' : 'Sub-Zero Dry Ice Box'}
                    </span>
                    <span className="text-xs font-bold text-[#C2410C]">
                      {subtotal >= 499 ? 'FREE' : '+₹35'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#655343] mt-0.5">
                    {lang === 'hi'
                      ? '-78°C ड्राई-आइस से आइसक्रीम 90 मिनट तक बिना पिघले सुरक्षित रहती है।'
                      : 'Guaranteed 90-minute frozen retention with food-grade dry ice blocks.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={includeDryIce}
                  onChange={(e) => setIncludeDryIce(e.target.checked)}
                  className="accent-[#C2410C] mt-1 cursor-pointer w-4 h-4"
                />
              </div>
            )}

            {/* Promo Code Box */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3]">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-3.5 h-3.5 text-[#C2410C]" />
                  <span className="text-xs font-bold text-[#2C241E]">
                    {lang === 'hi' ? 'प्रोमो कोड (कूपन)' : 'Promo Code'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder='Try "VELVET15"'
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#D8CBBF] uppercase font-mono tracking-wider focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-[#2C241E] text-white rounded-xl hover:bg-black transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1.5">{promoSuccess}</p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 font-medium mt-1.5">{promoError}</p>
                )}
              </div>
            )}

            {/* Delivery Details Form */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white rounded-2xl border border-[#E8DFD3] space-y-3">
                <span className="text-xs font-bold text-[#2C241E] block">
                  {lang === 'hi' ? 'ग्राहक व संपर्क जानकारी:' : 'Customer & Delivery Contact:'}
                </span>
                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={lang === 'hi' ? 'आपका नाम' : 'Your Name'}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8CBBF] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={lang === 'hi' ? 'मोबाइल नंबर (डिलीवरी अपडेट)' : 'Phone Number (+91)'}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8CBBF] focus:outline-none"
                  />
                </div>
                {orderType === 'delivery' && (
                  <div>
                    <textarea
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={lang === 'hi' ? 'डिलीवरी का पूरा पता (फ्लैट, बिल्डिंग, लैंडमार्क)' : 'Complete Delivery Address (Flat, Street, Landmark)'}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D8CBBF] focus:outline-none resize-none"
                    />
                  </div>
                )}

                {/* Payment Selection */}
                <div className="pt-2 border-t border-[#F0E6D8]">
                  <span className="text-[11px] font-bold text-[#8C7662] block mb-1.5">
                    {lang === 'hi' ? 'भुगतान माध्यम' : 'Payment Method'}
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2 rounded-lg border text-center font-semibold cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-[#C2410C] bg-[#FFF7ED] text-[#C2410C]'
                          : 'border-[#E8DFD3] text-[#655343]'
                      }`}
                    >
                      UPI / GPay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2 rounded-lg border text-center font-semibold cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-[#C2410C] bg-[#FFF7ED] text-[#C2410C]'
                          : 'border-[#E8DFD3] text-[#655343]'
                      }`}
                    >
                      Cash / COD
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2 rounded-lg border text-center font-semibold cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#C2410C] bg-[#FFF7ED] text-[#C2410C]'
                          : 'border-[#E8DFD3] text-[#655343]'
                      }`}
                    >
                      Card
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Sticky Footer with Price Breakdown & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#E8DFD3] space-y-2.5">
              <div className="space-y-1.5 text-xs text-[#655343]">
                <div className="flex justify-between">
                  <span>{lang === 'hi' ? 'सामग्री उपकुल' : 'Items Subtotal'}</span>
                  <span className="font-semibold text-[#2C241E] tabular-nums">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{lang === 'hi' ? 'कूपन छूट' : 'Discount Promo'}</span>
                    <span className="tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                {includeDryIce && orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{lang === 'hi' ? 'ड्राई-आइस पैकेजिंग' : 'Dry Ice Insulation'}</span>
                    <span className="tabular-nums">{dryIceFee === 0 ? 'FREE' : `₹${dryIceFee}`}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{lang === 'hi' ? 'डिलीवरी शुल्क' : 'Express Delivery'}</span>
                    <span className="tabular-nums">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#2C241E] pt-2 border-t border-[#F0E6D8]">
                  <span>{lang === 'hi' ? 'कुल देय राशि' : 'Total Amount'}</span>
                  <span className="font-serif text-lg text-[#C2410C] tabular-nums">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {lang === 'hi'
                    ? `आर्डर कन्फर्म करें (₹${grandTotal})`
                    : `Confirm & Dispatch Order (₹${grandTotal})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
