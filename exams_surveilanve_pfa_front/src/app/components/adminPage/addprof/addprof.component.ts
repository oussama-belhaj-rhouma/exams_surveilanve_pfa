import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EGrade } from 'src/app/models/EGrade';
import { Prof } from 'src/app/models/Prof';
import { ProfService } from 'src/app/services/prof/prof.service';
import { Section } from 'src/app/models/Section';
import { SectionService } from 'src/app/services/section/section.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { Matiere } from 'src/app/models/Matiere';
import {
  Observable,
  catchError,
  forkJoin,
  mergeMap,
  of,
  switchMap,
  throwError,
} from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addprof',
  templateUrl: './addprof.component.html',
  styleUrls: ['./addprof.component.css'],
})
export class AddprofComponent implements OnInit {
  public sections!: Section[];
  public matieres!: Matiere[];

  content?: string;
  prof: Prof = {
    id: 0,
    prenom: '',
    nom: '',
    email: '',
    username: '',
    grade: EGrade.PROFESSEUR,
  };
  professeur!: Prof;

  grades = Object.values(EGrade);

  constructor(
    private service: ProfService,
    private router: Router,
    private sectionService: SectionService,
    private matiereService: MatiereService
  ) {}
  ngOnInit(): void {
    this.getsections();
    this.getmatieres();
  }
  // onSubmit(): void {
  //   this.service.addProf(this.prof).subscribe(
  //     (newProf: Prof) => {
  //       console.log('Nouveau prof ajouté:', newProf);
  //       this.router.navigateByUrl('/tables');
  //     },
  //     (error: any) => {
  //       console.error('error :', error);
  //       // Handle error scenario
  //     }
  //   );
  // }

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

  public getsections(): void {
    this.sectionService.getSections().subscribe(
      (Response: Section[]) => {
        this.sections = Response;
        console.log(this.sections);
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

  onSubmit(): void {
    this.service
      .addProf({
        id: 0,
        nom: this.prof.nom,
        prenom: this.prof.prenom,
        email: this.prof.email,
        username: this.prof.username,
        grade: this.prof.grade,
      })
      .pipe(
        mergeMap((newProf: Prof) => {
          console.log('Nouveau prof ajouté:', newProf);
          const sectionObs = this.callAddSectionToProf(newProf);
          const matiereObs = this.callAddMatiereToProf(newProf);
          // this.toastr.success('Nouveau professeur ajouté')
          return forkJoin([sectionObs, matiereObs]);
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
        this.router.navigateByUrl('/tables');
      });
  }

  callAddSectionToProf(newProf: Prof) {
    const selectedSections = this.prof.sections;
    if (
      selectedSections !== undefined &&
      selectedSections.length > 0 &&
      newProf.id
    ) {
      return forkJoin(
        selectedSections.map((section) =>
          this.service.addSectionToEtudiant(newProf.id, section.id!)
        )
      );
    } else {
      return of(null);
    }
  }

  callAddMatiereToProf(newProf: Prof) {
    const selectedMatieres = this.prof.matieres;
    if (
      selectedMatieres !== undefined &&
      selectedMatieres.length > 0 &&
      newProf.id
    ) {
      return forkJoin(
        selectedMatieres.map((matiere) =>
          this.service.addMatiereToProf(newProf.id, matiere.id!)
        )
      );
    } else {
      return of(null);
    }
  }
}
