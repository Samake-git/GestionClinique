import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginEvent } from './interfaces/LoginEvent';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    ReactiveFormsModule,
    NgIf,
    LoginComponent,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinic-management';
  logIN: boolean = false; // Initialiser à false

  constructor(private router: Router, private el: ElementRef, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        const items = [
          'dashboard',
          'tickets',
          'departement',
          'consultation',
          'prescription',
          'patient',
          'payement',
          'personnel',
          'utilisateurs',
          'typeAnalyse',
          'parametres',
          'categorie',
          'motifconsultation',
          'emplois'
        ];
        items.forEach((item) => {
          const element = this.el.nativeElement.querySelector(`#${item}Item`);
          if (element) {
            element.classList.remove('active');
            if (url.includes(item)) {
              element.classList.add('active');
            }
          }
        });
      }
    });
  }

  

  logout() {
    localStorage.clear();
    this.logIN = false;
  }

  // Mise à jour de la méthode verifier
  verifier(event: LoginEvent) {
    console.log('Événement de connexion reçu:', event);
    this.logIN = event.success; // Mettre à jour l'état de connexion

    if (event.success) {
      console.log('Utilisateur connecté avec succès!');
      // Vous pouvez également stocker un token ou d'autres actions ici
    } else {
      console.error('Échec de la connexion:', event.message);
    }
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


  isAdminOrMedecin (): boolean {
    return this.authService.isUserAdminOrMedecin();
  }


  isLaborantinOrAdmin(): boolean {
    return this.authService.isUserLaborantinOrAdmin();
  }

}