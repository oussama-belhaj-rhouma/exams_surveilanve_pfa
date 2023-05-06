import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Matiere } from 'src/app/models/Matiere';
import { Section } from 'src/app/models/Section';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { ProfService } from 'src/app/services/prof/prof.service';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private sectionService: SectionService,
    private matiereService: MatiereService,
    private profService: ProfService,

  ) {}

  public matieres!: Matiere[];
  public sections!: Section[];
  content?: string;

  ngOnInit(): void {
    this.getmatieres();
    this.getsections();
  }

  public getmatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (Response: Matiere[]) => {
        this.matieres = Response;
        console.log(this.matieres)

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
        console.log(this.sections)

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
