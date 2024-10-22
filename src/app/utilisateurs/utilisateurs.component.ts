import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AjouterUtilisateurComponent } from './ajouter-utilisateurisateur/ajouter-utilisateur.component';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FileInfo, Utilisateurs } from '../interfaces/personnels.model';



@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit{

  utilisateurs: Utilisateurs[] = [];

  constructor(private dialog: MatDialog, private router: Router,
      private utilisateurService: UserService) {
  

      }


  ngOnInit() {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getUsers().subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs:', err);
      }
    });
  }
  

  openDialog(utilisateur?: any): void {
    const dialogRef = this.dialog.open(AjouterUtilisateurComponent , {
      width: '2000px',
      height: '700px',

      data: utilisateur // On passe l'utilisateur à modifier
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('La modale a été fermée', result);
    });
  }

  editUtilisateur(utilisateur: any): void {
    this.openDialog(utilisateur); 
  }

  deleteUtilisateur(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUser(id).subscribe(() => {
        this.loadUtilisateurs(); // Rechargez la liste après la suppression
      });
    }
  }

  goToRoletype() {
    this.router.navigate(['/role']);
  }



}
