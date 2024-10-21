import { JsonPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEvent } from '../interfaces/LoginEvent';
import { ReqRep } from '../interfaces/ReqRep';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  loginForm: FormGroup;
  errorMessage: string | undefined;

  @Output() loginEvent = new EventEmitter<LoginEvent>();

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginRequest = this.loginForm.value;

    this.http.post<ReqRep>('http://localhost:8080/api/auth/login', loginRequest)
      .subscribe(response => {
        localStorage.setItem('jwt', response.token);
        
        // Récupérer l'objet roleType complet
        const roleType = response.roleType;
        console.log('Token JWT:', response.token);
        console.log('Rôle utilisateur complet:', roleType);

        // Émettre l'événement de connexion
        this.loginEvent.emit({ success: true, message: response.message });
        this.router.navigate(['/dashboard']);
      }, error => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Erreur de connexion. Veuillez vérifier vos informations.';
        this.loginEvent.emit({ success: false, message: this.errorMessage });
      });

      

      
  }
}