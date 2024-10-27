import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Analyse } from '../interfaces/analyse.model';
import { AnalyseService } from '../service/analyse.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recu-analyse',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,],
  templateUrl: './recu-analyse.component.html',
  styleUrl: './recu-analyse.component.css'
})
export class RecuAnalyseComponent implements OnInit{
  analyse: Analyse | null = null;

  constructor(
    private route: ActivatedRoute,
    private analyseService: AnalyseService
  ) {}

  ngOnInit(): void {
    const analyseId = this.route.snapshot.paramMap.get('id');
    if (analyseId) {
      this.analyseService.getAnalyseById(+analyseId).subscribe(
        analyse => {
          this.analyse = analyse;
        },
        error => {
          console.error('Erreur lors de la récupération de l\'analyse:', error);
        }
      );
    }
  }


  imprimerRecu(): void {
    const printContents = document.getElementById('recu-content')?.innerHTML; // Récupérer le contenu à imprimer
    const popup = window.open('', '_blank', 'width=600,height=600');
    
    if (popup) {
      popup.document.open();
      popup.document.write(`
        <html>
          <head>
            <title>Impression du Reçu</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h2 { text-align: center; }
              p { font-size: 18px; }
              strong { font-weight: bold; }
              .footer { margin-top: 30px; text-align: center; border-top: 1px solid #ccc; padding-top: 10px; }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${printContents}
            <div class="footer">Merci de votre paiement!</div>
          </body>
        </html>
      `);
      popup.document.close();
    } else {
      console.error('Impossible d\'ouvrir une nouvelle fenêtre pour l\'impression.');
    }
  }

}
