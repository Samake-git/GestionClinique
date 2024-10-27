import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuAnalyseComponent } from './recu-analyse.component';

describe('RecuAnalyseComponent', () => {
  let component: RecuAnalyseComponent;
  let fixture: ComponentFixture<RecuAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
