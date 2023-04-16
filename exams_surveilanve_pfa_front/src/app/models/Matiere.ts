import { Section } from './Section';
import { Prof } from './Prof';

export interface Matiere {
  id: number;
  name: string;
  sections: Section[];
  professors: Prof[];
}
