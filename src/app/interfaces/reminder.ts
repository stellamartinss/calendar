export interface Reminder {
  id?: string,
  text: string;
  dateTime: Date;
  time?: string;
  color: string;
  city?: string;
  weather?: Object
}
