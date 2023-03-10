import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Day } from '../interfaces/day';
import { Reminder } from '../interfaces/reminder';
import { CalendarService } from './calendar.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  onDestroy$ = new Subject<boolean>();

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  async getReminders() {
    return await this.calendarService
      .list(new Date())
      .pipe(takeUntil(this.onDestroy$))
      .toPromise();
  }

  async checkWeather(reminders: Reminder[]) {
    const promises = reminders.map(async (reminder: Reminder) => {
      const { city, ...rest } = reminder;
      try {
        const weather = city
          ? await this.weatherService.getWeatherInformation(city).toPromise()
          : {};
        return { ...rest, city, weather };
      } catch (error) {
        return { ...rest, city };
      }
    });

    const results: Reminder[] = await Promise.all(promises);
    return results.filter((result) => result.weather !== undefined);
  }

  joinCalendarAndReminders(calendar: Day[][], reminders: Reminder[]) {
    return calendar.map((week) => {
      return week.map((day) => {
        const dayDate = day.date?.toString().split('T')[0]
        debugger;
        if (dayDate) {
          const remindersForDay = reminders.filter((reminder) => {
            const reminderDate = reminder.dateTime.toString()
            return reminderDate === dayDate
          });
          return { ...day, reminders: remindersForDay };
        }
        return { ...day };
      });
    });
  }

  async loadCalendar(calendar): Promise<Day[][]> {
    try {
      let reminders: any = await this.getReminders();
      reminders = await this.checkWeather(reminders);

      return this.joinCalendarAndReminders(calendar, reminders);
    } catch (error) {
      console.error('Error loading calendar', error);
    }
  }
}
