import { Component } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Patient } from '../interfaces/patient.model';
import { PatientService } from '../service/patient.service';
import { AjouterPatientComponent } from './ajouter-patient/ajouter-patient.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-patient',
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
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  patients: Patient[] = []; 

  constructor(private dialog: MatDialog, private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getPatients().subscribe(data => {
      this.patients = data;
    });
  }

  openDialog(patient?: Patient): void {
    const dialogRef = this.dialog.open(AjouterPatientComponent, {
      width: '600px',
      data: patient // Passer les données du patient à modifier, si nécessaire
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPatients(); // Rechargez la liste des patients après la fermeture du dialogue
    });
  }

  editPatient(patient: Patient): void {
    this.openDialog(patient); // Ouvrir le dialogue en mode édition
  }

  deletePatient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce patient ?')) {
      this.patientService.deletePatient(id).subscribe(() => {
        this.loadPatients(); // Rechargez la liste après la suppression
      });
    }
  }


}
