import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoginComponent, MatIconModule, MatSidenavModule, MatToolbarModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    NgIf,
    MatMenuModule,
    LoginComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit{

  constructor(private router: Router, private el: ElementRef) {
    
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = this.router.url;
        const items = [
          'dashboard',
          'produits',
          'commande',
          'livraisons',
          'categorie',
          'client',
          'payement',
          'personnel',
          'utilisateurs',
          'stock',
          'parametres',
          'test'
        ]; // Add all your routes here

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

  title = 'clinic-management';

  logIN: boolean = false;

  ngOnInit(): void {
    let auth = localStorage.getItem('authToken');
    if (auth != null) {
      this.logIN = true;
    }
  }

  verifier(value:any) {    
    this.logIN = value;
  }
  logout() {
    localStorage.clear();
    this.logIN = false;
  }
}
