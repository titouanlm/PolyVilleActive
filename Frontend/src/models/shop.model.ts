import {Event, Promotion} from './event.model'

export interface Shop{
  id: string;
  label: string;
  longitude: number;
  latitude: number;
  sellerId?: number;
  numberOfPurchaseByAgeRang: Array<number>;  //0-14,15-29,30-44,45-59,60-74,75-+
  numberOfPurchaseBySexRang: Array<number>;  //H F
 // numberOfPurchaseBySexFoncAge: sexAgeAchat;
  storeRating: {
    averageRate: number,
    voterNumber: number,
  },
  promotions: Promotion[];
  averagePresenceBeforePurchase: {
    numberOfPurchases: number,
    numberOfPresence: number,
  },
  purchasedItems: string[][],
}

interface sexAgeAchat{
  plage0_14: Array<number>;
  plage15_29 : Array<number>;
  plage30_44 : Array<number>;
  plage45_59 : Array<number>;
  plage60_74: Array<number>;
  plage75_100: Array<number>;
}
