import {Event, Promotion} from './event.model'

export interface Shop{
  id: string;
  label: string;
  longitude: number;
  latitude: number;
  sellerId?: number;
  numberOfPurchaseByAgeRang: Array<number>;  //0-14,15-29,30-44,45-59,60-74,75-+
  numberOfPurchaseBySexRang: Array<number>;  //H F
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

  parkingSpace: {
    nbrPlace: number,
    nbrPlaceFree: number,
    nbrPlaceUnassignable :number,
    nbrPlaceUnassignableFree :number,
    places : Array<nameAvailabilityType>,
    placesUnassignable:Array<nameAvailabilityType>
  }
}

export interface nameAvailabilityType{
  name : string,
  availability : boolean
}
