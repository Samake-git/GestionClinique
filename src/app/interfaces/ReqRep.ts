
// req-rep.model.ts

import { RoleType } from "./user";


export class ReqRep {
  statusCode!: number;
  token!: string;
  roleType!: RoleType; // Assurez-vous que c'est de type RoleType complet
  refreshToken!: string;
  expirationTime!: string;
  nom!: string;
  prenom!: string;
  email!: string;
  phone!: string;
  message!: string;
}