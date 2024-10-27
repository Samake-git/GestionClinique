// prescription-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionService } from '../service/prescription.service';
import { PrescriptionDetail } from '../interfaces/prescription.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prescription-detail',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatOption,],
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  detailForm: FormGroup;
  prescriptionId?: number;
  prescriptionDetails: PrescriptionDetail[] = [];
  isEditing: boolean = false; // État d'édition
  currentDetailId?: number; // ID du détail en cours d'édition

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService
  ) {
    this.detailForm = this.fb.group({
      nomMedicament: ['', Validators.required],
      dosage: ['', Validators.required],
      frequence: ['', Validators.required],
      duree: ['', Validators.required],
      instructions: ['', Validators.required],
      datePremierDose: ['', Validators.required],
      heurePremierDose: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.prescriptionId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPrescriptionDetails();
  }


  loadPrescriptionDetails() {
    if (this.prescriptionId) {
        this.prescriptionService.getPrescriptionDetails(this.prescriptionId).subscribe(
            details => {
                // Si details est un objet unique, le transformer en tableau
                if (!Array.isArray(details)) {
                    this.prescriptionDetails = [details]; // Envelopper dans un tableau
                } else {
                    this.prescriptionDetails = details; // Assigner directement si c'est déjà un tableau
                }

                // Convertir heurePremierDose en objet Date
                this.prescriptionDetails = this.prescriptionDetails.map(detail => ({
                    ...detail,
                    heurePremierDose: new Date(`1970-01-01T${detail.heurePremierDose}`) // Créer un objet Date
                }));

                console.log('Détails de prescription chargés:', this.prescriptionDetails);
            },
            error => console.error('Erreur lors du chargement des détails de prescription', error)
        );
    }
}

  editDetail(id: number) {
    // Trouver le détail à modifier
    const detail = this.prescriptionDetails.find(d => d.id === id);
    if (detail) {
      this.currentDetailId = id; // Stocker l'ID du détail en cours d'édition
      this.isEditing = true; // Passer en mode édition
      this.detailForm.patchValue({
        nomMedicament: detail.nomMedicament,
        dosage: detail.dosage,
        frequence: detail.frequence,
        duree: detail.duree,
        instructions: detail.instructions,
        datePremierDose: detail.datePremierDose,
        heurePremierDose: detail.heurePremierDose,
      });
    }
  }


 submitDetail() {
    if (this.isEditing && this.currentDetailId) {
        // Mettre à jour le détail existant
        const updatedDetail: PrescriptionDetail = {
            id: this.currentDetailId,
            ...this.detailForm.value
        };
        this.prescriptionService.updatePrescriptionDetail(this.currentDetailId, updatedDetail).subscribe(() => {
            this.loadPrescriptionDetails(); // Recharger les détails
            this.resetForm(); // Réinitialiser le formulaire
        });
    } else {
        // Logique pour créer un nouveau détail
        this.prescriptionService.createPrescriptionDetail(this.detailForm.value).subscribe(() => {
            this.loadPrescriptionDetails(); // Recharger les détails
            this.resetForm(); // Réinitialiser le formulaire
        });
    }
}


 

  deleteDetail(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce détail ?')) {
      this.prescriptionService.deletePrescriptionDetail(id).subscribe(
        () => {
          console.log(`Détail avec ID ${id} supprimé`);
          this.loadPrescriptionDetails(); // Recharger les détails après suppression
        },
        error => console.error('Erreur lors de la suppression du détail de prescription', error)
      );
    }

  }


  resetForm() {
    this.detailForm.reset();
    this.isEditing = false; // Revenir à l'état normal
    this.currentDetailId = undefined; // Réinitialiser l'ID
  }


}