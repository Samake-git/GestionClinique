import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../interfaces/department.model';
import { RoleType } from '../interfaces/user';
import { Utilisateur } from '../interfaces/Utilisateur';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/admin/utilisateurs';
  private apiUrlrole = 'http://localhost:8080/api/admin/roles';
  private apiUrldepartement = 'http://localhost:8080/api/admin/departement';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le JWT stocké dans localStorage
  private getJwtToken(): string | null {
    return localStorage.getItem('jwt');
  }

  // Méthode pour générer les headers avec le JWT
  private getAuthHeaders(): HttpHeaders {
    const token = this.getJwtToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ajout du token JWT dans le header Authorization
    });
  }

  // Récupérer les rôles
  getRoles(): Observable<RoleType[]> {
    return this.http.get<RoleType[]>(`${this.apiUrlrole}/afficher`, { headers: this.getAuthHeaders() });
  }

  // Récupérer les départements
  getDepartements(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrldepartement}/Tous_Afficher`, { headers: this.getAuthHeaders() });
  }

  // Ajouter un utilisateur (avec gestion du fichier image)
  ajouterUtilisateur(utilisateur: Utilisateur, file: File): Observable<Utilisateur> {
    const formData: FormData = new FormData();

    // Ajouter les champs utilisateur au FormData
    formData.append('nom', utilisateur.nom);
    formData.append('prenom', utilisateur.prenom);
    formData.append('username', utilisateur.username);
    formData.append('motDePasse', utilisateur.motDePasse);
    formData.append('phone', utilisateur.phone);
    formData.append('email', utilisateur.email);
    formData.append('sexe', utilisateur.sexe);
    formData.append('adresse', utilisateur.adresse);
    formData.append('specialite', utilisateur.specialite);
    formData.append('roletypeId', utilisateur.RoleType.id.toString()); // Convertir en string
    formData.append('departementId', utilisateur.Department.id.toString()); // Convertir en string

    // Ajouter le fichier image si présent
    if (file) {
      formData.append('photos', file);
    }

    // Envoyer la requête sans définir explicitement le Content-Type
    return this.http.post<Utilisateur>(`${this.baseUrl}/ajouter`, formData, { headers: this.getAuthHeaders() });
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour un utilisateur
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}`, userData, { headers: this.getAuthHeaders() });
  }

  // Supprimer un utilisateur
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }
}
