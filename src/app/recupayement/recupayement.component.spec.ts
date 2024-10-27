import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupayementComponent } from './recupayement.component';

describe('RecupayementComponent', () => {
  let component: RecupayementComponent;
  let fixture: ComponentFixture<RecupayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecupayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecupayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
