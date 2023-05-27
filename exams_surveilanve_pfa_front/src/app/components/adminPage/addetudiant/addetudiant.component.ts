import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/Etudiant';
import { Section } from 'src/app/models/Section';
import { SectionService } from 'src/app/services/section/section.service';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';

import { Router } from '@angular/router';
import {
  Observable,
  catchError,
  mergeMap,
  of,
  shareReplay,
  throwError,
} from 'rxjs';

@Component({
  selector: 'app-addetudiant',
  templateUrl: './addetudiant.component.html',
  styleUrls: ['./addetudiant.component.css'],
})
export class AddetudiantComponent implements OnInit {
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
    private sectionService: SectionService,
    private router: Router,

    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getsections();
  }

  //  onSubmit(): void {
  //    this.service
  //      .addEtudiant({
  //        firstName: this.etudiant.firstName,
  //        lastName: this.etudiant.lastName,
  //        email: this.etudiant.email,
  //        username: this.etudiant.username,
  //      })
  //      .subscribe(
  //        (newEtudiant: Etudiant) => {
  //          console.log('Nouveau etudiant ajouté:', newEtudiant);

  //          const selectedSectionId = this.etudiant.section;
  //          if (selectedSectionId !== undefined && newEtudiant.id) {
  //            console.log(selectedSectionId)
  //            this.service.addSectionToEtudiant(
  //              newEtudiant.id, // Use the newly created etudiant's id
  //              selectedSectionId.id
  //            );
  //          }

  //         this.router.navigateByUrl('/tables');
  //      },
  //        (error: any) => {         console.error('error:', error);

  //          if (error.status === 500) {
  //            this.toastr.error('Impossible to load. Please try again later.', 'Error');
  //          }
  // }
  //      );
  //  }

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

  // callAddEtudiant(): void {
  //   this.service
  //     .addEtudiant({
  //       firstName: this.etudiant.firstName,
  //       lastName: this.etudiant.lastName,
  //       email: this.etudiant.email,
  //       username: this.etudiant.username,
  //     })
  //     .subscribe(
  //       (newEtudiant: Etudiant) => {
  //         console.log('Nouveau etudiant ajouté:', newEtudiant);
  //       },
  //       (error: any) => {
  //         console.error('error:', error);

  //         if (error.status === 500) {
  //           this.toastr.error('Impossible to load. Please try again later.', 'Error');
  //         }
  //       }
  //     );
  // }

  // callAddSectionToEtudiant(newEtudiant: Etudiant): void {
  //   const selectedSection = this.etudiant.section;
  //   if (selectedSection !== undefined && newEtudiant.id) {
  //     console.log(selectedSection)
  //     this.service.addSectionToEtudiant(
  //       newEtudiant.id,
  //       selectedSection.id
  //     ).subscribe(
  //       () => {
  //         this.router.navigateByUrl('/tables');
  //       },
  //       (error: any) => {
  //         console.error('error:', error);

  //         if (error.status === 500) {
  //           this.toastr.error('Impossible to load. Please try again later.', 'Error');
  //         }
  //       }
  //     );
  //   } else {
  //     this.router.navigateByUrl('/tables');
  //   }
  // }

  //test= this.callAddEtudiant().pipe(shareReplay(1));

  onSubmit(): void {
    this.service
      .addEtudiant({
        firstName: this.etudiant.firstName,
        lastName: this.etudiant.lastName,
        email: this.etudiant.email,
        username: this.etudiant.username,
      })
      .pipe(
        mergeMap((newEtudiant: Etudiant) => {
          console.log('Nouveau etudiant ajouté:', newEtudiant);
          return this.callAddSectionToEtudiant(newEtudiant);
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

  callAddSectionToEtudiant(newEtudiant: Etudiant) {
    const selectedSection = this.etudiant.section;
    if (selectedSection !== undefined && newEtudiant.id) {
      console.log(selectedSection);
      return this.service.addSectionToEtudiant(
        newEtudiant.id,
        selectedSection.id
      );
    } else {
      return of(null);
    }
  }
}
