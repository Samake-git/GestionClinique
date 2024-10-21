import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartementComponent } from './departement/departement.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { TicketsComponent } from './tickets/tickets.component';
import { MotifconsultationComponent } from './motifconsultation/motifconsultation.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { TypeAnalyseComponent } from './type-analyse/type-analyse.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { ResultatExamenComponent } from './resultat-examen/resultat-examen.component';
import { RolesComponent } from './roles/roles.component';


export const routes: Routes = [
{path: 'login',component: LoginComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'departement', component: DepartementComponent},
{path: 'utilisateurs', component: UtilisateursComponent},
{path: 'tickets', component: TicketsComponent},
{path: 'motifconsultation', component: MotifconsultationComponent},
{path: 'consultation' , component: ConsultationComponent},
{path: 'prescription' , component: PrescriptionComponent},
{path: 'typeAnalyse', component: TypeAnalyseComponent},
{path: 'analyse', component: AnalyseComponent},
{path: 'resultatExamen', component: ResultatExamenComponent},
{path: 'role', component: RolesComponent},
{path: '', redirectTo: '/login', pathMatch: 'full' },

];
