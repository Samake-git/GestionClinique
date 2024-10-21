import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TypeAnalyse } from '../interfaces/type-analyse.model';
import { TypeAnalyseService } from '../service/type-analyse.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-type-analyse',
  standalone: true,
  imports: [CommonModule,
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
    ReactiveFormsModule,],

    
  templateUrl: './type-analyse.component.html',
  styleUrl: './type-analyse.component.css'
})
export class TypeAnalyseComponent {

  typeAnalyseForm: FormGroup;
  typeAnalyses: TypeAnalyse[] = [];
  selectedTypeAnalyse: TypeAnalyse | null = null; 

  constructor(
    private formBuilder: FormBuilder,
    private typeAnalyseService: TypeAnalyseService,
    private router: Router 
  ) {
    this.typeAnalyseForm = this.formBuilder.group({
      id: [0],
      nom: ['', Validators.required],
      prix: [0, Validators.required]
    });
    this.loadTypeAnalyses();
  }

  loadTypeAnalyses() {
    this.typeAnalyseService.getAllTypeAnalyses().subscribe(
      (typeAnalyses) => {
        this.typeAnalyses = typeAnalyses;
      },
      (error) => {
        console.error('Erreur lors du chargement des types d\'analyse :', error);
      }
    );
  }

  onSubmit() {
    if (this.typeAnalyseForm.valid) {
      const typeAnalyse = this.typeAnalyseForm.value;
      if (typeAnalyse.id === 0) {
        this.typeAnalyseService.createTypeAnalyse(typeAnalyse).subscribe(
          (response) => {
            console.log('Type d\'analyse créé :', response);
            this.loadTypeAnalyses();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la création du type d\'analyse :', error);
          }
        );
      } else {
        this.typeAnalyseService.updateTypeAnalyse(typeAnalyse.id, typeAnalyse).subscribe(
          (response) => {
            console.log('Type d\'analyse mis à jour :', response);
            this.loadTypeAnalyses();
            this.resetForm();
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du type d\'analyse :', error);
          }
        );
      }
    }
  }

  editTypeAnalyse(typeAnalyse: TypeAnalyse) {
    this.selectedTypeAnalyse = typeAnalyse;
    this.typeAnalyseForm.patchValue({
      id: typeAnalyse.id,
      nom: typeAnalyse.nom,
      prix: typeAnalyse.prix
    });
  }

  deleteTypeAnalyse(id: number) {
    this.typeAnalyseService.deleteTypeAnalyse(id).subscribe(
      () => {
        console.log('Type d\'analyse supprimé');
        this.loadTypeAnalyses();
      },
      (error) => {
        console.error('Erreur lors de la suppression du type d\'analyse :', error);
      }
    );
  }

  resetForm() {
    this.selectedTypeAnalyse = null;
    this.typeAnalyseForm.reset({ id: 0, nom: '', prix: 0 });
  }

  goToAnalyse() {
    this.router.navigate(['/analyse']);
  }

}
