import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { EmploiDuTemps } from '../interfaces/emploi-du-temps.model';
import { EmploiDuTempsService } from '../service/emploi-du-temps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emplois-du-temps',
  standalone: true,
  imports: [  CommonModule,
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
  templateUrl: './emplois-du-temps.component.html',
  styleUrls: ['./emplois-du-temps.component.css'] // Correction ici
})
export class EmploisDuTempsComponent {
  emploisDuTemps: EmploiDuTemps[] = [];
  emploiForm: FormGroup;
  isEditing = false;
  confirmationMessage: string | null = null; // Pour stocker le message de confirmation

  constructor(private emploiDuTempsService: EmploiDuTempsService, private fb: FormBuilder, private router: Router) {
    this.emploiForm = this.fb.group({
      id: [null],
      jour: ['', Validators.required],
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmploisDuTemps();
  }

  loadEmploisDuTemps(): void {
    this.emploiDuTempsService.afficherDisponibilitesMedecin().subscribe(data => {
      this.emploisDuTemps = data;
    });
  }

  openEdit(emploiDuTemps: EmploiDuTemps): void {
    this.isEditing = true;
    const formattedDate = this.formatDateToDDMMYYYY(emploiDuTemps.jour);
    emploiDuTemps.jour = formattedDate; // Met à jour la date
    this.emploiForm.patchValue(emploiDuTemps);
  }

// Méthode pour formater la date au format dd/MM/yyyy
private formatDateToDDMMYYYY(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`; // Convertit yyyy-MM-dd en dd/MM/yyyy
}

onSubmit(): void {
  if (this.emploiForm.valid) {
      const emploiDuTemps: EmploiDuTemps = {
          ...this.emploiForm.value,
          jour: this.formatDateToDDMMYYYY(this.emploiForm.value.jour) // Conversion au format attendu
      };

      const request = this.isEditing && emploiDuTemps.id
          ? this.emploiDuTempsService.modifierDisponibilite(emploiDuTemps.id, emploiDuTemps)
          : this.emploiDuTempsService.ajouterDisponibilite(emploiDuTemps);

      request.subscribe({
          next: () => {
              this.loadEmploisDuTemps();
              this.resetForm();
              this.confirmationMessage = this.isEditing ? 'Emploi du temps modifié avec succès!' : 'Emploi du temps ajouté avec succès!';
          },
          error: (err) => {
              this.confirmationMessage = err.error.message || 'Une erreur est survenue. Veuillez réessayer.';
          }
      });
    }

      setTimeout(() => {
        this.confirmationMessage = null;
      }, 3000);
    }
  

  resetForm(): void {
    this.isEditing = false;
    this.emploiForm.reset();
  }

  deleteEmploiDuTemps(id: number): void {
    this.emploiDuTempsService.supprimerDisponibilite(id).subscribe(() => {
      this.loadEmploisDuTemps();
      this.confirmationMessage = 'Emploi du temps supprimé avec succès!';
      setTimeout(() => {
        this.confirmationMessage = null;
      }, 3000);
    });
  }

  viewRendezVous(emploiId: number) {
    this.router.navigate(['/rendezvous', emploiId]); // Assurez-vous que la route est correcte
}

}
