
// services/categorie-analyse.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieAnalyse } from '../interfaces/CategorieAnalyse.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieAnalyseService {
  private apiUrl = 'http://localhost:8080/api/laborantin/CategorieAnalyse';

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

  addCategorieAnalyse(categorie: CategorieAnalyse): Observable<CategorieAnalyse> {
    return this.http.post<CategorieAnalyse>(`${this.apiUrl}/ajouter`, categorie, { headers: this.getAuthHeaders() });
  }

  getAllCategoriesAnalyse(): Observable<CategorieAnalyse[]> {
    return this.http.get<CategorieAnalyse[]>(`${this.apiUrl}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  getCategorieAnalyseById(id: number): Observable<CategorieAnalyse> {
    return this.http.get<CategorieAnalyse>(`${this.apiUrl}/afficher/${id}`, { headers: this.getAuthHeaders() });
  }

  updateCategorieAnalyse(id: number, categorie: CategorieAnalyse): Observable<CategorieAnalyse> {
    return this.http.put<CategorieAnalyse>(`${this.apiUrl}/modifier/${id}`, categorie, { headers: this.getAuthHeaders() });
  }

  deleteCategorieAnalyse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }
}
