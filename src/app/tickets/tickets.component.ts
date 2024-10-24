// tickets.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MotifConsultationService } from '../service/motifconsultation.service';
import { TicketService } from '../service/ticket.service';
import { MotifConsultation } from '../interfaces/motifconsultation.model';
import { Ticket } from '../interfaces/ticket.model';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
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
    ReactiveFormsModule,

  ],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  motifConsultationForm: FormGroup;
  motifConsultation: MotifConsultation[] = [];
  ticketForm: FormGroup;
  tickets: Ticket[] = [];
  selectedTicket: Ticket | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private motifConsultationService: MotifConsultationService,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    // Initialisation des formulaires
    this.motifConsultationForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      prix: ['', [Validators.required, Validators.min(0)]],
    });
      this.ticketForm = this.fb.group({
      description: ['', Validators.required],
      tel: ['', Validators.required],
      motifConsultationId: [null, Validators.required],
      });
  }

  ngOnInit(): void {
    this.loadMotifConsultations();
    this.loadTickets();
  }


  loadMotifConsultations(): void {
    this.motifConsultationService.getAllmotifconsultations().subscribe(
      (data) => {
        this.motifConsultation = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des motifs de consultation', error);
      }
    );
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets', error);
      }
    );
  }

  // Méthode pour ajouter ou modifier selon le mode
  onSubmitTicket(): void {
    if (this.ticketForm.valid) {
      if (this.isEditMode) {
        this.updateTicket();
      } else {
        this.createTicket();
      }
    } else {
      this.snackBar.open('Veuillez remplir tous les champs requis.', 'Fermer', {
        duration: 3000,
      });
    }
  }

  createTicket(): void {
    const selectedMotif = this.motifConsultation.find(m => m.id === this.ticketForm.value.motifConsultationId);
  
    const ticketData: Ticket = {
      id: 0,
      description: this.ticketForm.value.description,
      tel: this.ticketForm.value.tel,
      motifConsultation: {
        id: selectedMotif?.id || 0, // Assurez-vous d'utiliser l'ID valide
        prix: selectedMotif?.prix || 0, // Assurez-vous d'utiliser le prix valide
        description: selectedMotif?.description || '', // Assurez-vous d'utiliser la description valide
        nom: selectedMotif?.nom || '' // Assurez-vous d'utiliser le nom valide
      }
    };
  
    this.ticketService.createTicket(ticketData).subscribe(
      () => {
        this.snackBar.open('Ticket ajouté avec succès', 'Fermer', {
          duration: 3000,
        });
        this.loadTickets();
        this.resetForm();
      },
      (error) => {
        this.snackBar.open(`Erreur lors de l'ajout: ${error.message || error}`, 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  editTicket(ticket: Ticket): void {
    this.selectedTicket = ticket;
    this.isEditMode = true;  // Active bien le mode édition

    // Remplir le formulaire avec les données du ticket sélectionné
    this.ticketForm.patchValue({
      description: ticket.description,
      tel: ticket.tel,
      motifConsultationId: ticket.motifConsultation.id
    });
  }


  updateTicket(): void {
    if (this.selectedTicket) {
      const selectedMotif = this.motifConsultation.find(m => m.id === this.ticketForm.value.motifConsultationId);
  
      const updatedTicket: Ticket = {
        id: this.selectedTicket.id,
        description: this.ticketForm.value.description,
        tel: this.ticketForm.value.tel,
        etat: this.selectedTicket.etat || 'Attente',  // Garder l'état actuel
        motifConsultation: {
          id: selectedMotif?.id || 0, // Assurez-vous d'utiliser l'ID valide
          prix: selectedMotif?.prix || 0, // Assurez-vous d'utiliser le prix valide
          description: selectedMotif?.description || '', // Assurez-vous d'utiliser la description valide
          nom: selectedMotif?.nom || '' // Assurez-vous d'utiliser le nom valide
        }
      };
  
      console.log('Ticket à mettre à jour : ', updatedTicket);
  
      this.ticketService.updateTicket(updatedTicket).subscribe(
        () => {
          this.snackBar.open('Ticket modifié avec succès', 'Fermer', {
            duration: 3000,
          });
          this.loadTickets();  // Recharger la liste des tickets
          this.resetForm();  // Réinitialiser le formulaire après soumission
        },
        (error) => {
          console.error('Erreur lors de la modification du ticket : ', error);
          this.snackBar.open(`Erreur lors de la modification: ${error}`, 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }



  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(
      () => {
        this.snackBar.open('Ticket supprimé avec succès', 'Fermer', {
          duration: 3000,
        });
        this.loadTickets();
        this.cdr.detectChanges(); // Force la détection des changements ici
      },
      (error) => {
        this.snackBar.open(`Erreur lors de la suppression: ${error.message || error}`, 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

  resetForm(): void {
    this.isEditMode = false; // Sort du mode édition
    this.selectedTicket = null;
    this.ticketForm.reset(); // Réinitialise le formulaire
  }

  onMotifConsultationChange(event: any): void {
    this.ticketForm.get('motifConsultationId')?.setValue(event.value);
  }

  payerTicket(ticketId: number): void {
    // Rediriger vers le composant de paiement avec l'ID du ticket
    this.router.navigate(['/payer-ticket', ticketId]);
  }

}
