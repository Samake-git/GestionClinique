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
    this.getRoles(); // Appeler la fonction getRoles
    this.getDepartements(); // Appeler la fonction getDepartements
    this.initForm(); // Appeler la fonction initForm
  
    this.initForm();
  if (this.data) {
    this.isEditMode = true; // Changez à vrai si des données sont passées
    // Assurez-vous que this.data contient un utilisateur valide
    if (this.data.id) {
      this.utilisateurForm.patchValue(this.data); // Préremplir le formulaire
    } else {
      console.error('Aucun ID trouvé dans les données utilisateur');
    }
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
  
      if (this.isEditMode) {
        // Vérifiez que l'ID est bien récupéré
        if (this.data && this.data.id) {
          utilisateur.id = this.data.id; // Ajoutez l'ID de l'utilisateur pour la mise à jour
        } else {
          console.error('Aucun ID utilisateur trouvé pour la mise à jour');
          return; // Arrêtez l'exécution si l'ID n'est pas trouvé
        }
  
        this.utilisateurService.updateUser(utilisateur, this.selectedFile).subscribe(() => {
          console.log('Utilisateur modifié avec succès');
          this.dialogRef.close(); // Ferme la modale après succès
        }, (error) => {
          console.error('Erreur lors de la modification de l\'utilisateur', error);
        });
      } else {
        // Traitement pour ajouter un nouvel utilisateur
        this.utilisateurService.ajouterUtilisateur(utilisateur, this.selectedFile).subscribe(() => {
          console.log('Utilisateur ajouté avec succès');
          this.dialogRef.close(); // Ferme la modale après succès
        }, (error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        });
      }
    }
  }


  onCancel(): void {
    this.dialogRef.close(); // Ferme la modale en cas d'annulation
  }
}
