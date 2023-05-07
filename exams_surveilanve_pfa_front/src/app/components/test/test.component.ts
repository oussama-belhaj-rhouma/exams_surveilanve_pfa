import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/Affectation';
import { AffectationService } from 'src/app/services/affectation/affectation.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(
    private service: AffectationService,
    private storageService: StorageService
  ) {}
  currentUser: any;
  jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  affectations!: Affectation[];
  content?: string;

  ngOnInit(): void {
    this.getAffectation();
  }

  public getAffectation(): void {
    this.service.getAffectations().subscribe(
      (Response: Affectation[]) => {
        this.affectations = Response;
        // console.log(this.affectations);
        switch (this.storageService.getUser().roles[0]) {
          case 'ROLE_ADMIN':
            this.testall();
            break;
          case 'ROLE_PROF':
            this.testprof();
            break;
          case 'ROLE_ETUDIANT':
            console.log('Option 3 selected');
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
            this.affectations = res.message;
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
    a!.removeAttribute('disabled');
    a!.classList.remove('btn-secondary');
    a!.classList.add('btn-success');
    a!.textContent =
      this.affectations[i].matiere.name +
      '\n' +
      this.affectations[i].section.sectionName;
  }

  public testall() {
    for (let i = 0; i < this.affectations.length; i++) {
      // console.log(this.affectations[i].dayy + this.affectations[i].time);
      let a = document.getElementById(
        this.affectations[i].dayy + this.affectations[i].time
      );
      this.update_case(a, i);
    }
  }

  public testprof() {
    for (let i = 0; i < this.affectations.length; i++) {
      for (let j = 0; j < this.affectations[i].professors.length; j++) {
        this.currentUser = this.storageService.getUser();
        if (
          this.affectations[i].professors[j].username ==
          this.currentUser.username
        ) {
          let a = document.getElementById(
            this.affectations[i].dayy + this.affectations[i].time
          );
          this.update_case(a,i);
        }
      }
    }
  }
}
