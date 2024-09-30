import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  @Output() loginSuccess = new EventEmitter<boolean>(); // Émettre un événement de succès de connexion

  constructor(private authService : AuthService, private router: Router) {}

  login() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.loginSuccess.emit(true); // Émettre l'événement de succès

        this.email = ''; // Réinitialiser l'email
        this.password = ''; // Réinitialiser le mot de passe
        this.router.navigate(['dashboard']).then(() => {
          // Utiliser location.reload() après la redirection
          location.reload(); // Recharger la page
        });
        this.resetForm(); // Réinitialiser le formulaire
      },
      (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else {
          this.errorMessage = 'Une erreur est survenue, veuillez réessayer.';
        }
      }
    );
  }
  resetForm() {
    throw new Error('Method not implemented.');
  }

}
