export default interface FeedModel {
  _id?: string,
  description: string,
  eventId: string,
  important: boolean,
  sender: string,
  userId: string,
  admin: boolean
}
