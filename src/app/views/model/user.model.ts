export interface User{
  id: number;
  nom: string;
  prenom: string;
  status: Status;
  email: string;
  poste: string;
  type: UserType;
  tel: string;
  image: string;
  adresse: string;
  solde: number;
  equipeId:number;
}

export enum UserType {
  SALARIE = 'SALARIE',
  RESPONSABLE = 'RESPONSABLE'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  DESACTIVE = 'DESACTIVE'
}
