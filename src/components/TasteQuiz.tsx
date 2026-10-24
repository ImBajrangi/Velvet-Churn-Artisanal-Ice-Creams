import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { FLAVORS } from '../data/iceCreamData';
import { Flavor, CartItem } from '../types/icecream';

interface TasteQuizProps {
  lang: 'en' | 'hi';
  onAddToCart: (item: CartItem) => void;
  onViewFlavor: (flavor: Flavor) => void;
}

export const TasteQuiz: React.FC<TasteQuizProps> = ({ lang, onAddToCart, onViewFlavor }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [mood, setMood] = useState<string>('indulgent');
  const [texture, setTexture] = useState<string>('rich');
  const [diet, setDiet] = useState<string>('dairy');
  const [recommendedFlavor, setRecommendedFlavor] = useState<Flavor | null>(null);
  const [added, setAdded] = useState<boolean>(false);

  const calculateMatch = () => {
    let match = FLAVORS[0]; // Default Alphonso

    if (diet === 'vegan') {
      match = FLAVORS.find((f) => f.category === 'vegan_sorbet') || FLAVORS[6];
    } else if (mood === 'midnight' || texture === 'dark') {
      match = FLAVORS.find((f) => f.id === 'belgian-midnight-truffle') || FLAVORS[2];
    } else if (mood === 'royal' || texture === 'nutty') {
      match = FLAVORS.find((f) => f.id === 'sicilian-pistachio-cardamom') || FLAVORS[1];
    } else if (mood === 'coffee') {
      match = FLAVORS.find((f) => f.id === 'chikmagalur-filter-coffee') || FLAVORS[7];
    } else if (mood === 'refreshing') {
      match = FLAVORS.find((f) => f.id === 'mahabaleshwar-strawberries-cream') || FLAVORS[8];
    } else if (texture === 'caramel') {
      match = FLAVORS.find((f) => f.id === 'madagascar-salted-caramel') || FLAVORS[5];
    } else {
      match = FLAVORS.find((f) => f.id === 'fresh-sitaphal-cream') || FLAVORS[3];
    }

    setRecommendedFlavor(match);
    setCurrentStep(3); // Result view
  };

  const handleReset = () => {
    setCurrentStep(0);
    setRecommendedFlavor(null);
  };

  const handleAddMatchToCart = () => {
    if (!recommendedFlavor) return;
    const item: CartItem = {
      id: `${recommendedFlavor.id}-single`,
      itemType: 'flavor',
      title: recommendedFlavor.name,
      titleHi: recommendedFlavor.nameHi,
      variantLabel: 'Single Scoop (Quiz Match)',
      price: recommendedFlavor.priceSingle,
      quantity: 1,
      details: 'Taste Matcher Recommendation',
      color: recommendedFlavor.colors.primary,
    };
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="taste-quiz" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD3] bg-[#FAF7F2]">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C2410C] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'hi' ? 'पर्सनल टेस्ट मैच' : 'Personal Taste Matcher'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] tracking-tight">
            {lang === 'hi' ? 'अपना आदर्श स्कूप खोजें' : 'Find Your Perfect Scoop'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#655343]">
            {lang === 'hi'
              ? '3 आसान सवालों के जवाब दें और हमारे मास्टर शेफ़ आपकी पसंद की सबसे बेहतरीन आइसक्रीम सुझाएंगे।'
              : 'Answer 3 quick questions to let our churn master match your mood with your exact culinary companion.'}
          </p>
        </div>

        {/* Quiz Container Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD3] shadow-md">
          
          {/* Progress Indicator */}
          {currentStep < 3 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F0E6D8]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7662]">
                {lang === 'hi' ? `सवाल ${currentStep + 1} / 3` : `Question ${currentStep + 1} of 3`}
              </span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentStep
                        ? 'w-8 bg-[#C2410C]'
                        : i < currentStep
                        ? 'w-4 bg-emerald-600'
                        : 'w-4 bg-[#E8DFD3]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Mood */}
          {currentStep === 0 && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2C241E] mb-2">
                {lang === 'hi' ? '1. आपका आज का मूड कैसा है?' : '1. What is your current craving?'}
              </h3>
              <p className="text-xs text-[#8C7662] mb-6">
                {lang === 'hi' ? 'अपने मूड के अनुसार एक विकल्प चुनें:' : 'Select the vibe that best matches your mood:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { id: 'indulgent', title: 'Late Night Decadence', titleHi: 'गंभीर मीठी तृप्ति', desc: 'Deep cocoa, velvety texture & heavy dessert joy' },
                  { id: 'refreshing', title: 'Sunny Fresh Fruit', titleHi: 'ताज़ा मौसमी फल', desc: 'Vibrant orchard mango, strawberry or sitaphal' },
                  { id: 'royal', title: 'Royal Heritage Classic', titleHi: 'शाही नवाबी कुल्फ़ी', desc: 'Pistachios, saffron, cardamom and nostalgia' },
                  { id: 'coffee', title: 'Afternoon Pick-Me-Up', titleHi: 'एनर्जी बूस्टर कॉफ़ी', desc: 'Bold roasted arabica with buttery toffee notes' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMood(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      mood === item.id
                        ? 'border-[#C2410C] bg-[#FFF7ED] ring-2 ring-[#FED7AA]'
                        : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="text-sm font-bold text-[#2C241E]">
                      {lang === 'hi' ? item.titleHi : item.title}
                    </div>
                    <div className="text-xs text-[#655343] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] rounded-xl cursor-pointer"
                >
                  <span>{lang === 'hi' ? 'अगला सवाल' : 'Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Sweetness & Texture */}
          {currentStep === 1 && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2C241E] mb-2">
                {lang === 'hi' ? '2. मिठास और स्वाद की तीव्रता कैसी पसंद है?' : '2. What flavor profile do you prefer?'}
              </h3>
              <p className="text-xs text-[#8C7662] mb-6">
                {lang === 'hi' ? 'अपनी मनपसंद मिठास चुनें:' : 'Select your sweetness and richness balance:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { id: 'rich', title: 'Ultra Creamy & Sweet', titleHi: 'खूब मलाईदार और मीठा', desc: 'Rich custard texture that slowly melts on the tongue' },
                  { id: 'dark', title: 'Bitter-Sweet & Complex', titleHi: 'डार्क और कम मीठा', desc: '72% dark chocolate or roasted espresso balance' },
                  { id: 'nutty', title: 'Spiced with Nutty Crunch', titleHi: 'पिस्ता-बादाम कतरन', desc: 'Stone ground nut pastes with crunchy roasted pieces' },
                  { id: 'caramel', title: 'Salted Caramel Crunch', titleHi: 'सॉल्टेड कारमेल और टॉफ़ी', desc: 'Buttery caramel with sea salt crystals' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTexture(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      texture === item.id
                        ? 'border-[#C2410C] bg-[#FFF7ED] ring-2 ring-[#FED7AA]'
                        : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="text-sm font-bold text-[#2C241E]">
                      {lang === 'hi' ? item.titleHi : item.title}
                    </div>
                    <div className="text-xs text-[#655343] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2 text-xs font-medium text-[#8C7662] hover:text-[#2C241E] cursor-pointer"
                >
                  {lang === 'hi' ? '← वापस' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] rounded-xl cursor-pointer"
                >
                  <span>{lang === 'hi' ? 'अगला सवाल' : 'Next Step'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Dietary Preference */}
          {currentStep === 2 && (
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#2C241E] mb-2">
                {lang === 'hi' ? '3. आपकी कोई आहार प्राथमिकता (Dietary Preference)?' : '3. Any dietary preference?'}
              </h3>
              <p className="text-xs text-[#8C7662] mb-6">
                {lang === 'hi' ? 'हम सिर्फ आपकी पसंद की चीजें दिखाएंगे:' : 'We ensure your scoop satisfies all restrictions:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { id: 'dairy', title: 'Traditional A2 Cream', titleHi: 'शुद्ध A2 देशी दूध मलाई', desc: 'Full-fat rich buffalo & cow cream churning' },
                  { id: 'vegan', title: '100% Plant-Based Sorbet', titleHi: 'डेयरी-फ़्री वीगन सॉर्बे', desc: 'Pure wild fruits, spring water & zero dairy' },
                  { id: 'nut_free', title: 'Nut-Free Safety', titleHi: 'नट-फ़्री (बिना मेवे के)', desc: 'Zero tree nuts, crafted with fruit and sweet cream' },
                  { id: 'low_sugar', title: 'Subtle Natural Sweetness', titleHi: 'हल्की प्राकृतिक मिठास', desc: 'Sweetened gently with real fruit pulp' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDiet(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      diet === item.id
                        ? 'border-[#C2410C] bg-[#FFF7ED] ring-2 ring-[#FED7AA]'
                        : 'border-[#E8DFD3] hover:border-[#D8CBBF] bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="text-sm font-bold text-[#2C241E]">
                      {lang === 'hi' ? item.titleHi : item.title}
                    </div>
                    <div className="text-xs text-[#655343] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-medium text-[#8C7662] hover:text-[#2C241E] cursor-pointer"
                >
                  {lang === 'hi' ? '← वापस' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={calculateMatch}
                  className="inline-flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-semibold text-white bg-[#C2410C] hover:bg-[#9A3412] rounded-xl shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'मेरा मैच देखें' : 'Reveal My Match'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: RESULT REVEAL */}
          {currentStep === 3 && recommendedFlavor && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
                <Check className="w-3.5 h-3.5" />
                <span>100% Match Found</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C241E]">
                {lang === 'hi' ? recommendedFlavor.nameHi : recommendedFlavor.name}
              </h3>

              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#C2410C]">
                {recommendedFlavor.tag}
              </p>

              {/* Visual Scoop preview */}
              <div className="my-6 flex justify-center">
                <div
                  className="w-32 h-32 rounded-full shadow-xl flex items-center justify-center relative animate-scoop-float"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, #FFFFFF 0%, ${recommendedFlavor.colors.primary} 45%, ${recommendedFlavor.colors.secondary} 100%)`,
                  }}
                >
                  <span className="text-2xl">🍨</span>
                </div>
              </div>

              <p className="max-w-lg mx-auto text-sm text-[#655343] leading-relaxed mb-6">
                {lang === 'hi' ? recommendedFlavor.descriptionHi : recommendedFlavor.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleAddMatchToCart}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-md transition-all cursor-pointer ${
                    added ? 'bg-emerald-600' : 'bg-[#C2410C] hover:bg-[#9A3412]'
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
                      <span>{lang === 'hi' ? 'यह स्कूप बैग में जोड़ें' : 'Add Single Scoop to Bag'}</span>
                      <span className="opacity-90">· ₹{recommendedFlavor.priceSingle}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onViewFlavor(recommendedFlavor)}
                  className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#2C241E] bg-[#FAF7F2] hover:bg-[#EFE8DC] border border-[#E8DFD3] cursor-pointer"
                >
                  {lang === 'hi' ? 'पूरी कहानी और सामग्री' : 'Full Sourcing Story'}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 text-xs text-[#8C7662] hover:text-[#C2410C] flex items-center gap-1 cursor-pointer"
                  title="Retake Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'दोबारा क्विज़ दें' : 'Retake'}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
