export interface Event {
  id: string;
  title: string;
  description: string;
  startDate : string;
  endDate : string;
  promotions: Promotion[];
  notification: Notification[];
  keywords: string;
  shopId : number;
}

 export interface Promotion {
   id: string;
   title: string;
   description: string;
  startDate : string;
  endDate : string;
  shopId : number;
  promoKeywords: string;
  promoEventId?: number;
  promoType?: number;
  condLeft?: string;
  condRight?: string;
  condSign?: string;
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
