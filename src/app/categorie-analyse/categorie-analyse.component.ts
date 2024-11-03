import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategorieAnalyseService } from '../service/categorieAnalyse.service';
import { CategorieAnalyse } from '../interfaces/CategorieAnalyse.model';



@Component({
  selector: 'app-categorie-analyse',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatOption,
  ],
  templateUrl: './categorie-analyse.component.html',
  styleUrls: ['./categorie-analyse.component.css']
})
export class CategorieAnalyseComponent implements OnInit {
  categories: CategorieAnalyse[] = [];
  categorieForm: FormGroup;
  isEditing: boolean = false;
  currentCategorieId?: number;

  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieAnalyseService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.categorieForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getAllCategoriesAnalyse().subscribe((data: CategorieAnalyse[]) => {
      this.categories = data;
    });
  }

  addCategorie(): void {
    if (this.categorieForm.valid) {
      this.categorieService.addCategorieAnalyse(this.categorieForm.value).subscribe(() => {
        this.loadCategories();
        this.resetForm();
        this.openSnackBar('Catégorie ajoutée avec succès!', 'Fermer');
      });
    }
  }

  editCategorie(categorie: CategorieAnalyse): void {
    this.categorieForm.patchValue(categorie);
    this.isEditing = true;
    this.currentCategorieId = categorie.id;
  }

  updateCategorie(): void {
    if (this.categorieForm.valid && this.currentCategorieId) {
      this.categorieService.updateCategorieAnalyse(this.currentCategorieId, this.categorieForm.value).subscribe(() => {
        this.loadCategories();
        this.resetForm();
        this.openSnackBar('Catégorie mise à jour avec succès!', 'Fermer');
      });
    }
  }

  deleteCategorie(id: number): void {
    this.categorieService.deleteCategorieAnalyse(id).subscribe({
      next: () => {
        this.loadCategories();
        this.openSnackBar('Catégorie supprimée avec succès!', 'Fermer');
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression de la catégorie:', err);
        this.openSnackBar('Erreur lors de la suppression de la catégorie.', 'Fermer');
      }
    });
  }

  resetForm(): void {
    this.categorieForm.reset();
    this.isEditing = false;
    this.currentCategorieId = undefined;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  goToTypeanalyse() {
    this.router.navigate(['/typeAnalyse']);
  }
}
