import { Component } from '@angular/core';
import { Analyse } from '../interfaces/analyse.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Corrigé : import d'Angular Router
import { AnalyseService } from '../service/analyse.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-analyse-payement',
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
  templateUrl: './analyse-payement.component.html',
  styleUrls: ['./analyse-payement.component.css'] // Corrigé : 'styleUrls' au lieu de 'styleUrl'
})
export class AnalysePayementComponent {
  analyseId: number;
  analyses: Analyse[] = [];
  errorMessage: string | null = null;
  selectedAnalyse: Analyse | null = null;

  constructor(
    private route: ActivatedRoute,
    private analyseService: AnalyseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { 
    this.analyseId = -1;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.analyseId = +id; // Convertir en nombre
      this.loadAnalyses();
    } else {
      this.errorMessage = 'ID d\'analyse non valide';
    }
  }

  loadAnalyses(): void {
    this.analyseService.getAllAnalyses().subscribe(
      (analyses) => {
        this.analyses = analyses;

        // Trouver l'analyse sélectionnée par ID
        this.selectedAnalyse = analyses.find(a => a.id === this.analyseId) || null;
        if (!this.selectedAnalyse) {
          this.errorMessage = 'Analyse non trouvée';
        }
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des analyses.';
        console.error('Erreur lors du chargement des analyses :', error);
        this.snackBar.open(this.errorMessage, 'Fermer', {
          duration: 3000,
        });
      }
    );
  }


  payerAnalyse(): void { // Corrigé : Syntaxe de la méthode
    if (this.analyseId !== -1) {
      this.analyseService.payerAnalyse(this.analyseId).subscribe( // Corrigé : Utiliser this.analyseId
        response => {
          console.log('Paiement effectué avec succès:', response);
          this.snackBar.open('Paiement effectué avec succès !', 'Fermer', {
            duration: 3000, // Durée d'affichage en millisecondes
          });
        },
        error => {
          console.error('Erreur lors du paiement de l\'analyse:', error);
          this.snackBar.open('Erreur lors du paiement. Veuillez réessayer.', 'Fermer', {
            duration: 3000,
          });
        }
      );
    } else {
      this.errorMessage = 'ID d\'analyse non valide';
    }
  }
}