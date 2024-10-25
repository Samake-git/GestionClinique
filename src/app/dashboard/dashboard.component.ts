
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TicketService } from '../service/ticket.service';
import { MatIcon } from '@angular/material/icon';
import { Ticket } from '../interfaces/ticket.model';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule, MatIcon,CommonModule, MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  dataSource = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = ['numero', 'description', 'etat'];
  tickets: Ticket[] = []; 

   // Propriétés pour les valeurs affichées dans les cartes
   totalAnalyses: number = 0; 
   totalTickets: number = 0;
   totalPatients: number = 0; 
   budget: number = 10000; // Donnée temporaire

  // Données pour le graphique doughnut
  public doughnutData: any;
  public doughnutOptions: any;
  
  // Données pour le graphique linéaire
  public lineData: any;
  public lineOptions: any;
  public lineChartData: number[] = []; // Représente les valeurs des tickets
  public lineChartLabels: string[] = []; // Représente les dates
  
  constructor(private ticketService: TicketService, private router: Router, private authService: AuthService) {


     // Configuration des options du graphique doughnut
     this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
  

    // Configuration des options du graphique linéaire
    this.lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Jours',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Nombre de Tickets',
          },
        },
      },
    };
  }

  ngOnInit(): void {
    this.loadTicketsByDate();
    this.loadTicketStates();
    this.loadTotalTickets();
    this.loadTickets();
    this.loadTotalPatients()
  }

  // Charger les tickets par date et mettre à jour le graphique
  loadTicketsByDate() {
    this.ticketService.getTicketsByCreationDate().subscribe((data: any) => {
      this.lineChartLabels = Object.keys(data); // Les dates
      this.lineChartData = Object.values(data); // Le nombre de tickets par jour

      // Mettre à jour les données du graphique linéaire
      this.lineData = {
        labels: this.lineChartLabels, // Les dates
        datasets: [
          {
            label: 'Tickets par jour',
            data: this.lineChartData, // Le nombre de tickets
            fill: false,
            borderColor: '#FFA726',
            tension: 0.1,
          },
        ],
      };
    });
  }


   // Charger les états des tickets et mettre à jour le graphique doughnut
   loadTicketStates() {
    // On récupère les différents états des tickets (en attente, en cours, traités)
    Promise.all([
      this.ticketService.getTicketsEnAttente().toPromise(),
      this.ticketService.getTicketsEnCours().toPromise(),
      this.ticketService.getTicketsTraites().toPromise()
    ]).then(([enAttente, enCours, traites]) => {
      // Mettre à jour les données du graphique doughnut avec les valeurs récupérées
      this.doughnutData = {
        labels: ['En attente', 'En cours', 'Traités'],
        datasets: [
          {
            data: [enAttente, enCours, traites],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
    }).catch(error => {
      console.error("Erreur lors du chargement des états des tickets : ", error);
    });
  }


   // Charger le total des tickets depuis l'API
   loadTotalTickets() {
    this.ticketService.getTotalTickets().subscribe((total: number) => {
      this.totalTickets = total;
    }, error => {
      console.error("Erreur lors du chargement du total des tickets : ", error);
    });
  }


    // Charger le total des tickets depuis l'API
    loadTotalPatients() {
      this.ticketService.getTotalPatients().subscribe((total: number) => {
        this.totalPatients = total;
      }, error => {
        console.error("Erreur lors du chargement du total des tickets : ", error);
      });
    }


  // Charger la liste des tickets

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (data) => {
        this.tickets = data; // Vérifiez que 'data' contient les tickets attendus
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets', error);
      }
    );
  }

  goToListeAnalyse() {
    this.router.navigate(['/liste-analyse']); // Remplacez '/liste-analyse' par le bon chemin de votre route
  }

   // Méthodes pour gérer les actions des tickets
   prendreEnCharge(ticket: Ticket) {
    // Logique pour prendre en charge le ticket
    console.log('Prendre en charge:', ticket);
  }

  traiter(ticket: Ticket) {
    // Logique pour traiter le ticket
    console.log('Traiter:', ticket);
  }

  isAdmin(): boolean {
    return this.authService.isUserAdmin();
  }
  
  isMedecin(): boolean {
    return this.authService.isUserMedecin();
  }

  isReceptionniste (): boolean{
    return this.authService.isUserReceptionniste();
  }

  isLaborantin   (): boolean {
    return this.authService.isUserLaborantin();
  }


}
