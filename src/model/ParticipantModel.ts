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
  customFields?: any;
  firstDeclaration?: boolean;
  secondDeclaration?: boolean;
}
