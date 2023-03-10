import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Day } from '../interfaces/day';
import { Reminder } from '../interfaces/reminder';
import { CalendarService } from './calendar.service';

import { CommonService } from './common.service';
import { WeatherService } from './weather.service';

describe('CommonService', () => {
  let service: CommonService;
  let calendarServiceSpy: jasmine.SpyObj<CalendarService>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let commonService: CommonService;

  beforeEach(() => {
    const calendarService = jasmine.createSpyObj('CalendarService', ['list']);
    const weatherService = jasmine.createSpyObj('WeatherService', [
      'getWeatherInformation',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CommonService,
        { provide: CalendarService, useValue: calendarService },
        { provide: WeatherService, useValue: weatherService },
      ],
    });
    service = TestBed.inject(CommonService);
    commonService = TestBed.inject(CommonService);
    calendarServiceSpy = TestBed.inject(
      CalendarService
    ) as jasmine.SpyObj<CalendarService>;
    weatherServiceSpy = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
  });

  afterEach(() => {
    service.onDestroy$.next(true);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of reminders', async () => {
    const reminders = [
      { id: 1, title: 'Reminder 1' },
      { id: 2, title: 'Reminder 2' },
    ];
    calendarServiceSpy.list.and.returnValue(of(reminders));

    const result = await commonService.getReminders();

    expect(result).toEqual(reminders);
  });

  it('should complete the onDestroy$ subject when the component is destroyed', () => {
    spyOn(commonService.onDestroy$, 'next');
    spyOn(commonService.onDestroy$, 'complete');

    commonService.ngOnDestroy();

    expect(commonService.onDestroy$.next).toHaveBeenCalledWith(true);
    expect(commonService.onDestroy$.complete).toHaveBeenCalled();
  });

});
