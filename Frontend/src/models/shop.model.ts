import {Event} from './event.model'

export interface Shop{
  id: string;
  label: string,
  longitude: number,
  latitude: number,
  sellerId?: number,
  storeRating: number,
  events: Event[]
}
