import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/Etudiant';
import { Section } from 'src/app/models/Section';
import { SectionService } from 'src/app/services/section/section.service';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-addetudiant',
  templateUrl: './addetudiant.component.html',
  styleUrls: ['./addetudiant.component.css'],
})
export class AddetudiantComponent implements OnInit {
  public sections!: Section[];
  content?: string;

  etudiant: Etudiant = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  };

  constructor(
    private service: EtudiantService,
    private sectionService: SectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getsections();
  }

  onSubmit(): void {
    this.service
      .addEtudiant({
        firstName: this.etudiant.firstName,
        lastName: this.etudiant.lastName,
        email: this.etudiant.email,
        username: this.etudiant.username,
      })
      .subscribe(
        (newEtudiant: Etudiant) => {
          console.log('Nouveau etudiant ajouté:', newEtudiant);

          const selectedSectionId = this.etudiant.section;
          if (selectedSectionId !== undefined && newEtudiant.id) {
            this.service.addSectionToEtudiant(
              newEtudiant.id, // Use the newly created etudiant's id
              selectedSectionId.id
            );
          }

          this.router.navigateByUrl('/tables');
        },
        (error: any) => {
          console.error('error:', error);
          // Handle error scenario
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
