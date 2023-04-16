import { Session } from './Session';
import { Affectation } from './Affectation';

export interface Calendrier {
  id: number;
  startTime: Date;
  endTime: Date;
  session: Session;
  affectations: Affectation[];
}
