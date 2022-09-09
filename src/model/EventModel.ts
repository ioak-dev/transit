export default interface EventModel {
  _id?: string;
  name: string;
  description: string;
  venueTitle?: string;
  venueDescription?: string;
  registrationFrom?: any;
  registrationTo?: any;
  eventFrom?: any;
  notification?: string;
  media?: any;
  code: string;
  support?: any;
  group?: any;
  home?: any;
  registerDeclaration?: any;
  checkinDeclaration?: any;
  adminKey?: string;
  customFields?: any;
  dresscode?: any;
}
