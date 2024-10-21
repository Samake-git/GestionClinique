import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../service/departement.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Department } from '../interfaces/department.model';


@Component({
  selector: 'app-departement',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,],
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.css'
})
export class DepartementComponent implements OnInit {

  departmentForm: FormGroup;
  departments: any[] = [];
  selectedDepartment: Department | null = null; 

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackBar: MatSnackBar
  ) {
    this.departmentForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.loadDepartments(); 
  }

  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe(
      (data) => {
        this.departments = data; 
        console.log(this.departments); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des départements', error);
      }
    );
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const departmentData: Department = {
        nom: this.departmentForm.value.nom,
        description: this.departmentForm.value.description,
      };
  
      if (this.selectedDepartment) {
        departmentData.id = this.selectedDepartment.id; // Inclure l'ID pour la mise à jour
  
        this.departmentService.updateDepartment(departmentData).subscribe({
          next: (response) => {
            this.snackBar.open('Département modifié avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadDepartments(); // Rafraîchir la liste
            this.departmentForm.reset();
            this.selectedDepartment = null; // Réinitialiser la sélection
          },
          error: (errorMessage) => {
            this.snackBar.open(`Erreur: ${errorMessage}`, 'Fermer', {
              duration: 3000,
            });
          },
        });
      } else {
        // Création d'un nouveau département
        this.departmentService.createDepartment(departmentData).subscribe({
          next: (response) => {
            this.snackBar.open('Département ajouté avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadDepartments(); // Rafraîchir la liste
            this.departmentForm.reset();
          },
          error: (errorMessage) => {
            this.snackBar.open(`Erreur: ${errorMessage}`, 'Fermer', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this.snackBar.open('Formulaire non valide', 'Fermer', {
        duration: 3000,
      });
    }
  }


  editDepartment(department: any): void {
    this.selectedDepartment = department; // Stocker le département sélectionné
    this.departmentForm.patchValue({
      nom: department.nom, // Remplir le formulaire avec les données existantes
      description: department.description,
    });
  }

  deleteDepartment(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          this.snackBar.open('Département supprimé avec succès', 'Fermer', {
            duration: 3000,
          });
          this.loadDepartments(); // Rafraîchir la liste
        },
        error: (errorMessage) => {
          this.snackBar.open(`Erreur: ${errorMessage}`, 'Fermer', {
            duration: 3000,
          });
        },
      });
    }
  }

 

}
