import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Analyse } from '../interfaces/analyse.model';
import { CategorieAnalyse } from '../interfaces/CategorieAnalyse.model';
import { Patient } from '../interfaces/patient.model';
import { TypeAnalyse } from '../interfaces/type-analyse.model';
import { AnalyseService } from '../service/analyse.service';
import { CategorieAnalyseService } from '../service/categorieAnalyse.service';
import { TypeAnalyseService } from '../service/type-analyse.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-analyse',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelect,
    MatDialogActions,
    MatDialogContent,
    MatOption,
    ReactiveFormsModule,],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.css'
})
export class AnalyseComponent {

  analyseForm: FormGroup;
  analyses: Analyse[] = [];
  selectedAnalyse: Analyse | null = null; 
  typeAnalyses: TypeAnalyse[] = [];
  patients: Patient[] = [];
  categoriesAnalyse: CategorieAnalyse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private analyseService: AnalyseService,
    private typeAnalyseService: TypeAnalyseService,
    private categorieAnalyseService: CategorieAnalyseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.analyseForm = this.formBuilder.group({
      id: [0],
      appareilUtilise: ['', Validators.required],
      typeAnalyse: [null, Validators.required],
      patient: [null, Validators.required],
      categorieAnalyse: [null]
    });

    this.loadAnalyses();
    this.loadTypeAnalyses();
    this.loadPatients();
    this.loadCategoriesAnalyse();
  }

  loadAnalyses() {
    this.analyseService.getAllAnalyses().subscribe(
      (analyses) => {
        this.analyses = analyses;
      },
      (error) => {
        console.error('Erreur lors du chargement des analyses :', error);
      }
    );
  }

  loadTypeAnalyses() {
    this.typeAnalyseService.getAllTypeAnalyses().subscribe(
      (typeAnalyses) => {
        this.typeAnalyses = typeAnalyses;
      },
      (error) => {
        console.error('Erreur lors du chargement des types d\'analyse :', error);
      }
    );
  }

  loadPatients() {
    console.log('Chargement des patients...');
    this.analyseService.getAllPatients().subscribe({
      next: (data) => {
        console.log('Patients récupérés:', data);
        this.patients = data;
        console.log(this.patients);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients:', error);
      }
    });
  }

  loadCategoriesAnalyse() {
    this.categorieAnalyseService.getAllCategoriesAnalyse().subscribe(
      (categories) => {
        this.categoriesAnalyse = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories d\'analyse :', error);
      }
    );
  }

  onSubmit() {
    if (this.analyseForm.valid) {
      const analyse = this.analyseForm.value;
      if (analyse.id === 0) {
        this.analyseService.createAnalyse(analyse).subscribe(
          (response) => {
            console.log('Analyse créée :', response);
            this.loadAnalyses();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la création de l\'analyse :', error);
          }
        );
      } else {
        this.analyseService.updateAnalyse(analyse.id, analyse).subscribe(
          (response) => {
            console.log('Analyse mise à jour :', response);
            this.loadAnalyses();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'analyse :', error);
          }
        );
      }
    }
  }

  editAnalyse(analyse: Analyse) {
    this.selectedAnalyse = analyse;
    this.analyseForm.patchValue({
      id: analyse.id,
      appareilUtilise: analyse.appareilUtilise,
      dateAnalyse: analyse.dateAnalyse,
      typeAnalyse: analyse.typeAnalyse,
      patient: analyse.patient,
      categorieAnalyse: analyse.categorieAnalyse
    });
  }

  deleteAnalyse(id: number) {
    this.analyseService.deleteAnalyse(id).subscribe(
      () => {
        console.log('Analyse supprimée');
        this.loadAnalyses();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'analyse :', error);
      }
    );
  }

  resetForm() {
    this.selectedAnalyse = null;
    this.analyseForm.reset({ id: 0, appareilUtilise: '', dateAnalyse: null, typeAnalyse: null, patient: null, categorieAnalyse: null });
  }

  goToResultat() {
    this.router.navigate(['/resultatExamen']);
  }

  imprimerRecu(analyse: any) {
    // Remplacez 'recu' par le chemin vers votre route de reçu
    this.router.navigate(['/recuAnalyse', analyse.id]); // Redirige vers le reçu de l'analyse
  }

  payementAnalyse(analyseId: number): void {
    // Rediriger vers le composant de paiement avec l'ID du ticket
    this.router.navigate(['/payer-analyse', analyseId]);
  }

  isMedecin(): boolean {
    return this.authService.isUserMedecin();
  }

}
