import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'AngularChallenge'`, () => {
    expect(component.title).toEqual('AngularChallenge');
  });

  it('should render the title in the template', () => {
    fixture.detectChanges();
    setTimeout(() => {
      const element = fixture.nativeElement.querySelector('h1');
      expect(element.textContent).toContain(component.title);
    }, 1000);
  });
});
