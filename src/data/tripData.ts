export default interface tripData {
  id: number;
  destination: string;
  dateStart: string;
  dateEnd: string;
  type: string;
  persons: {
    itemsId: number;
    person: string;
    items: string[];
  }[];
}
