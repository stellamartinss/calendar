import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Day } from 'src/app/interfaces/day';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { CommonService } from 'src/app/services/common.service';
import { cities } from 'src/app/constants/cities';

import { ReminderFormComponent } from './reminder-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;
  let calendarServiceSpy: jasmine.SpyObj<CalendarService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('CalendarService', [
      'create',
      'edit',
      'delete',
    ]);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatChipsModule,
        NoopAnimationsModule,
      ],
      declarations: [ReminderFormComponent],
      providers: [
        CommonService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { reminder: {} as Reminder, weeks: [[]] },
        },
        { provide: CalendarService, useValue: spy },
      ],
    }).compileComponents();

    calendarServiceSpy = TestBed.inject(
      CalendarService
    ) as jasmine.SpyObj<CalendarService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.reminderForm).toBeTruthy();
  });

  it('should create a reminder', async () => {
    const reminder = {
      id: component.makeId(),
      text: 'Test Reminder',
      dateTime: new Date(),
      time: '12:00',
      color: '#63d3ff',
      city: 'Miami',
      weather: {},
    };

    component.submitStatus.action = 'save';

    calendarServiceSpy.create.and.returnValue(of(reminder));

    component.reminderForm.patchValue(reminder);

    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    (component as any).dialogRef = dialogRef;

    await component.onSubmit();

    expect(component.reminders).toContain(reminder);
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should update a reminder', async () => {
    const time = new Date();
    const reminder = {
      id: '123',
      text: 'Test Reminder',
      dateTime: new Date(),
      color: '#63d3ff',
      time: '20:2',
      city: 'Miami',
    };
    calendarServiceSpy.edit.and.returnValue(of(reminder));

    component.reminderForm.patchValue(reminder);
    component.submitStatus = { text: 'Edit', action: 'edit' };
    await component.onSubmit();

    expect(calendarServiceSpy.edit).toHaveBeenCalledWith(reminder);
  });

  it('should delete a reminder', async () => {
    const reminder = {
      id: '123',
      text: 'Test Reminder',
      dateTime: new Date(),
      time: '12:00',
      color: '#63d3ff',
      city: 'Miami',
      weather: {},
    };
    calendarServiceSpy.delete.and.returnValue(of(true));

    component.data.reminder = reminder;
    await component.remove();

    expect(calendarServiceSpy.delete).toHaveBeenCalledWith(reminder.id);
  });
});
