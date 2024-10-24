import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleType } from '../../interfaces/user';
import { Department } from '../../interfaces/department.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-ajouter-utilisateur',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogContent, CommonModule],
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css'] // Corrigé de styleUrl à styleUrls
})
export class AjouterUtilisateurComponent {

  utilisateurForm!: FormGroup;
  roles: RoleType[] = [];
  departements: Department[] = [];
  selectedFile!: File;
  isEditMode: boolean = false; // Indicateur de mode édition

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UserService,
    private dialogRef: MatDialogRef<AjouterUtilisateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Pour passer des données si nécessaire
  ) {}

  
  ngOnInit(): void {
    this.initForm();
    this.getRoles();
    this.getDepartements();


    if (this.data.id) {
      this.isEditMode = true;
      this.utilisateurForm.patchValue(this.data); // Préremplir le formulaire
    } else {
      console.error('Aucun ID trouvé dans les données utilisateur');
    }
  
  }
  
 

  initForm(): void {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      username: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      sexe: ['', Validators.required],
      adresse: ['', Validators.required],
      specialite: [''],
      roleType: ['', Validators.required],
      department: ['', Validators.required], // Correction du nom de champ
      photos: [null] // Gestion de l'attribut 'photos'
    });
  }

  // Récupérer les rôles depuis le backend
  getRoles(): void {
    this.utilisateurService.getRoles().subscribe((roles) => {
      this.roles = roles;
      console.log(this.roles)
    });
  }

  // Récupérer les départements depuis le backend
  getDepartements(): void {
    this.utilisateurService.getDepartements().subscribe((departements) => {
      this.departements = departements;
      console.log(this.departements);
    });
  }

  // Gestion des fichiers (photos)
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.utilisateurForm.patchValue({ photos: this.selectedFile });
  }

  // Soumettre le formulaire pour ajouter un utilisateur
  onSubmit(): void {
    if (this.utilisateurForm.valid) {
      const utilisateur = this.utilisateurForm.value;
  
      // Assurez-vous d'ajouter les IDs appropriés pour roleType et department
      utilisateur.RoleType = { id: this.utilisateurForm.value.roleType };
      utilisateur.Department = { id: this.utilisateurForm.value.department };
  
      console.log('Données de l\'utilisateur avant envoi:', utilisateur);
  
      if (this.isEditMode) {
        // En mode modification, ajoutez l'ID de l'utilisateur
        if (this.data && this.data.id) {
          utilisateur.id = this.data.id; // Ajoutez l'ID pour la mise à jour
        } else {
          console.error('Aucun ID utilisateur trouvé pour la mise à jour');
          return; // Arrêtez l'exécution si l'ID n'est pas trouvé
        }
        
        // Appel à la méthode de modification
        this.utilisateurService.updateUser(utilisateur, this.selectedFile).subscribe(
          (response) => {
            console.log('Utilisateur modifié avec succès', response);
            console.log('Données de l\'utilisateur après mise à jour:', utilisateur);
            this.utilisateurForm.reset();
            this.dialogRef.close(); // Ferme la modale après succès
          },
          (error) => {
            console.error('Erreur lors de la modification de l\'utilisateur', error);
            console.error('Données de l\'utilisateur:', utilisateur);
          }
        );
      } else {
        // En mode ajout, appelez la méthode d'ajout
        this.utilisateurService.ajouterUtilisateur(utilisateur, this.selectedFile).subscribe(
          (response) => {
            console.log('Utilisateur ajouté avec succès', response);
            console.log('Données de l\'utilisateur après ajout:', utilisateur);
            this.utilisateurForm.reset();
            this.dialogRef.close(); // Ferme la modale après succès
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
            console.error('Données de l\'utilisateur:', utilisateur);
          }
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Ferme la modale en cas d'annulation
  }
}
