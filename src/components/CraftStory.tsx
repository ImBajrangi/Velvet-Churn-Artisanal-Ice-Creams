import React from 'react';
import { Milk, Sparkles, Snowflake, HeartHandshake } from 'lucide-react';

interface CraftStoryProps {
  lang: 'en' | 'hi';
}

export const CraftStory: React.FC<CraftStoryProps> = ({ lang }) => {
  const pillars = [
    {
      icon: Milk,
      title: 'Pure A2 Farm Cream',
      titleHi: 'शुद्ध A2 गाय का दूध व मलाई',
      desc: 'We source raw milk daily from pasture-fed indigenous cows. No palm oil, milk powder, or hydrogenated vegetable fats.',
      descHi: 'हम रोज़ाना स्थानीय देशी गायों का ताज़ा दूध इस्तेमाल करते हैं। कोई पाम तेल या वनस्पति घी नहीं।',
    },
    {
      icon: Sparkles,
      title: 'Real GI-Tagged Fruit & Spices',
      titleHi: 'असली फल व शुद्ध मसाले',
      desc: 'Direct trade Ratnagiri Hapus mangoes, Purandar sitaphal, and Kashmiri saffron. Cooked and peeled in-house.',
      descHi: 'रत्नागिरी के हापुस, पुरंदर के सीताफल और कश्मीर का असली मोंगरा केसर। सब कुछ हमारे किचन में ताज़ा तैयार होता है।',
    },
    {
      icon: Snowflake,
      title: 'Slow Churned at 4 AM',
      titleHi: 'धीमी चर्निंग, शून्य अतिरिक्त हवा',
      desc: 'Commercial ice cream is puffed with up to 50% air (overrun). We slow-churn with low overrun for dense, silken gelato texture.',
      descHi: 'बाज़ार की आइसक्रीम में 50% हवा भरी होती है। हम धीमी गति से चर्न करते हैं ताकि हर बाइट गाढ़ी और मखमली बने।',
    },
    {
      icon: HeartHandshake,
      title: 'Sub-Zero Dry Ice Delivery',
      titleHi: 'ड्राई-आइस सुरक्षित पैकेजिंग',
      desc: 'Packed in biodegradable insulation with -78°C dry ice blocks. Arrives frozen solid at your doorstep within 30 minutes.',
      descHi: '-78°C तापमान वाली ड्राई-आइस और इको-फ्रेंडली थर्मल बॉक्स में पैक होकर आइसक्रीम बिना पिघले आप तक पहुंचती है।',
    },
  ];

  return (
    <section id="craft-story" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#E8DFD3] bg-[#F7F2EA]/70">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold text-[#C2410C] uppercase tracking-wider mb-2">
            {lang === 'hi' ? 'हमारी कारीगरी की कहानी' : 'The Churn Philosophy'}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C241E] tracking-tight">
            {lang === 'hi' ? 'खेत से फ्रीज़र तक: असली स्वाद' : 'From Farm to Churner'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#655343] leading-relaxed">
            {lang === 'hi'
              ? 'आइसक्रीम सिर्फ मीठा नहीं, बल्कि शुद्ध सामग्री और धीमी कारीगरी का उत्सव है।'
              : 'Ice cream shouldn’t be a mystery concoction of powders and chemical emulsifiers. Here is how we craft every tub.'}
          </p>
        </div>

        {/* 4 Pillars Grid (Bento cards, airy layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DFD3] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#C2410C] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-[#8C7662] mb-1">
                    0{idx + 1}. PILLAR
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2C241E] mb-2">
                    {lang === 'hi' ? pillar.titleHi : pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#655343] leading-relaxed">
                    {lang === 'hi' ? pillar.descHi : pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
