import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PrescriptionService } from '../service/prescription.service';
import { Patient } from '../interfaces/patient.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatOption,],
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
 
})
export class PrescriptionComponent implements OnInit {
  prescriptionForm: FormGroup;
  patients: Patient[] = []; 

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService, 
  ) {
    this.prescriptionForm = this.fb.group({
      patientId: ['', Validators.required],
      prescription: this.fb.group({
        commentaire: ['', Validators.required],
      }),
      details: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    console.log('Chargement des patients...');
    this.prescriptionService.getAllPatients().subscribe({
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

  get details(): FormArray {
    return this.prescriptionForm.get('details') as FormArray;
  }

  addDetail() {
    const detailGroup = this.fb.group({
      nomMedicament: ['', Validators.required],
      dosage: ['', Validators.required],
      frequence: ['', Validators.required],
      duree: ['', Validators.required],
      instructions: ['', Validators.required],
      datePremierDose: ['', Validators.required],
      heurePremierDose: ['', Validators.required],
    });
    this.details.push(detailGroup);
  }

  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  submitForm() {
    if (this.prescriptionForm.valid) {
      const formData = this.prescriptionForm.value;
      const payload = {
        patientId: formData.patientId,
        prescription: formData.prescription,
        details: formData.details,
      };

      this.prescriptionService.createPrescription(payload).subscribe(
        (response) => {
          console.log('Prescription créée', response);
          this.prescriptionForm.reset();
          this.details.clear(); // Réinitialiser les détails
        },
        (error) => console.error('Erreur lors de la création de la prescription', error)
      );
    }
  }
}