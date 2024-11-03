import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysePayementComponent } from './analyse-payement.component';

describe('AnalysePayementComponent', () => {
  let component: AnalysePayementComponent;
  let fixture: ComponentFixture<AnalysePayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysePayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
