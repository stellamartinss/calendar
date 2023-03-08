import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/interfaces/reminder';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {

  public reminderForm: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: Reminder, private formBuilder: FormBuilder) {
    this.reminderForm = new FormGroup({
      reminder: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit() {
    console.log(this.reminderForm.value);
    // add code to save reminder to backend or local storage
  }
}
