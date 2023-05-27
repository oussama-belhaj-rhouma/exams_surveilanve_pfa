import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, forkJoin, mergeMap, of, throwError } from 'rxjs';
import { Affectation } from 'src/app/models/Affectation';
import { ESession } from 'src/app/models/ESession';
import { Etudiant } from 'src/app/models/Etudiant';
import { Matiere } from 'src/app/models/Matiere';
import { Prof } from 'src/app/models/Prof';
import { Salle } from 'src/app/models/Salle';
import { Section } from 'src/app/models/Section';
import { Session } from 'src/app/models/Session';
import { AffectationService } from 'src/app/services/affectation/affectation.service';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { ProfService } from 'src/app/services/prof/prof.service';
import { SalleService } from 'src/app/services/salle/salle.service';
import { SectionService } from 'src/app/services/section/section.service';
import { SessionService } from 'src/app/services/session/session.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  public sections!: Section[];
  public matieres!: Matiere[];
  public profs!: Prof[];
  public salles!: Salle[];
  public affectations!: Affectation[];
   et=true;

   
  public sessions!: Session[];
  currentEtudiant!: Etudiant;

  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  times = ['8:30-10:00', '10:15-11:45', '12:00-13:30', '13:45-15:15'];
  affectation: Affectation = {
    id: 0,

  };
  content?: string;
  currentUser: any;
  


  constructor(
    private storageService: StorageService,
    private etudiantService: EtudiantService,
    private service: AffectationService,
    private sectionService: SectionService,
    private salleService: SalleService,
    private matiereService: MatiereService,
    private profService: ProfService,
    private sessionService: SessionService,
    private etudiantServixe : EtudiantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAffectation();
    this.getmatieres();
    this.getprofs();
    this.getsalles();
    this.currentUser = this.storageService.getUser();
    this.getsections();
this.getEtudiant()  }

  
  public getEtudiant(): void {
    this.etudiantService.getEtudiant(this.currentUser.username).subscribe(
      (      Response: Etudiant)=>{
        this.currentEtudiant=Response;
        console.log(this.currentEtudiant)
      }, 
      (error : HttpErrorResponse)=>{
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.currentEtudiant = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public getAffectation(): void {
    this.service.getAffectations().subscribe(
      (Response: Affectation[]) => {
        this.affectations = Response;
         console.log(this.affectations);
        switch (this.storageService.getUser().roles[0]) {
          case 'ROLE_ADMIN':
            this.testall();
            break;
          case 'ROLE_PROF':
          //  this.testprof();
            break;
          case 'ROLE_ETUDIANT':
            this.et=false
            console.log('Option 3 selected');
            this.testetudiant()
           break;
          default:
            console.log('Invalid ROLE');
            break;
        }
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.affectation = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public update_case(a: HTMLElement | null, i: number) {
    if (this.affectations[i]?.matiere !== undefined && this.affectations[i]?.section) {
      if (a) {
        a.removeAttribute('disabled');
        a.classList.remove('btn-secondary');
        a.classList.add('btn-success');
        a.textContent = this.affectations[i]?.matiere?.name +
          '\n' +
          this.affectations[i]?.section?.sectionName;
      }
    }
  }
  
 

  public testall() {
    for (let i = 0; i < this.affectations.length; i++) {
      const affectation = this.affectations[i];
      if (affectation?.dayy !== undefined && affectation?.time !== undefined) {
        const a = document.getElementById(affectation.dayy + affectation.time) as HTMLElement | null;
        if (a) {
          this.update_case(a, i);
        }
      }
    }
  }

  
  public testetudiant() {
    console.log(this.etudiantServixe.getCalendriers)
  }
  

  // public testprof() {
  //   if (this.affectations !== undefined) {
  //     for (let i = 0; i < this.affectations.length; i++) {
  //       if (
  //         this.affectations[i]?.professors !== undefined &&
  //         this.affectations[i]?.professors.length > 0
  //       ) {
  //         for (let j = 0; j < this.affectations[i].professors.length; j++) {
  //           this.currentUser = this.storageService.getUser();
  //           if (
  //             this.affectations[i]?.professors[j]?.username ===
  //             this.currentUser?.username
  //           ) {
  //             const a = document.getElementById(
  //               this.affectations[i]?.dayy + this.affectations[i]?.time
  //             );
  //             if (a !== null) {
  //               this.update_case(a, i);
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  
  




  public onOpenModal(affectation: Affectation | null , mode: string): void {
    const container = document.getElementById('main-container') ;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
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




  callAddSectionAffectation(newAffectation: Affectation) {
    const selectedSection = this.affectation.section;
    if (selectedSection !== undefined && newAffectation.id) {
      console.log(selectedSection);
      return this.service.addSection(
        newAffectation.id,
        selectedSection.id
      );
    } else {
      return of(null);
    }
  }

  callAddMatiereAffectation(newAffectation: Affectation) {
    const selectedMatiere = this.affectation.matiere;
    if (selectedMatiere !== undefined && newAffectation.id) {
      console.log(selectedMatiere);
      return this.service.addMatiere(
        newAffectation.id,
        selectedMatiere.id
      );
    } else {
      return of(null);
    }
  }

  callAddSalleAffectation(newAffectation: Affectation) {
    const selectedSalle = this.affectation.salle;
    if (selectedSalle !== undefined && newAffectation.id) {
      console.log(selectedSalle);
      return this.service.addSalle(
        newAffectation.id,
        selectedSalle.id
      );
    } else {
      return of(null);
    }
  }

  callProfToAffectation(newAffectation: Affectation) {
    const selectedProfs = this.affectation.professors; 
    if (
      selectedProfs !== undefined &&
      selectedProfs.length > 0 &&
      newAffectation.id
    ) {
      return forkJoin(
        selectedProfs.map((prof) =>
          this.service.addProf(newAffectation.id, prof.id!)
        )
      );
    } else {
      return of(null);
    }
  }

  onSubmit(): void {
    this.service
      .addAffectation({
        id: 0,
        dayy: this.affectation.dayy,
        time: this.affectation.time,
        
      })
      .pipe(
        mergeMap((newAffectation: Affectation) => {
          console.log('Nouveau affectation ajouté:', newAffectation);
          const sectionObs = this.callAddSectionAffectation(newAffectation);
          const matiereObs = this.callAddMatiereAffectation(newAffectation);
          const salleObs = this.callAddSalleAffectation(newAffectation);
          const profObs = this.callProfToAffectation(newAffectation);
          return forkJoin([sectionObs, matiereObs, salleObs, profObs]);

      
        }),
        catchError((error: any) => {
          console.error('error:', error);

          if (error.status === 500) {
            // this.toastr.error('Impossible to load. Please try again later.', 'Error');
          }

          return throwError(error);
        })
      )
      .subscribe(() => {
        this.router.navigateByUrl('/calendrier');
      });
  }


}
