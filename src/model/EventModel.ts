export default interface EventModel {
  _id?: string;
  name: string;
  description: string;
  notification?: string;
  media?: any;
  code: string;
  support?: any;
  group?: any;
}
