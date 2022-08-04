export default interface MessageModel {
  _id?: string;
  description: string;
  important: boolean;
  admin: boolean;
  sender: string;
  eventId: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
