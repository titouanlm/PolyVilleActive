export interface ShowHall {
  id: number;
  name: string;
  type : string[];
  capacity: number;
  unavailableSlots?: Date[];
}
