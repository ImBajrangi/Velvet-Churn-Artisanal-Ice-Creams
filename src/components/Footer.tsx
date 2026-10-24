import React, { useState } from 'react';
import { Sparkles, Check, Heart, Mail } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'hi';
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 2500);
  };

  return (
    <footer className="bg-[#2C241E] text-[#D8CBBF] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#3E342B]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3E342B]">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍨</span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Velvet &amp; Churn
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A89887] leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'हाथ से चर्न की गई कारीगरी आइसक्रीम और जिलेटो। 100% शुद्ध देशी A2 मलाई, असली फल और -78°C ड्राई-आइस डिलीवरी।'
                : 'Artisanal micro-batch creamery dedicated to pure dairy, hand-peeled seasonal fruits, and sub-zero cold delivery across India.'}
            </p>
            <div className="text-xs text-[#8C7662]">
              FSSAI Lic. No. 11522003000491 · 100% Pure Vegetarian
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'hi' ? 'नेविगेशन' : 'Parlour Navigation'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('flavors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? '10 ताज़ा फ़्लेवर्स मेन्यू' : 'Daily 10 Flavors'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sundae-builder')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'कस्टम संडे बिल्डर' : 'Interactive Sundae Studio'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('taste-quiz')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'टेस्ट मैच क्विज़' : 'Taste Quiz'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('craft-story')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'हमारी चर्निंग कहानी' : 'Our Craft & Philosophy'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('parlors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'hi' ? 'पार्लर लोकेशन व समय' : 'Parlour Locations'}
                </button>
              </li>
            </ul>
          </div>

          {/* Secret Churn Club Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'hi' ? 'गुप्त चर्न क्लब (Secret Churn Club)' : 'Secret Churn Club'}
            </div>
            <p className="text-xs text-[#A89887]">
              {lang === 'hi'
                ? 'हर महीने नए मौसमी फ़्लेवर और सीमित संस्करण के लिए सब्सक्राइब करें।'
                : 'Get notified first when rare seasonal harvests (Hapus, Litchi, Sitaphal) are churned.'}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#3E342B] border border-[#524539] text-white placeholder-[#8C7662] focus:outline-none focus:border-[#C2410C]"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold bg-[#C2410C] hover:bg-[#9A3412] text-white rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                {subscribed ? 'Joined!' : 'Join'}
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 font-semibold block">
                Welcome to the Secret Churn Club!
              </span>
            )}
          </div>

        </div>

        {/* Bottom Bar: Clean copyright and unboxed details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7662] gap-4">
          <div>
            © {new Date().getFullYear()} Velvet &amp; Churn Creamery Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Allergen Transparency</span>
            <span aria-hidden="true">·</span>
            <span>Cold-Chain Assurance</span>
            <span aria-hidden="true">·</span>
            <span>Zero Synthetic Flavours</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
