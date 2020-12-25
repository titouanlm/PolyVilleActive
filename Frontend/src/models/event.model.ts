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

 export interface Notification {
  id: string;
  notifDescription: string;
  notifType: number;
  notifEventId: number;
  condLeft: string;
  condRight: string;
  condSign: string;
}

export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  dateDeut : string;
  dateFin : string;
  heureDebut: string;
  heureFin : string;
  nbrPresonneAttendu: number;
  capacitesalle: number;
  lieu : string;
  typeEvenement : string;
  typePublic : string;
  shopId : number;
}
