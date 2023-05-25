import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EGrade } from 'src/app/models/EGrade';
import { Matiere } from 'src/app/models/Matiere';
import { Prof } from 'src/app/models/Prof';
import { Section } from 'src/app/models/Section';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { ProfService } from 'src/app/services/prof/prof.service';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-updateprof',
  templateUrl: './updateprof.component.html',
  styleUrls: ['./updateprof.component.css'],
})
export class UpdateprofComponent implements OnInit {
  s!: string;
  public matieres!: Matiere[];
  public sections!: Section[];

  prof: Prof = {
    id: 0,
    prenom: '',
    nom: '',
    email: '',
    username: '',
    grade: EGrade.PROFESSEUR,
  };
  grades = Object.values(EGrade);
  content?: string;

  constructor(
    private service: ProfService,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService,
    private sectionService: SectionService
  ) {}
  ngOnInit(): void {
    this.s = this.route.snapshot.paramMap.get('username') || '';
    this.service.getProf(this.s).subscribe((data: any) => {
      this.prof = { ...data };
    });
    this.getmatieres();
    this.getsections();
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
  onSubmit(): void {
    this.service.updateProf(this.prof).subscribe(
      (newProf: Prof) => {
        console.log('New professor added:', newProf);
        this.router.navigateByUrl('/tables');
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle error scenario
      }
    );
  }
}
