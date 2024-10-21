
// services/type-analyse.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeAnalyse } from '../interfaces/type-analyse.model';


@Injectable({
  providedIn: 'root'
})
export class TypeAnalyseService {
  private apiUrl = 'http://localhost:8080/api/laborantin/type-analyses';

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
  

  createTypeAnalyse(typeAnalyse: TypeAnalyse): Observable<TypeAnalyse> {
    return this.http.post<TypeAnalyse>(`${this.apiUrl}/ajouter`,  typeAnalyse, { headers: this.getAuthHeaders() });
  }

  getAllTypeAnalyses(): Observable<TypeAnalyse[]> {
    return this.http.get<TypeAnalyse[]>(`${this.apiUrl}/AfficherTous`, { headers: this.getAuthHeaders() });
  }

  getTypeAnalyseById(id: number): Observable<TypeAnalyse> {
    return this.http.get<TypeAnalyse>(`${this.apiUrl}/afficher/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTypeAnalyse(id: number, typeAnalyse: TypeAnalyse): Observable<TypeAnalyse> {
    return this.http.put<TypeAnalyse>(`${this.apiUrl}/modifier/${id}`, typeAnalyse, { headers: this.getAuthHeaders() });
  }

  deleteTypeAnalyse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }
}