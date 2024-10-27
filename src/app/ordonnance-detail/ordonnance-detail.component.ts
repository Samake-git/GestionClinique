import { Component, Input } from '@angular/core';
import { Prescription, PrescriptionDetail } from '../interfaces/prescription.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ordonnance-detail',
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
  templateUrl: './ordonnance-detail.component.html',
  styleUrls: ['./ordonnance-detail.component.css'],
})
export class OrdonnanceDetailComponent {
  @Input() prescription!: Prescription;
  @Input() prescriptionDetails!: PrescriptionDetail[];

  printOrdonnance() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ordonnance</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1, h2 { text-align: center; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 10px; border: 1px solid #ddd; }
              th { background-color: #3498db; color: white; }
              h3 { margin-top: 20px; }
              ul { list-style-type: none; padding: 0; }
              li { padding: 5px 0; border-bottom: 1px solid #ccc; }
            </style>
          </head>
          <body>
            <h1>Ordonnance</h1>
           
            <h3>Informations du Patient:</h3>
            <p>Âge: ${this.prescription.patient?.age} Poids: ${this.prescription.patient?.poids} Tel: ${this.prescription.patient?.phone} Adresse: ${this.prescription.patient?.adresse} Sexe: ${this.prescription.patient?.sexe}</p>
            <h3>Informations du Prescriptaire:</h3>
            <p> Nom: ${this.prescription.medecin?.nom} Prenom ${this.prescription.medecin?.prenom} Spécialité: ${this.prescription.medecin?.specialite} Tel: ${this.prescription.medecin?.phone} </p>
            <h4>Commentaire: ${this.prescription.commentaire}  Date prescription : ${this.prescription.datePrescription}</h4>
            <h3>Détails de la Prescription:</h3>
            <ul>
              ${this.prescriptionDetails.map(detail =>
                `<li>${detail.nomMedicament} - ${detail.dosage} - ${detail.frequence} - ${detail.duree} - ${detail.instructions}</li>`
              ).join('')}
            </ul>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  downloadOrdonnance() {
    const blob = new Blob([`
      Ordonnance
      Patient: ${this.prescription.patient?.nom} ${this.prescription.patient?.prenom}
      Âge: ${this.prescription.patient?.age} Poids: ${this.prescription.patient?.poids} Tel: ${this.prescription.patient?.phone} Adresse: ${this.prescription.patient?.adresse} Sexe: ${this.prescription.patient?.sexe} Ethnie: ${this.prescription.patient?.ethnie}
      Médecin: ${this.prescription.medecin?.nom} ${this.prescription.medecin?.prenom}
      Commentaire: ${this.prescription.commentaire}
      Détails de la Prescription:
      ${this.prescriptionDetails.map(detail =>
        `${detail.nomMedicament} - ${detail.dosage} - ${detail.frequence} - ${detail.duree} - ${detail.instructions}`
      ).join('\n')}
    `], { type: 'text/plain' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ordonnance.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}