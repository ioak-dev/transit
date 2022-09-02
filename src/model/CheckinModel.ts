export default interface CheckinModel {
  _id?: string;
  eventId: string;
  participantId: string;
  trackId: string;
  from?: Date;
  to?: Date;
  register?: Date;
}
