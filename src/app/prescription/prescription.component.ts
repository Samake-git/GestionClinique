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
import { Router } from '@angular/router';
import { Prescription, PrescriptionDetail } from '../interfaces/prescription.model';
import { OrdonnanceDialogComponent } from '../ordonnance-dialog/ordonnance-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  prescriptions: Prescription[] = [];
  selectedPrescription?: Prescription; // Pour stocker l'ordonnance sélectionnée
  prescriptionDetails: PrescriptionDetail[] = []; // Détails de l'ordonnance

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.prescriptionForm = this.fb.group({
      patientId: ['', Validators.required],
      prescription: this.fb.group({
        commentaire: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadPrescriptions();
  }

  loadPatients() {
    this.prescriptionService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients:', error);
      },
    });
  }

  loadPrescriptions() {
    this.prescriptionService.getAllPrescriptions().subscribe({
      next: (data) => {
        this.prescriptions = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des prescriptions:', error);
      },
    });
  }


submitForm() {
  if (this.prescriptionForm.valid) {
    const formData = this.prescriptionForm.value;
    const payload = {
      patient: { id: formData.patientId },  // Adapter à la structure attendue
      commentaire: formData.prescription.commentaire,
    };

    this.prescriptionService.createPrescription(payload).subscribe(
      (response) => {
        console.log('Prescription créée', response);
        this.prescriptionForm.reset();
      },
      (error) => console.error('Erreur lors de la création de la prescription', error)
    );
  }
}



 // Nouvelle méthode pour afficher les détails de l'ordonnance
 viewPrescriptionDetails(id: number) {
  this.prescriptionService.getPrescriptionById(id).subscribe((data) => {
    this.selectedPrescription = data;
    this.prescriptionService.getPrescriptionDetails(id).subscribe((details) => {
      this.dialog.open(OrdonnanceDialogComponent, {
        data: { prescription: this.selectedPrescription, details: details },
        width: '600px', // Ajustez la largeur si nécessaire
        maxHeight: '80vh', // Limiter la hauteur pour permettre le défilement
        panelClass: 'ordonnance-dialog' // Classe pour le style
      });
    });
  });
}


  // Méthodes pour modifier et supprimer les prescriptions
  editPrescription(id: number) {
    // Logique pour modifier la prescription (par exemple, ouvrir un formulaire de modification)
    console.log(`Modifier la prescription avec ID: ${id}`);
  }

deletePrescription(id: number) {
  // Logique pour supprimer la prescription
  this.prescriptionService.deletePrescription(id).subscribe(
    () => {
      console.log('Prescription supprimée');
      this.loadPrescriptions(); // Recharger la liste après suppression
    },
    (error) => console.error('Erreur lors de la suppression de la prescription', error)
  );
}


 // prescription.component.ts
  navigateToAddDetail(prescriptionId: number) {
    this.router.navigate(['/prescription-detail', prescriptionId]);
  }


}