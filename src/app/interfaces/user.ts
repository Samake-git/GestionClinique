// user.model.ts
export class User {
  id!: number;
  nom!: string;
  prenom!: string;
  telephone!: string;
  email!: string;
  motDePasse!: string;
  roletype!: RoleType; // Relation avec Role
  imageFile?: string; // Base64 image data (facultatif)
}

export class RoleType {
  id!: number;
  nom!: string; // Utilisez 'string' au lieu de 'String'

}

