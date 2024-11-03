import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { PatientService } from '../../service/patient.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ajouter-patient',
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
  templateUrl: './ajouter-patient.component.html',
  styleUrl: './ajouter-patient.component.css'
})
export class AjouterPatientComponent {

  patientForm!: FormGroup;
  selectedFile!: File;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<AjouterPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Pour passer des données si nécessaire
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.patientForm.patchValue(this.data); // Préremplir le formulaire
    }
  }

  initForm(): void {
    this.patientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      sexe: ['', Validators.required],
      adresse: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      poids: ['', Validators.required],
      ethnie: ['', Validators.required],
      photos: [null]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.patientForm.patchValue({ photos: this.selectedFile });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patient = this.patientForm.value;

      if (this.isEditMode) {
        patient.id = this.data.id; // Ajoutez l'ID pour la mise à jour
        this.patientService.updatePatient(patient, this.selectedFile).subscribe(
          response => {
            console.log('Patient modifié avec succès', response);
            this.dialogRef.close(); // Ferme la modale après succès
          },
          error => {
            console.error('Erreur lors de la modification du patient', error);
          }
        );
      } else {
        this.patientService.addPatient(patient, this.selectedFile).subscribe(
          response => {
            console.log('Patient ajouté avec succès', response);
            this.dialogRef.close(); // Ferme la modale après succès
          },
          error => {
            console.error('Erreur lors de l\'ajout du patient', error);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Ferme la modale en cas d'annulation
  }

}
