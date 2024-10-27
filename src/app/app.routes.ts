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
import { TicketpayementComponent } from './ticketpayement/ticketpayement.component';
import { PrescriptionDetailComponent } from './prescription-detail/prescription-detail.component';
import { EmploisDuTempsComponent } from './emplois-du-temps/emplois-du-temps.component';
import { RecupayementComponent } from './recupayement/recupayement.component';
import { AnalyseListeComponent } from './analyse-liste/analyse-liste.component';
import { RecuAnalyseComponent } from './recu-analyse/recu-analyse.component';




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
{path: 'prescription-detail/:id', component: PrescriptionDetailComponent},
{path: 'payer-ticket/:id', component: TicketpayementComponent},
{path: 'emplois', component: EmploisDuTempsComponent},
{path: 'recu/:id', component: RecupayementComponent},
{path: 'recuAnalyse/:id', component: RecuAnalyseComponent},
{path: '', redirectTo: '/login', pathMatch: 'full' },

];
