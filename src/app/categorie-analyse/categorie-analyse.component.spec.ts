import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieAnalyseComponent } from './categorie-analyse.component';

describe('CategorieAnalyseComponent', () => {
  let component: CategorieAnalyseComponent;
  let fixture: ComponentFixture<CategorieAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieAnalyseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
