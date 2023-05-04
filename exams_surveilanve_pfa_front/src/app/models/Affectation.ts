import { Section } from './Section';
import { Prof } from './Prof';
import { Calendrier } from './Calendrier';
import { Matiere } from './Matiere';
import { Salle } from './Salle';

export interface Affectation {
  id: number;
  name: string;
  day: string;
  startTime: string;
  finishTime: string;
  code: string;
  section: Section;
  professors: Prof[];
  calendrier: Calendrier;
  matiere: Matiere;
  salle: Salle;
}
