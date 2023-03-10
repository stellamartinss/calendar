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
import { cities } from 'src/app/constants/cities';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {
  public reminderForm: FormGroup;
  public dateTime = new Date();
  public time: string;
  public reminders = [];
  public colors = ['#02779e', '#63d3ff', '#be80ff', '#9061c2', '#ff548f'];
  public cities = cities;
  separatorKeysCodes: number[] = [1, 2];
  submitStatus = { text: 'Save', action: 'save' };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { reminder: Reminder; date?: Date; weeks: Day[][] },
    private calendarService: CalendarService,
    private dialogRef: MatDialogRef<ReminderFormComponent>
  ) {
    debugger;
    this.createForm(data);
  }

  createForm(data: { reminder: Reminder; date?: Date; weeks: Day[][] }) {
    this.reminderForm = new FormGroup({
      id: new FormControl(null),
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      dateTime: new FormControl(new Date(), Validators.required),
      color: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
    debugger;
    if (data.date) {
      this.setDate(data.date.toString().split('T')[0]);
      const time = new Date();
      this.setTime(`${time.getHours()}:${time.getMinutes()}`);
    }

    if (data.reminder) {
      this.prepareEditForm(data.reminder);
    }
  }

  setDate(date) {
    this.dateTime = date;
  }

  setTime(date: string) {
    this.time = date;
  }

  prepareEditForm(reminder) {
    this.reminderForm.get('id').setValue(reminder.id);
    this.reminderForm.get('text').setValue(reminder.text);
    this.reminderForm.get('dateTime').setValue(new Date(reminder.dateTime));
    this.reminderForm.get('time').setValue(new Date(reminder.time));
    this.reminderForm.get('city').setValue(reminder.city);
    this.reminderForm.get('color').setValue(reminder.color);

    this.dateTime = reminder.dateTime;
    this.time = reminder.time;

    this.submitStatus = { text: 'Edit', action: 'edit' };
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  async onSubmit() {
    const result =
      this.submitStatus.action === 'save'
        ? this.createReminder()
        : this.updateReminder();

    if (result) {
      this.close();
      this.reminderForm.reset();
    }
  }

  async createReminder() {
    this.reminderForm.value.id = this.makeId();
    debugger;
    return await this.calendarService
      .create(this.reminderForm.value)
      .toPromise();
  }

  async updateReminder() {
    return await this.calendarService.edit(this.reminderForm.value).toPromise();
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
    this.dialogRef.close();
  }

  chooseColor(color: string) {
    this.reminderForm.get('color').setValue(color);
    console.log(this.reminderForm.value);
  }

  async remove() {
    const result = await this.calendarService
      .delete(this.data.reminder.id)
      .toPromise();
    if (result) {
      this.close();
    }
  }
}
