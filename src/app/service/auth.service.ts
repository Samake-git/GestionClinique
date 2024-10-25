

// auth.service.ts
import { Injectable } from '@angular/core';
import { RoleType } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getUserRole(): RoleType | null  {
    const role = localStorage.getItem('userRole');
    return role ? JSON.parse(role) : null; // Analyser la chaîne JSON
  }

  isUserAdmin(): boolean {
    const role = this.getUserRole();
    return role ? role.nom === 'ADMIN' : true; // Renvoie false si aucun rôle n'est trouvé
  }

  isUserMedecin(): boolean {
    const role = this.getUserRole();
    return role ? role.nom === 'MEDECIN' : true; // Renvoie false si aucun rôle n'est trouvé
  }


  isUserLaborantin(): boolean {
    const role = this.getUserRole();
    return role ? role.nom === 'LABORANTIN' : true; // Renvoie false si aucun rôle n'est trouvé
  }

  isUserReceptionniste(): boolean {
    const role = this.getUserRole();
    return role ? role.nom === 'RECEPTIONNISTE' : true; // Renvoie false si aucun rôle n'est trouvé
  }


}