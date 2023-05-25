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
  onSubmit(): void {
    this.service.addProf(this.prof).subscribe(
      (newProf: Prof) => {
        console.log('Nouveau prof ajouté:', newProf);
        this.router.navigateByUrl('/tables');
      },
      (error: any) => {
        console.error('error :', error);
        // Handle error scenario
      }
    );
  }

  public getmatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (Response: Matiere[]) => {
        this.matieres = Response;
        console.log(this.matieres);
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
}
