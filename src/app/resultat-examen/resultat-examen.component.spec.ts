import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatExamenComponent } from './resultat-examen.component';

describe('ResultatExamenComponent', () => {
  let component: ResultatExamenComponent;
  let fixture: ComponentFixture<ResultatExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
