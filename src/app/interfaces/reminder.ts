export interface Reminder {
  id?: Date,
  text: string;
  dateTime: Date;
  time?: string;
  color: string;
  city?: string;
  weather?: Object
}
