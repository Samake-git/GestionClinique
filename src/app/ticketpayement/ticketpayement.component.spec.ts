import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketpayementComponent } from './ticketpayement.component';

describe('TicketpayementComponent', () => {
  let component: TicketpayementComponent;
  let fixture: ComponentFixture<TicketpayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketpayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketpayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
