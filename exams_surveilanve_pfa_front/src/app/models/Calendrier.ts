import { Session } from './Session';
import { Affectation } from './Affectation';
import { Section } from './Section';

export interface Calendrier {
  id: number;
  startDay: Date;
  endDay: Date;
  session: Session;
  affectations: Affectation[];
  section: Section
}
