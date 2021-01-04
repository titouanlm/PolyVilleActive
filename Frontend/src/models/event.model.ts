export interface Event {
  id: string;
  title: string;
  description: string;
  startDate : string;
  endDate : string;
  promotions: Promotion[];
  notification: Notification[];
  keywords?: string;
  shopId : number;
}

 export interface Promotion {
  id: string;
  title: string;
  description: string;
  startDate : string;
  endDate : string;
  shopId : number;
  eventId?:number;
  promoKeywords?: string;
  promoEventId?: number;
  promoType?: number;
  customersNumberInterested?: number[];
  notifiedCustomersNumber?: number[];
  condLeft?: string;
  condRight?: string;
  condSign?: string;
  public: boolean;
}

export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  dateDebut : string;
  dateFin : string;
  heureDebut: number;
  heureFin : number;
  nbrPresonneAttendu: number;
  nbDayDuration: number;
  fillingPercentageShowHall: number;
  lieu : string;
  typeEvenement : string;
  typePublic : string;
  caId : number;
}
