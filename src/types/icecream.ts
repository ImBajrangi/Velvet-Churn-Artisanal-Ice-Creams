export type CategoryType = 'all' | 'signature' | 'desi_fusion' | 'vegan_sorbet' | 'chocolate';

export interface Flavor {
  id: string;
  name: string;
  nameHi: string;
  category: 'signature' | 'desi_fusion' | 'vegan_sorbet' | 'chocolate';
  tag: string;
  tagHi: string;
  description: string;
  descriptionHi: string;
  priceSingle: number;
  priceDouble: number;
  priceTub: number; // 500ml
  calories: number; // per scoop
  dietary: {
    isVeg: boolean;
    isGlutenFree: boolean;
    isNutFree: boolean;
    isVegan: boolean;
  };
  ingredients: string[];
  ingredientsHi: string[];
  sourcing: string;
  flavorProfile: {
    sweetness: number; // 1-5
    creaminess: number; // 1-5
    richness: number; // 1-5
  };
  colors: {
    primary: string; // scoop color
    secondary: string; // swirl/accent color
    bgLight: string;
    border: string;
  };
  textureNotes: string;
}

export interface SundaeBase {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  calories: number;
  type: 'cone' | 'bowl' | 'brioche';
}

export interface SundaeTopping {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  calories: number;
  color: string;
}

export interface SundaeSauce {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  calories: number;
  color: string;
}

export interface CartItem {
  id: string;
  itemType: 'flavor' | 'custom_sundae';
  title: string;
  titleHi: string;
  variantLabel: string;
  price: number;
  quantity: number;
  details?: string;
  color?: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  text: string;
  textHi: string;
  favoriteFlavor: string;
  date: string;
}

export interface ParlorLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  highlight: string;
}
