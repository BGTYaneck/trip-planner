export default interface tripData {
  id: number;
  destination: string;
  dateStart: string;
  dateEnd: string;
  persons: [
    {
      person: string;
      items: string[];
    }
  ];
}
