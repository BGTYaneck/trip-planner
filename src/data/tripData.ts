export default interface tripData {
  id: number;
  destination: string;
  dateStart: string;
  dateEnd: string;
  persons: [
    {
      personId: number;
      person: string;
      items: string[];
    }
  ];
}
