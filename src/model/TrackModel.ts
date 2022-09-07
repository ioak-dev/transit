export default interface TrackModel {
  _id?: string;
  eventId: string;
  name: string;
  description: string;
  icon: string;
  from: any;
  to: any;
  code: string;
  group: string;
  location: string;
  registration?: string;
  exclusiveGroup?: string;
}
