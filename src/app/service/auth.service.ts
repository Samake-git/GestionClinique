import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL de votre API backend

  constructor(private http: HttpClient) { }

  // Fonction pour se connecter
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError(error => {
        // Manipulez l'erreur ici (afficher un message, journaliser, etc.)
        console.error('Erreur de connexion:', error);
        return throwError(error); // Relancez l'erreur
      })
    );
  }

  // Fonction pour se déconnecter
  logout(): void {
    localStorage.removeItem('token'); // Retirer le token du stockage local
  }

  // Vérification si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Simplification de la vérification
  }

  // Sauvegarder le token dans le stockage local
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}