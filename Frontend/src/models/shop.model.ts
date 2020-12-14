import {Event, Promotion} from './event.model'

export interface Shop{
  id: string;
  label: string;
  longitude: number;
  latitude: number;
  sellerId?: number;
  storeRating: {
    averageRate: number,
    voterNumber: number,
  },
  promotions: Promotion[];
}
