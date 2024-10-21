
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleType } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class RoleTypeService {
  private apiUrl = 'http://localhost:8080/api/admin/roles';

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

  createRoleType(roleType: RoleType): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/creer`, roleType, { headers: this.getAuthHeaders() });
  }

  updateRoleType(id: number, roleType: RoleType): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/modifier/${id}`, roleType, { headers: this.getAuthHeaders() });
  }

  deleteRoleType(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }

  getAllRoleTypes(): Observable<RoleType[]> {
    return this.http.get<RoleType[]>(`${this.apiUrl}/afficher`, { headers: this.getAuthHeaders() });
  }
}