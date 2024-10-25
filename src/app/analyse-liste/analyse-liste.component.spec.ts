import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseListeComponent } from './analyse-liste.component';

describe('AnalyseListeComponent', () => {
  let component: AnalyseListeComponent;
  let fixture: ComponentFixture<AnalyseListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyseListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyseListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
