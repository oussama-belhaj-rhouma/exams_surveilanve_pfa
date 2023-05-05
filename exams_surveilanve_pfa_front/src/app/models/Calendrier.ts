import { Session } from './Session';
import { Affectation } from './Affectation';
import { Section } from './Section';

export interface Calendrier {
  id: number;
  startday: Date;
  endday: Date;
  session: Session;
  affectations: Affectation[];
  section: Section
}
