import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Analyse } from '../interfaces/analyse.model';
import { ResultatExamen } from '../interfaces/resultatexamen.model';
import { AnalyseService } from '../service/analyse.service';
import { ResultatExamenService } from '../service/resultatExamen.service';
import { Patient } from '../interfaces/patient.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ConsultationService } from '../service/consultation.service';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-resultat-examen',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
  MatOption],
  templateUrl: './resultat-examen.component.html',
  styleUrl: './resultat-examen.component.css'
})

export class ResultatExamenComponent implements OnInit {
  patients: Patient[] = [];
  resultatExamenForm: FormGroup;
  resultatsExamen: ResultatExamen[] = [];
  analyses: Analyse[] = [];
  selectedResultat: ResultatExamen | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private resultatExamenService: ResultatExamenService,
    private analyseService: AnalyseService,
    private consultationService: ConsultationService
  ) {
    this.resultatExamenForm = this.formBuilder.group({
      id: [0],
      nomExamen: ['', Validators.required],
      resultat: ['', Validators.required],
      unite: ['', Validators.required],
      norme: ['', Validators.required],
      commentaire: [''],
      analyse: this.formBuilder.group({
        id: [null, Validators.required]
      })
    });
  }

  ngOnInit() {
    this.loadResultatsExamen();
    this.loadAnalyses();
    this.loadPatients();
  }

  loadPatients() {
    this.consultationService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des patients:', error);
      }
    });
  }

  loadResultatsExamen() {
    this.resultatExamenService.getAllResultats().subscribe(
      (resultats) => {
        this.resultatsExamen = resultats;
      },
      (error) => {
        console.error('Erreur lors du chargement des résultats d\'examen:', error);
      }
    );
  }

  loadAnalyses() {
    this.analyseService.getAllAnalyses().subscribe(
      (analyses) => {
        this.analyses = analyses;
      },
      (error) => {
        console.error('Erreur lors du chargement des analyses:', error);
      }
    );
  }

  onSubmit() {
    if (this.resultatExamenForm.valid) {
      const resultatExamen = this.resultatExamenForm.value;
      if (resultatExamen.id === 0) {
        this.resultatExamenService.createResultatExamen(resultatExamen).subscribe(
          (response) => {
            this.loadResultatsExamen();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la création du résultat d\'examen :', error);
          }
        );
      } else {
        this.resultatExamenService.updateResultatExamen(resultatExamen.id, resultatExamen).subscribe(
          (response) => {
            this.loadResultatsExamen();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du résultat d\'examen :', error);
          }
        );
      }
    }
  }

  editResultatExamen(resultat: ResultatExamen) {
    this.selectedResultat = resultat;
    this.resultatExamenForm.patchValue({
      id: resultat.id,
      nomExamen: resultat.nomExamen,
      resultat: resultat.resultat,
      unite: resultat.unite,
      norme: resultat.norme,
      commentaire: resultat.commentaire,
      analyse: { id: resultat.analyse?.id }
    });
  }

  deleteResultatExamen(id: number) {
    this.resultatExamenService.deleteResultatExamen(id).subscribe(
      () => {
        this.loadResultatsExamen();
      },
      (error) => {
        console.error('Erreur lors de la suppression du résultat d\'examen :', error);
      }
    );
  }

  resetForm() {
    this.selectedResultat = null;
    this.resultatExamenForm.reset({ id: 0, nomExamen: '', resultat: '', unite: '', norme: '', commentaire: '', analyse: { id: null } });
  }

  get analyse(): FormArray {
    return this.resultatExamenForm.get('analyse') as FormArray;
  }

}
