import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Day } from 'src/app/interfaces/day';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {
  public reminderForm: FormGroup;
  public reminders = [];
  public colors = ['#02779e', '#63d3ff', '#be80ff', '#9061c2', '#ff548f'];
  public cities = [
    'Tokyo',
    'New York',
    'Paris',
    'London',
    'Beijing',
    'Dubai',
    'Los Angeles',
    'Rome',
    'Bangkok',
    'Istanbul',
    'Shanghai',
    'Barcelona',
    'Berlin',
    'Sydney',
    'San Francisco',
    'Amsterdam',
    'Rio de Janeiro',
    'Vienna',
    'Chicago',
    'Cape Town',
    'Moscow',
    'Hong Kong',
    'Toronto',
    'Mumbai',
    'Dublin',
    'Singapore',
    'Riyadh',
    'Madrid',
    'Seoul',
    'Melbourne',
    'Vancouver',
    'Miami',
    'Edinburgh',
    'Buenos Aires',
    'Zurich',
    'Seattle',
    'Lisbon',
    'Hanoi',
    'Prague',
    'Jerusalem',
    'Athens',
    'Copenhagen',
    'Oslo',
    'Stockholm',
    'Kyoto',
    'Krakow',
    'Budapest',
    'Dubrovnik',
    'Santiago',
  ];
  separatorKeysCodes: number[] = [1, 2];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { reminders: Reminder; weeks: Day[][] },
    private calendarService: CalendarService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<ReminderFormComponent>
  ) {
    this.reminderForm = new FormGroup({
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      dateTime: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  async onSubmit() {
    this.reminderForm.value.id = new Date().toJSON();
    const result = await this.calendarService
      .create(this.reminderForm.value)
      .toPromise();

    if (result) {
      this.reminderForm.reset();
      this.dialogRef.close(
        await this.commonService.loadCalendar(this.data.weeks)
      );
    }
  }

  chooseColor(color: string) {
    this.reminderForm.get('color').setValue(color);
    console.log(this.reminderForm.value)
  }
}
