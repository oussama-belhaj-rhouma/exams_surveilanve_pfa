import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/models/Etudiant';
import { Section } from 'src/app/models/Section';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';
import { SectionService } from 'src/app/services/section/section.service';

@Component({
  selector: 'app-updateetudiant',
  templateUrl: './updateetudiant.component.html',
  styleUrls: ['./updateetudiant.component.css'],
})
export class UpdateetudiantComponent implements OnInit {
  s!: string;
  public sections!: Section[];
  content?: string;

  etudiant: Etudiant = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  };
  constructor(
    private service: EtudiantService,
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.s = this.route.snapshot.paramMap.get('username') || '';
    this.service.getEtudiant(this.s).subscribe((data: any) => {
      this.etudiant = { ...data };
    });
    this.getsections();
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
    this.service.updateEtudiant(this.etudiant).subscribe(
      (newProf: Etudiant) => {
        console.log('New etudiant added:', newProf);
        this.router.navigateByUrl('/tables');
      },
      (error: any) => {
        console.error('An error occurred:', error);
        // Handle error scenario
      }
    );
  }
}
