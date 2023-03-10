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
  submitStatus = { text: 'Save', action: 'save' };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { reminder: Reminder; weeks: Day[][] },
    private calendarService: CalendarService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<ReminderFormComponent>
  ) {
    this.createForm(data);
  }

  createForm(data: { reminder: Reminder; weeks: Day[][] }) {
    this.reminderForm = new FormGroup({
      id: new FormControl(null),
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      dateTime: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });

    if (data.reminder) {
      this.prepareEditForm(data.reminder);
    }
  }

  prepareEditForm(reminder) {
    this.reminderForm.get('id').setValue(reminder.id);
    this.reminderForm.get('text').setValue(reminder.text);
    this.reminderForm.get('dateTime').setValue(new Date(reminder.dateTime));
    this.reminderForm.get('time').setValue(new Date(reminder.time));
    this.reminderForm.get('city').setValue(reminder.city);
    this.reminderForm.get('color').setValue(reminder.color);

    this.submitStatus = { text: 'Edit', action: 'edit' };
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  async onSubmit() {
    const result = this.submitStatus.action === 'save' ? this.createReminder() : this.updateReminder();

    if (result) {
      this.close();
      this.reminderForm.reset();
    }
  }

  async createReminder() {
    this.reminderForm.value.id = this.makeId();
    return await this.calendarService
      .create(this.reminderForm.value)
      .toPromise();
  }

  async updateReminder() {
    return await this.calendarService
      .edit(this.reminderForm.value)
      .toPromise();
  }

  makeId() {
    return new Date()
      .toJSON()
      .toString()
      .replace(/-/g, '')
      .replace(/:/g, '')
      .replace(/T/g, '')
      .replace(/\./g, '')
      .replace(/Z/g, '');
  }

  async close() {
    this.dialogRef.close(
      await this.commonService.loadCalendar(this.data.weeks)
    );
  }

  chooseColor(color: string) {
    this.reminderForm.get('color').setValue(color);
    console.log(this.reminderForm.value);
  }
}
