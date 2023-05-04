import { Calendrier } from './Calendrier';
import { Matiere } from './Matiere';
import { Prof } from './Prof';

export interface Section {
  id: number;
  sectionName: string;
  matieres: Matiere[];
  professors: Prof[];
  calendriers: Calendrier[];
}
