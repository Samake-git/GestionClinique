// import { Component, OnInit } from '@angular/core';
// import { ChartModule } from 'primeng/chart';
// import { TicketService } from '../service/ticket.service';
// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [ChartModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css'
// })
// export class DashboardComponent implements OnInit {

//   ngOnInit(){
//     this.loadTicketsByDate();
//     // Méthodes d'initialisation si nécessaire
//   }

  
//   // Données pour le graphique doughnut
//   public doughnutData: any;
//   public doughnutOptions: any;
//   public lineChartData: any[] = [];
//   public lineChartLabels: string[] = [];

//   // Données pour le graphique linéaire
//   public lineData: any;
//   public lineOptions: any;

//   loadTicketsByDate() {
//     this.ticketService.getTicketsByCreationDate().subscribe((data: any) => {
//       this.lineChartLabels = Object.keys(data); // Les dates
//       //this.lineChartData = [{ data: Object.values(data), label: 'Tickets par jour' }]; // Les nombres de tickets
//       this.lineChartData = Object.values(data); // Les nombres de tickets
//       console.log("data : ", data);
//       console.log("date : ", this.lineChartData);
//       console.log("label : ", this.lineChartLabels);
//     });
//   }

//   constructor(private ticketService: TicketService) {
//     // Configuration du graphique doughnut
//     this.doughnutData = {
//       labels: ['Rouge', 'Bleu', 'Jaune'],
//       datasets: [
//         {
//           data: [30, 70, 40],
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//           hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         },
//       ],
//     };

//     this.doughnutOptions = {
//       responsive: true,
//       maintainAspectRatio: false,
//     };

//     // Configuration du graphique linéaire
//     this.lineData = {
//       //labels: this.lineChartLabels,
//       //labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
//       labels: ["2024.10.21", "2024.10.22"],
//       datasets: [
      
//         {
//           label: 'Revenus',
//           //data: this.lineChartData,
//           //data: [28, 48, 40, 19, 86, 27],
//           //data: [8, 1],
//           fill: false,
//           borderColor: '#FFA726',
//           tension: 0.1,
//         },
//       ],
//     };

//     this.lineOptions = {
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Mois',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Valeur',
//           },
//         },
//       },
//     };
//   }

  
// }





import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TicketService } from '../service/ticket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  // Données pour le graphique doughnut
  public doughnutData: any;
  public doughnutOptions: any;
  
  // Données pour le graphique linéaire
  public lineData: any;
  public lineOptions: any;
  public lineChartData: number[] = []; // Représente les valeurs des tickets
  public lineChartLabels: string[] = []; // Représente les dates
  
  constructor(private ticketService: TicketService) {
    // Configuration du graphique doughnut
    this.doughnutData = {
      labels: ['Rouge', 'Bleu', 'Jaune'],
      datasets: [
        {
          data: [30, 70, 40],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

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
}
