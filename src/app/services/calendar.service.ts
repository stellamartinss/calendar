import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  reminders: Reminder[] = [];
  api = '';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 123'
    })
  };

  constructor(private http: HttpClient) {}

  create(data: Reminder): Observable<Object> {
    console.log(data);
    return this.http.post('/reminders', data, this.httpOptions);
  }

  edit(data: Reminder): Observable<Object> {
    return this.http.patch(
      `/reminders/${data.id}`,
      data,
      this.httpOptions
    );
  }

  list(date?: Date): Observable<Object> {
    return this.http.get('/reminders', this.httpOptions);
  }

  delete(reminderId: string): Observable<Object> {
    console.log('removing')
    return this.http.delete(`/reminders/${reminderId}`, this.httpOptions)
  }
}
