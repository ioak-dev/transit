export default interface ParticipantModel {
  _id?: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  birthDate: any;
  joiningDate?: any;
  referenceId: string;
  groups: string[];
  room: string;
  practice?: string;
  food?: string;
  drink?: string;
  sports?: string;
  travelMode?: string;
  flightNoIn?: string;
  flightNoOut?: string;
  startBaseIn?: Date;
  startBaseOut?: Date;
  landBaseIn?: Date;
  landBaseOut?: Date;
}
