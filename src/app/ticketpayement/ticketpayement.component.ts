import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Ticket } from '../interfaces/ticket.model';
import { TicketService } from '../service/ticket.service';
import { MotifConsultation } from '../interfaces/motifconsultation.model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticketpayement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketpayement.component.html',
  styleUrl: './ticketpayement.component.css'
})
export class TicketpayementComponent {

  ticketId: number;
  ticket: Ticket | null = null;
  motifconsultations: MotifConsultation[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.ticketId = -1;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketId = +id; // Convertir en nombre
      this.fetchTicketDetails();
    } else {
      this.errorMessage = 'ID de ticket non valide';
    }
  }

  fetchTicketDetails(): void {
    this.ticketService.getAllTickets().subscribe(
      tickets => {
        this.ticket = tickets.find(t => t.id === this.ticketId) || null;
        if (!this.ticket) {
          this.errorMessage = 'Ticket non trouvé';
        }
      },
      error => {
        this.errorMessage = 'Erreur lors de la récupération des détails du ticket';
        console.error(error);
      }
    );
  }

  
  payerTicket(): void {
    if (this.ticketId !== -1) {
      this.ticketService.payerTicket(this.ticketId).subscribe(
        response => {
          console.log('Paiement effectué avec succès:', response);
          this.snackBar.open(response.message, 'Fermer', {
            duration: 3000,
          });
        },
        error => {
          console.error('Erreur lors du paiement du ticket:', error);
          this.errorMessage = 'Erreur lors du paiement du ticket';
        }
      );
    } else {
      this.errorMessage = 'ID de ticket non valide';
    }
  }


}
