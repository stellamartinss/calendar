import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { CommonService } from 'src/app/services/common.service';
import { Day } from 'src/app/interfaces/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<boolean>();

  selectedDate: Date;
  today: Date;
  weeks: Day[][] = [];
  month: number;
  year: number;
  monthName: string;

  daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthsOfYear = [
    { name: 'January', days: 31 },
    { name: 'February', days: 28 },
    { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },
  ];

  currentMonth: number;
  currentYear: number;
  calendarDays: { date: number; isCurrentMonth: boolean }[] = [];
  reminders: Reminder[];

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
    private commonService: CommonService
  ) {
    this.selectedDate = new Date();
    this.month = this.selectedDate.getMonth();
    this.year = this.selectedDate.getFullYear();
    this.monthName = this.getMonthName(this.month);
    this.today = new Date();
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.getReminders();
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openReminderForm(reminder?: Reminder) {
    const dialogRef = this.matDialog.open(ReminderFormComponent, {
      data: {
        reminder: reminder,
        weeks: this.weeks,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.weeks = data;
      }
    });
  }

  prevYear() {
    this.year--;
    this.generateCalendar();
    this.getReminders();
  }

  nextYear() {
    this.year++;
    this.generateCalendar();
    this.getReminders();
  }

  prevMonth() {
    if (this.month === 0) {
      this.year--;
      this.month = 11;
    } else {
      this.month--;
    }
    this.monthName = this.getMonthName(this.month);
    this.generateCalendar();
    this.getReminders();
  }

  nextMonth() {
    if (this.month === 11) {
      this.year++;
      this.month = 0;
    } else {
      this.month++;
    }
    this.monthName = this.getMonthName(this.month);
    this.generateCalendar();
    this.getReminders();
  }

  selectDate(day) {
    if (!day.outsideMonth) {
      this.selectedDate = new Date(this.year, this.month, day.number);
      this.getReminders();
    }
  }

  async getReminders() {
    this.weeks = await this.commonService.loadCalendar(this.weeks);

    console.log(this.weeks);
  }

  generateCalendar() {
    this.weeks = [];
    const firstDayOfMonth = new Date(this.year, this.month, 1);
    const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    let dayOfWeek = firstDayOfMonth.getDay();
    let week: any[] = [];

    for (let i = 0; i < dayOfWeek; i++) {
      week.push({ number: '', outsideMonth: true });
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      const date = new Date(this.year, this.month, i);
      week.push({ number: i, outsideMonth: false, date: date.toJSON() });
      dayOfWeek++;

      if (dayOfWeek === 7) {
        this.weeks.push(week);
        week = [];
        dayOfWeek = 0;
      }
    }

    if (dayOfWeek !== 0) {
      for (let i = dayOfWeek; i < 7; i++) {
        week.push({ number: '', outsideMonth: true });
      }
      this.weeks.push(week);
    }
  }

  getMonthName(month: number) {
    return this.monthsOfYear[month].name;
  }

  selectDay(day: number) {
    console.log(day);
  }
}
