import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AjouterUtilisateurComponent } from './ajouter-utilisateurisateur/ajouter-utilisateur.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent {

  constructor(private dialog: MatDialog, private router: Router) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterUtilisateurComponent , {
      width: '2000px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La modale a été fermée', result);
    });
  }

  goToRoletype() {
    this.router.navigate(['/role']);
  }

}
