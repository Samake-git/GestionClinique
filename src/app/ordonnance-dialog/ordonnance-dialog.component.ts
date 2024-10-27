import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prescription, PrescriptionDetail } from '../interfaces/prescription.model';
import { OrdonnanceDetailComponent } from '../ordonnance-detail/ordonnance-detail.component'; 

@Component({
  selector: 'app-ordonnance-dialog',
  standalone: true,
  templateUrl: './ordonnance-dialog.component.html',
  styleUrls: ['./ordonnance-dialog.component.css'],
  imports: [OrdonnanceDetailComponent], 
})
export class OrdonnanceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { prescription: Prescription; details: PrescriptionDetail[] }) {}
}