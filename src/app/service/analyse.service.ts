// services/analyse.service.ts


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analyse } from '../interfaces/analyse.model';
import { Patient } from '../interfaces/patient.model';




@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  private apiUrl = 'http://localhost:8080/api/laborantin/analyses';
  private baseUrl1 = 'http://localhost:8080/api/medecin/patients/afficherTous'

  private apiUrl1 = 'http://localhost:8080/api/ medecin/analyses';

 

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


  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl1, { headers: this.getAuthHeaders() });
  }

  createAnalyse(analyse: Analyse): Observable<Analyse> {
    return this.http.post<Analyse>(`${this.apiUrl1}/ajouter`, analyse, { headers: this.getAuthHeaders() });
  }

  getAllAnalyses(): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.apiUrl1}/afficherTous`, { headers: this.getAuthHeaders() });
  }

  getAnalyseById(id: number): Observable<Analyse> {
    return this.http.get<Analyse>(`${this.apiUrl1}/afficher/${id}`, { headers: this.getAuthHeaders() });
  }

  updateAnalyse(id: number, analyse: Analyse): Observable<Analyse> {
    return this.http.put<Analyse>(`${this.apiUrl1}/modifier/${id}`, analyse, { headers: this.getAuthHeaders() });
  }

  deleteAnalyse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl1}/supprimer/${id}`, { headers: this.getAuthHeaders() });
  }

  getAnalysesEnAttente(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/en-attente`, { headers: this.getAuthHeaders() });
  }

  getAnalysesTraitees(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/traiter`, { headers: this.getAuthHeaders() });
  }

  getTotalAnalyses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`, { headers: this.getAuthHeaders() });
  }

    // Nouvelle méthode pour payer une analyse
    payerAnalyse(analyseId: number): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/payer/${analyseId}`, {}, { headers: this.getAuthHeaders() });
    }

}

