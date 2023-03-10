import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Day } from 'src/app/interfaces/day';
import { CalendarService } from 'src/app/services/calendar.service';
import { CommonService } from 'src/app/services/common.service';
import { WeatherService } from 'src/app/services/weather.service';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarServiceStub: Partial<CalendarService>;
  let weatherServiceStub: Partial<WeatherService>;
  let commonServiceStub: Partial<CommonService>;
  let matDialogStub: Partial<MatDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    calendarServiceStub = {};
    weatherServiceStub = {};
    commonServiceStub = {};
    // matDialogStub = {
    //   open: () => {
    //     return {
    //       afterClosed: () => {
    //         return {
    //           subscribe: () => {},
    //         };
    //       },
    //     };
    //   },
    // };

    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
      ],
      providers: [
        { provide: CalendarService, useValue: calendarServiceStub },
        { provide: WeatherService, useValue: weatherServiceStub },
        { provide: CommonService, useValue: commonServiceStub },
        { provide: MatDialog, useValue: matDialogStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component with the correct properties', () => {
    const today = new Date();
    expect(component.selectedDate.toString()).toEqual(today.toString());
    expect(component.month).toEqual(today.getMonth());
    expect(component.year).toEqual(today.getFullYear());
    expect(component.monthName).toEqual(
      component.getMonthName(today.getMonth())
    );
    expect(component.today.toString()).toEqual(today.toString());
    expect(component.weeks.length).toEqual(5);
    expect(component.daysInWeek).toEqual([
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ]);
    expect(component.monthsOfYear.length).toEqual(12);
    expect(component.currentMonth).toBeUndefined();
    expect(component.currentYear).toBeUndefined();
    expect(component.calendarDays.length).toEqual(0);
    expect(component.reminders).toBeUndefined();
  });

  it('should call getReminders method when the component is initialized', () => {
    spyOn(component, 'getReminders');
    component.ngOnInit();
    expect(component.getReminders).toHaveBeenCalled();
  });
  it('should generate the calendar', () => {
    component.year = 2022;
    component.month = 1;
    component.generateCalendar();

    expect(component.weeks.length).toBeGreaterThan(0);

    const compare = [
      { number: '', outsideMonth: true },
      { number: '', outsideMonth: true },
      { number: 1, outsideMonth: false, date: '2022-02-01T03:00:00.000Z' },
      { number: 2, outsideMonth: false, date: '2022-02-02T03:00:00.000Z' },
      { number: 3, outsideMonth: false, date: '2022-02-03T03:00:00.000Z' },
      { number: 4, outsideMonth: false, date: '2022-02-04T03:00:00.000Z' },
      { number: 5, outsideMonth: false, date: '2022-02-05T03:00:00.000Z' },
    ];

    expect(JSON.stringify(component.weeks[0])).toEqual(JSON.stringify(compare));
  });

  it('should return the month name given a number', () => {
    const month = component.getMonthName(2);
    expect(month).toBe('March');
  });

  it('should decrease the year by 1 when prevYear() is called', () => {
    const yearBefore = component.year;
    component.prevYear();
    expect(component.year).toEqual(yearBefore - 1);
  });

  it('should increase the year by 1 when nextYear() is called', () => {
    const yearBefore = component.year;
    component.nextYear();
    expect(component.year).toEqual(yearBefore + 1);
  });

  it('should decrease the month by 1 when prevMonth() is called and month is not January', () => {
    const monthBefore = component.month;
    component.prevMonth();
    if (monthBefore === 0) {
      expect(component.month).toEqual(11);
    } else {
      expect(component.month).toEqual(monthBefore - 1);
    }
  });

  it('should increase the month by 1 when nextMonth() is called and month is not December', () => {
    const monthBefore = component.month;
    component.nextMonth();
    if (monthBefore === 11) {
      expect(component.month).toEqual(0);
    } else {
      expect(component.month).toEqual(monthBefore + 1);
    }
  });
});
