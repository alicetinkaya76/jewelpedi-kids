/**
 * Jeweler Shop müşteri havuzu.
 * Her müşteri: isim, avatar emoji, tam brief (budget, style, allergy),
 * ve konuşma balonu metni. Balon metni her 3 dilde net bir rica olmalı.
 */

export const customers = [
  {
    id: 'ayse',
    avatar: '👰',
    name: { tr: 'Ayşe', en: 'Ayşe', ar: 'عائشة' },
    budget: 12000,
    style: 'classical',
    allergy: false,
    quote: {
      tr: 'Düğünüm için klasik bir yüzük arıyorum. Yaklaşık 12.000 TL bütçem var. Alerjim yok — en güzelini iste!',
      en: 'I\'m looking for a classical wedding ring. Budget around ₺12,000. No allergies — give me your best!',
      ar: 'أبحث عن خاتم زفاف كلاسيكي. ميزانيتي تقريباً 12000. لا حساسية.',
    },
  },
  {
    id: 'mehmet',
    avatar: '🧑‍💼',
    name: { tr: 'Mehmet', en: 'Mehmet', ar: 'محمد' },
    budget: 8000,
    style: 'modern',
    allergy: true,
    quote: {
      tr: 'Modern bir tasarım, ama nikel alerjim var — dikkat! Bütçem 8.000 TL civarı.',
      en: 'Modern design — but I have a nickel allergy, watch out! Budget about ₺8,000.',
      ar: 'تصميم عصري، لكن لدي حساسية من النيكل. ميزانيتي 8000.',
    },
  },
  {
    id: 'zeynep',
    avatar: '👩‍🎨',
    name: { tr: 'Zeynep', en: 'Zeynep', ar: 'زينب' },
    budget: 3500,
    style: 'modern',
    allergy: false,
    quote: {
      tr: 'Doğum günüm için kendime bir hediye — pratik ve modern, 3.500 TL civarı.',
      en: 'A birthday gift for myself — practical and modern, around ₺3,500.',
      ar: 'هدية عيد ميلادي — عصري وعملي، حوالي 3500.',
    },
  },
  {
    id: 'ali-kezban',
    avatar: '👴',
    name: { tr: 'Ali Bey', en: 'Mr Ali', ar: 'علي' },
    budget: 25000,
    style: 'classical',
    allergy: false,
    quote: {
      tr: '25. evlilik yıl dönümümüz için özel bir şey. Klasik, zarif, 25.000 TL\'ye kadar olabilir.',
      en: 'Our 25th anniversary — something special. Classical, elegant, up to ₺25,000.',
      ar: 'ذكرى زواجنا الخامسة والعشرين — شيء مميز حتى 25000.',
    },
  },
  {
    id: 'gen-z',
    avatar: '🧑‍🎓',
    name: { tr: 'Deniz', en: 'Deniz', ar: 'دينيز' },
    budget: 1500,
    style: 'modern',
    allergy: true,
    quote: {
      tr: 'İlk maaşımla kendime bir yüzük. Modern, nikel yok, bütçem sadece 1.500 TL.',
      en: 'First-salary treat for me. Modern, nickel-free, only ₺1,500 budget.',
      ar: 'هدية أول راتب. عصري، دون نيكل، 1500 فقط.',
    },
  },
];

export function pickRandomCustomers(n) {
  const shuffled = [...customers].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
