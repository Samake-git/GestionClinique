import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../interfaces/ticket.model';
import { TicketService } from '../service/ticket.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-recupayement',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatOption,],
  templateUrl: './recupayement.component.html',
  styleUrl: './recupayement.component.css'
})
export class RecupayementComponent {
  ticket: Ticket | null = null;

  constructor(private route: ActivatedRoute, private ticketService: TicketService) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    if (ticketId) {
      this.ticketService.getTicketById(+ticketId).subscribe(ticket => {
        this.ticket = ticket;
      });
    }
  }

  imprimerRecu(): void {
    const printContents = document.getElementById('recu-content')?.innerHTML; // Récupère le contenu à imprimer
    const originalContents = document.body.innerHTML; // Sauvegarde le contenu original du body

    // Ouvre une nouvelle fenêtre pour l'impression
    const popup = window.open('', '_blank', 'width=600,height=600');
    if (popup) {
        popup.document.open();
        popup.document.write(`
            <html>
                <head>
                    <title>Impression du Reçu</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            padding: 0;
                            color: #333;
                        }
                        h2 {
                            text-align: center;
                            font-size: 24px;
                            margin-bottom: 20px;
                        }
                        p {
                            font-size: 18px;
                            line-height: 1.6;
                        }
                        strong {
                            font-weight: bold;
                        }
                        .footer {
                            margin-top: 30px;
                            text-align: center;
                            font-size: 16px;
                            border-top: 1px solid #ccc;
                            padding-top: 10px;
                        }
                    </style>
                </head>
                <body onload="window.print(); window.close();">
                    ${printContents}
                    <div class="footer">Merci de votre paiement!</div>
                </body>
            </html>
        `);
        popup.document.close();
    }
}
 

}
