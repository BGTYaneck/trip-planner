export default interface tripData {
  id: number;
  destination: string;
  dateStart: string;
  dateEnd: string;
  persons: {
    itemsId: number;
    person: string;
    items: string[];
  }[];
}
