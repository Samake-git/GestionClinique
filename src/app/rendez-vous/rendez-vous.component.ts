import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendezVous } from '../interfaces/rendez-vous.model';
import { RendezVousService } from '../service/rendez-vous.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importer MatSnackBar

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatOption,
  ],
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css'] // Corriger `styleUrl` en `styleUrls`
})
export class RendezVousComponent {
  rendezVousList: RendezVous[] = [];
  emploiDuTempsId!: number; // Valeur par défaut

  constructor(
    private route: ActivatedRoute,
    private rendezVousService: RendezVousService,
    private snackBar: MatSnackBar // Injecter MatSnackBar
  ) {}

  ngOnInit() {
    this.emploiDuTempsId = Number(this.route.snapshot.paramMap.get('id'));
    this.getRendezVous();
  }

  getRendezVous() {
    this.rendezVousService.obtenirRendezVousParEmploiDuTemps(this.emploiDuTempsId).subscribe(rendezVous => {
      this.rendezVousList = rendezVous;
    });
  }

  validerRendezVous(id: number) {
    this.rendezVousService.validerRendezVous(id).subscribe({
      next: () => {
        this.showSnackbar('Rendez-vous validé avec succès !', 'Fermer');
        this.getRendezVous(); // Rafraîchir la liste
      },
      error: (err) => {
        console.error('Erreur lors de la validation du rendez-vous', err);
        this.showSnackbar('Erreur lors de la validation du rendez-vous', 'Fermer');
      }
    });
  }

  annulerRendezVous(id: number) {
    this.rendezVousService.annulerRendezVous(id).subscribe({
      next: () => {
        this.showSnackbar('Rendez-vous annulé avec succès !', 'Fermer');
        this.getRendezVous(); // Rafraîchir la liste
      },
      error: (err) => {
        console.error('Erreur lors de l\'annulation du rendez-vous', err);
        this.showSnackbar('Erreur lors de l\'annulation du rendez-vous', 'Fermer');
      }
    });
  }

  // Méthode pour afficher le Snackbar
  private showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // Durée d'affichage en millisecondes
    });
  }
}