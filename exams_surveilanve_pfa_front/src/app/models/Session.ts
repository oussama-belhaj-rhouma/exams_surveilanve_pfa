import { ESession } from './ESession';
import { Calendrier } from './Calendrier';

export interface Session {
  id: number;
  session: ESession;
  calendrier: Calendrier;
}
