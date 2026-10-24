import React, { useState, useEffect } from 'react';
import { Check, Clock, Bike, PackageCheck, Copy, Phone, ExternalLink, Snowflake } from 'lucide-react';

interface OrderConfirmationModalProps {
  orderDetails: any;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderDetails,
  onClose,
  lang,
}) => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [countdownMinutes, setCountdownMinutes] = useState<number>(28);

  // Simulate progress through delivery stages
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStage(2), 5000);
    const timer2 = setTimeout(() => setCurrentStage(3), 12000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!orderDetails) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(
      `Velvet & Churn Order #${orderDetails.orderId} - Total ₹${orderDetails.grandTotal}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFD3] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Success Icon */}
        <div className="text-center pb-4 border-b border-[#F0E6D8]">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {lang === 'hi' ? 'आर्डर कन्फर्म हो चुका है!' : 'Order Placed & Dispatched!'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C241E] mt-1">
            {lang === 'hi' ? 'ताज़ा आइसक्रीम तैयार हो रही है' : 'Fresh Scoops on the Way'}
          </h3>
          <p className="text-xs text-[#8C7662] mt-1">
            Order #{orderDetails.orderId} · {orderDetails.timestamp}
          </p>
        </div>

        {/* Live Delivery Tracker Stages */}
        <div className="my-6 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD3]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#2C241E] mb-4">
            <span className="flex items-center gap-1.5 text-[#C2410C]">
              <Clock className="w-4 h-4 animate-spin text-[#C2410C]" />
              <span>
                {lang === 'hi'
                  ? `अनुमानित समय: ~${countdownMinutes} मिनट`
                  : `Estimated Arrival: ~${countdownMinutes} mins`}
              </span>
            </span>
            <span className="text-[11px] font-mono text-[#8C7662]">Live Cold-Chain</span>
          </div>

          {/* Stepper Pipeline */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DFD3]">
            
            {/* Stage 1 */}
            <div className="relative">
              <span className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <div className="text-xs font-bold text-[#2C241E]">
                {lang === 'hi' ? 'आर्डर प्राप्त हुआ' : 'Order Received & Verified'}
              </div>
              <div className="text-[11px] text-[#8C7662]">
                Kitchen printer ticket dispatched to Scoop Master
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative">
              <span
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStage >= 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-500 text-white animate-pulse'
                }`}
              >
                {currentStage >= 2 ? '✓' : '2'}
              </span>
              <div className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                <span>{lang === 'hi' ? 'ड्राई-आइस बॉक्स में पैक किया जा रहा है' : 'Packed with Sub-Zero Dry Ice'}</span>
                <Snowflake className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div className="text-[11px] text-[#8C7662]">
                -78°C thermal insulation sealed to guarantee zero melt
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative">
              <span
                className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  currentStage >= 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-300 text-slate-700'
                }`}
              >
                {currentStage >= 3 ? '✓' : '3'}
              </span>
              <div className="text-xs font-bold text-[#2C241E] flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>{lang === 'hi' ? 'राइडर रास्ते में है' : 'Out for Express Delivery'}</span>
              </div>
              <div className="text-[11px] text-[#8C7662]">
                Rider: Ramesh Kumar (+91 98210 55431) with thermal bag
              </div>
            </div>

          </div>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-2.5 text-xs text-[#655343] mb-6">
          <div className="font-bold text-[#2C241E] uppercase tracking-wider text-[11px] mb-1">
            {lang === 'hi' ? 'आर्डर विवरण:' : 'Receipt Breakdown:'}
          </div>

          <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 border-b border-[#F0E6D8] pb-3">
            {orderDetails.items.map((it: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span>
                  {it.quantity}x {it.title} ({it.variantLabel})
                </span>
                <span className="font-semibold text-[#2C241E] tabular-nums">
                  ₹{it.price * it.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-1">
            <span>{lang === 'hi' ? 'डिलीवरी पता:' : 'Deliver to:'}</span>
            <span className="font-medium text-[#2C241E] text-right max-w-[240px] truncate">
              {orderDetails.deliveryAddress}
            </span>
          </div>

          <div className="flex justify-between">
            <span>{lang === 'hi' ? 'भुगतान विधि:' : 'Payment:'}</span>
            <span className="font-semibold uppercase">{orderDetails.paymentMethod}</span>
          </div>

          <div className="flex justify-between text-sm font-bold text-[#2C241E] pt-2 border-t border-[#F0E6D8]">
            <span>{lang === 'hi' ? 'कुल राशि:' : 'Grand Total:'}</span>
            <span className="font-serif text-lg text-[#C2410C] tabular-nums">
              ₹{orderDetails.grandTotal}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2.5 px-4 rounded-xl border border-[#D8CBBF] bg-[#FAF7F2] hover:bg-[#EFE8DC] text-xs font-semibold text-[#2C241E] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-4 h-4 text-[#8C7662]" />
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Order ID & Details'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#2C241E] hover:bg-black text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            {lang === 'hi' ? 'आइसक्रीम मेन्यू पर वापस जाएं' : 'Back to Storefront'}
          </button>
        </div>

      </div>
    </div>
  );
};
