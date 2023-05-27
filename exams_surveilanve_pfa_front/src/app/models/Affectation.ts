import { Section } from './Section';
import { Prof } from './Prof';
import { Calendrier } from './Calendrier';
import { Matiere } from './Matiere';
import { Salle } from './Salle';

export interface Affectation {
  id: number;
  dayy?: string;
  code?: string;
  section?: Section;
  professors?: Prof[];
  matiere?: Matiere;
  salle?: Salle;
  time?: string;
}
