import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Consultation } from '../interfaces/consultation.model';
import { ConsultationService } from '../service/consultation.service';
import { Patient } from '../interfaces/patient.model';




@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
   ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.css'
})
export class ConsultationComponent {

  consultationForm: FormGroup;
  patients: Patient[] = []; 
  consultations: Consultation[] = []; 
  displayedColumns: string[] = ['description', 'note', 'actions'];
  selectedConsultation: Consultation | null = null; 

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationService,

  ) {
    this.consultationForm = this.fb.group({
      description: ['', Validators.required],
      note: ['', Validators.required],
      patientId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPatients(); 
    this.loadConsultations();
    
  }

  loadPatients() {
    console.log('Chargement des patients...');
    this.consultationService.getAllPatients().subscribe({
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


  loadConsultations() {
    console.log('Chargement des consultations...');
    this.consultationService.getAllConsultations().subscribe({
      next: (data) => {
        console.log('Consultations récupérées:', data);
        this.consultations = data;
        console.log(this.consultations);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des consultations:', error);
      }
    });
  }



onSubmit() {
  if (this.consultationForm.valid) {
      const consultationRequest: Consultation = {
          id: this.selectedConsultation ? this.selectedConsultation.id : 0, // Utilisez l'ID de la sélection
          patient: { id: this.consultationForm.value.patientId, nom: '', prenom: '' }, // Remplacez par les valeurs appropriées
          description: this.consultationForm.value.description,
          note: this.consultationForm.value.note,
          dateCreation: new Date().toISOString() // ou toute autre valeur par défaut
          // Assurez-vous d'ajouter d'autres propriétés requises ici
      };

      if (this.selectedConsultation) {
          this.consultationService
              .modifierConsultation(this.selectedConsultation.id, consultationRequest)
              .subscribe({
                  next: () => {
                      alert('Consultation modifiée avec succès!');
                      this.resetForm();
                      this.loadConsultations();
                  },
                  error: () => {
                      alert('Erreur lors de la modification de la consultation.');
                  }
              });
      } else {
          this.consultationService
              .ajouterConsultation(consultationRequest)
              .subscribe({
                  next: () => {
                      alert('Consultation ajoutée avec succès!');
                      this.resetForm();
                      this.loadConsultations();
                  },
                  error: () => {
                      alert('Erreur lors de l\'ajout de la consultation.');
                  }
              });
      }
  }
}

resetForm() {
  this.consultationForm.reset();
  this.selectedConsultation = null; // Réinitialiser l'ID
}


editConsultation(consultation: Consultation) {
  this.selectedConsultation = consultation; 
  this.consultationForm.patchValue({
      description: consultation.description,
      note: consultation.note,
      patientId: consultation.patient.id
  });
}

deleteConsultation(id: number) {
  console.log('Suppression de la consultation avec ID:', id);
  if (confirm('Êtes-vous sûr de vouloir supprimer cette consultation ?')) {
      this.consultationService.supprimerConsultation(id).subscribe({
          next: () => {
              alert('Consultation supprimée avec succès!');
              // Mettre à jour la liste localement
              this.loadConsultations;
          },
          error: (error) => {
              console.error('Erreur lors de la suppression de la consultation:', error);
              alert('Erreur lors de la suppression de la consultation.');
          }
      });
  }
}


}
