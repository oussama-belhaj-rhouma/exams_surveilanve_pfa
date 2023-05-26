import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/models/Section';
import { SectionService } from 'src/app/services/section/section.service';
import { Router } from '@angular/router';
import { SalleService } from 'src/app/services/salle/salle.service';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { ProfService } from 'src/app/services/prof/prof.service';
import { Salle } from 'src/app/models/Salle';
import { Matiere } from 'src/app/models/Matiere';
import { Prof } from 'src/app/models/Prof';
import { SessionService } from 'src/app/services/session/session.service';
import { Session } from 'src/app/models/Session';

@Component({
  selector: 'app-addaffec',
  templateUrl: './addaffec.component.html',
  styleUrls: ['./addaffec.component.css'],
})
export class AddaffecComponent implements OnInit {
  public sections!: Section[];
  public matieres!: Matiere[];
  public profs!: Prof[];
  public salles!: Salle[];
  public sessions!: Session[];
  days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  times = ['8:30-10:00', '10:15-11:45', '12:00-13:30', '13:45-15:15'];

  content?: string;

  constructor(
    private sectionService: SectionService,
    private salleService: SalleService,
    private matiereService: MatiereService,
    private profService: ProfService,
    private sessionService: SessionService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.getsections();
    this.getmatieres();
    this.getprofs();
    this.getsalles();
    this.getsessions();
  }

  onSubmit(): void {
    // code 
  }

  public getsections(): void {
    this.sectionService.getSections().subscribe(
      (Response: Section[]) => {
        this.sections = Response;
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.sections = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public getmatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (Response: Matiere[]) => {
        this.matieres = Response;
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.matieres = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public getprofs(): void {
    this.profService.getProfs().subscribe(
      (Response: Prof[]) => {
        this.profs = Response;
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.profs = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public getsalles(): void {
    this.salleService.getSalles().subscribe(
      (Response: Salle[]) => {
        this.salles = Response;
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.salles = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public getsessions(): void {
    this.sessionService.getSessions().subscribe(
      (Response: Session[]) => {
        this.sessions = Response;
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.sessions = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }
}
