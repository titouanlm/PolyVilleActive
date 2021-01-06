import {Reservation} from "./reservation.model";

export interface Inhabitant {
  firstName: string;
  lastName: string;
  longitude: number;
  latitude: number;
  age: number;
  id: number;
  shopRated : number[];
  positions : number[][];
  objectPurchased: string[][];
  gender: string;
  currentReservation : Reservation
}
