import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggoutModalComponent } from './loggout-modal.component';

describe('LoggoutModalComponent', () => {
  let component: LoggoutModalComponent;
  let fixture: ComponentFixture<LoggoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggoutModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
