import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceDialogComponent } from './ordonnance-dialog.component';

describe('OrdonnanceDialogComponent', () => {
  let component: OrdonnanceDialogComponent;
  let fixture: ComponentFixture<OrdonnanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
