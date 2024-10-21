import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RoleType } from '../interfaces/user';
import { RoleTypeService } from '../service/roleType.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})

export class RolesComponent implements OnInit {
  roleTypeForm: FormGroup;
  roleTypes: RoleType[] = [];
  selectedRoleType: RoleType | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private roleTypeService: RoleTypeService,
    private snackBar: MatSnackBar
  ) {
    this.roleTypeForm = this.formBuilder.group({
      id: [0],
      nom: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadRoleTypes();
  }

  loadRoleTypes() {
    this.roleTypeService.getAllRoleTypes().subscribe(
      (roleTypes) => {
        this.roleTypes = roleTypes;
        
      },
      (error) => {
        console.error('Erreur lors du chargement des rôles:', error);
      }
    );
  }

  onSubmit() {
    if (this.roleTypeForm.valid) {
      const roleType = this.roleTypeForm.value;
  
      if (roleType.id === 0) {
        this.roleTypeService.createRoleType(roleType).subscribe(
          (response) => {
            this.openSnackBar(`Rôle  ajouté avec succès.`);
            this.loadRoleTypes();
            this.resetForm();
          },
          (error) => {
            this.openSnackBar(`Erreur lors de l'ajout du rôle : ${error.message}`, 'Ok', 5000);
          }
        );
      } else {
        this.roleTypeService.updateRoleType(roleType.id, roleType).subscribe(
          (response) => {
            this.openSnackBar(`Rôle  modifié avec succès.`);
            this.loadRoleTypes();
            this.resetForm();
          },
          (error) => {
            this.openSnackBar(`Erreur lors de la modification du rôle : ${error.message}`, 'Ok', 5000);
          }
        );
      }
    }
  }

  editRoleType(roleType: RoleType) {
    this.selectedRoleType = roleType;
    this.roleTypeForm.patchValue({
      id: roleType.id,
      nom: roleType.nom,
    });
  }

  deleteRoleType(id: number) {
    this.roleTypeService.deleteRoleType(id).subscribe(
      (response) => {
        this.openSnackBar(`Rôle  supprimé avec succès.`);
        this.loadRoleTypes();
      },
      (error) => {
        this.openSnackBar(`Erreur lors de la suppression du rôle : ${error.message}`, 'Ok', 5000);
      }
    );
  }
  
  openSnackBar(message: string, action: string = 'Fermer', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  resetForm() {
    this.selectedRoleType = null;
    this.roleTypeForm.reset({ id: 0, nom: '' });
  }
}

