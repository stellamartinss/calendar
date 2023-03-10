import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Reminder } from '../interfaces/reminder';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendarService],
    });
    service = TestBed.inject(CalendarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a reminder', () => {
    const reminder: Reminder = {
      id: '20240803143004008',
      text: 'Shopping',
      dateTime: new Date(),
      color: '#02779e',
      time: '14:30',
      city: 'New York',
    };

    service.create(reminder).subscribe((response) => {
      expect(response).toEqual(reminder);
    });

    const req = httpMock.expectOne('/reminders');
    expect(req.request.method).toBe('POST');
    req.flush(reminder);
  });

  it('should edit a reminder', () => {
    const reminder: Reminder = {
      id: '20240803143004008',
      text: 'Shopping',
      dateTime: new Date(),
      color: '#02779e',
      time: '14:30',
      city: 'New York',
    };

    service.edit(reminder).subscribe((response) => {
      expect(response).toEqual(reminder);
    });

    const req = httpMock.expectOne(`/reminders/${reminder.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(reminder);
  });

  it('should list reminders', () => {
    const reminders: Reminder[] = [
      {
        id: '20240803143004008',
        text: 'Shopping',
        dateTime: new Date(),
        color: '#02779e',
        time: '14:30',
        city: 'New York',
      },
      {
        "id": "20240928190025009",
        "text": "Party",
        "dateTime": new Date(),
        "color": "#be80ff",
        "time": "19:00",
        "city": "Rio de Janeiro"
      },
    ];

    service.list().subscribe((response) => {
      expect(response).toEqual(reminders);
    });

    const req = httpMock.expectOne('/reminders');
    expect(req.request.method).toBe('GET');
    req.flush(reminders);
  });

  it('should delete a reminder', () => {
    const reminderId = '1';

    service.delete(reminderId).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`/reminders/${reminderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
