import { Component } from '@angular/core';
import { Router } from 'express';
import { Analyse } from '../interfaces/analyse.model';
import { AnalyseService } from '../service/analyse.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';



@Component({
  selector: 'app-analyse-liste',
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
  templateUrl: './analyse-liste.component.html',
  styleUrl: './analyse-liste.component.css'
})

export class AnalyseListeComponent {

  analyses: Analyse[] = [];

  constructor(
    private analyseService: AnalyseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAnalyses();
  }

  loadAnalyses() {
    this.analyseService.getAllAnalyses().subscribe(
      (analyses) => {
        this.analyses = analyses;
      },
      (error) => {
        console.error('Erreur lors du chargement des analyses :', error);
      }
    );
  }

 
  payerAnalyse(analyse: Analyse) {
    this.analyseService.payerAnalyse(analyse.id).subscribe(
      (response) => {
        console.log('Paiement réussi:', response.message);
       
        this.loadAnalyses();
      },
      (error) => {
        console.error('Erreur lors du paiement de l\'analyse :', error);
      }
    );
  }


}
