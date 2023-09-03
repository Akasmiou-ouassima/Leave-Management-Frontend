export interface Conge {
  id:number;
  dateDebut:Date;
  dateFin:Date;
  etat:Etat;
  type:Type;
  motif:string;
  fichier: string;
  utilisateurId:number;
}
export enum Type {
  PAYE='PAYE',
  MALADIE='MALADIE',
  PARENTAL='PARENTAL',
  SPECIAL='SPECIAL',
  FAMILIAL='FAMILIAL',
}
export enum Etat {
  EN_ATTENTE='EN_ATTENTE',
  ACCEPTE='ACCEPTE',
  REFUSE='REFUSE'
}

