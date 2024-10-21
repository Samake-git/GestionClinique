import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MotifConsultation } from '../interfaces/motifconsultation.model';
import { MotifConsultationService } from '../service/motifconsultation.service';


@Component({
  selector: 'app-motifconsultation',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatOption,],
  templateUrl: './motifconsultation.component.html',
  styleUrl: './motifconsultation.component.css'
})
export class MotifconsultationComponent implements OnInit {

  MotifconsultationForm: FormGroup;
  motifconsultations: MotifConsultation[] = [];
  selectedMotifconsultation: MotifConsultation | null = null;


  constructor(
    private fb: FormBuilder,
    private motifConsultationService: MotifConsultationService,
    private snackBar: MatSnackBar
  ) {
    this.MotifconsultationForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: ['', [Validators.required, Validators.min(0)]],
    });

  }

  ngOnInit(): void {
    this.loadMotifconsultations();
  }

  loadMotifconsultations(): void {
    console.log('Chargement des motifs de consultation...');
    this.motifConsultationService.getAllmotifconsultations().subscribe(
      (data) => {
        this.motifconsultations = data; 
        console.log('Motifs chargés:', this.motifconsultations); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des motifs de consultation', error);
      }
    );
  }


  // Gestion des motifs de consultation
  onSubmitMotif(): void {
    if (this.MotifconsultationForm.valid) {
      if (this.selectedMotifconsultation) {
        this.updateMotifconsultation();
      } else {
        this.createMotifconsultation();
      }
    }
  }

  createMotifconsultation(): void {
    this.motifConsultationService.createMotifconsultation(this.MotifconsultationForm.value).subscribe(
      () => {
        this.snackBar.open('Motif de consultation ajouté avec succès', 'Fermer', {
          duration: 3000,
        });
        this.loadMotifconsultations();
        this.MotifconsultationForm.reset();
      },
      (error) => {
        this.snackBar.open(`Erreur lors de l'ajout: ${error}`, 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  editMotifconsultation(motifconsultation: MotifConsultation): void {
    this.selectedMotifconsultation = motifconsultation;
    this.MotifconsultationForm.patchValue(motifconsultation);
  }

  updateMotifconsultation(): void {
    if (this.selectedMotifconsultation) {
      this.motifConsultationService.updateMotifconsultation({ 
        ...this.selectedMotifconsultation, 
        ...this.MotifconsultationForm.value 
      }).subscribe(
        () => {
          this.snackBar.open('Motif de consultation modifié avec succès', 'Fermer', {
            duration: 3000,
          });
          this.loadMotifconsultations();
          this.MotifconsultationForm.reset();
          this.selectedMotifconsultation = null; // Réinitialiser après édition
        },
        (error) => {
          this.snackBar.open(`Erreur lors de la modification: ${error}`, 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

  deleteMotifconsultation(id: number): void {
    this.motifConsultationService.deleteMotifconsultation(id).subscribe(
      () => {
        this.snackBar.open('Motif de consultation supprimé avec succès', 'Fermer', {
          duration: 3000,
        });
        this.loadMotifconsultations();
      },
      (error) => {
        this.snackBar.open(`Erreur lors de la suppression: ${error}`, 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

}
