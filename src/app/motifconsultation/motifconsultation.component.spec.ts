import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifconsultationComponent } from './motifconsultation.component';

describe('MotifconsultationComponent', () => {
  let component: MotifconsultationComponent;
  let fixture: ComponentFixture<MotifconsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotifconsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotifconsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
