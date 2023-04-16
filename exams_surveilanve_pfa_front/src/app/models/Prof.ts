import { EGrade } from './EGrade';
import { Affectation } from './Affectation';
import { Section } from './Section';
import { Matiere } from './Matiere';

export interface Prof {
    id: number;
    prenom: string;
    nom: string;
    grade: EGrade ;
    affectations: Affectation[] ;
    sections: Section[];
    matieres: Matiere[];
  }
  