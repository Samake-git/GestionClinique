
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultatExamen } from '../interfaces/resultatexamen.model';


@Injectable({
  providedIn: 'root'
})
export class ResultatExamenService {
  private apiUrl = 'http://localhost:8080/api/laborantin/resultats-examens'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le JWT stocké dans localStorage
  private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Méthode pour générer les headers avec le JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Ajout du token JWT dans le header Authorization
    });
  }


  createResultatExamen(resultatExamen: ResultatExamen): Observable<ResultatExamen> {
    return this.http.post<ResultatExamen>(`${this.apiUrl}/ajouter`, resultatExamen, { headers: this.getAuthHeaders() });
  }

  getAllResultats(): Observable<ResultatExamen[]> {
    return this.http.get<ResultatExamen[]>(`${this.apiUrl}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  getResultatById(id: number): Observable<ResultatExamen> {
    return this.http.get<ResultatExamen>(`${this.apiUrl}/afficher/${id}`, { headers: this.getAuthHeaders() });
  }

  updateResultatExamen(id: number, resultatExamen: ResultatExamen): Observable<ResultatExamen> {
    return this.http.put<ResultatExamen>(`${this.apiUrl}/modifier/${id}`, resultatExamen, { headers: this.getAuthHeaders() });
  }

  deleteResultatExamen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }
}