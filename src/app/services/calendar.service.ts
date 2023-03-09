import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  reminders: Reminder[] = [];

  constructor(private http: HttpClient) { }

  create(data: Reminder): Reminder {
    return data;
  }

  edit(data: Reminder): Reminder {
    return data;
  }

  list(date: Date): Observable<Object> {
    return this.http.get('http://localhost:3000/reminders');
  }

  delete(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }
}
