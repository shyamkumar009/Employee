import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChatComponent } from './employee-chat.component';

describe('EmployeeChatComponent', () => {
  let component: EmployeeChatComponent;
  let fixture: ComponentFixture<EmployeeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
