import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/Affectation';
import { AffectationService } from 'src/app/services/affectation/affectation.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private service: AffectationService) {}
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
        console.log(this.affectations);
        this.test();
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

  public test() {
    for (let i = 0; i < this.affectations.length; i++) {
      console.log(this.affectations[i].dayy + this.affectations[i].time);
      let a = document.getElementById(
        this.affectations[i].dayy + this.affectations[i].time
      );
      a!.removeAttribute('disabled');
      a!.classList.remove('btn-secondary');
      a!.classList.add('btn-success');
      a!.textContent =
        this.affectations[0].matiere.name +
        '\n' +
        this.affectations[0].section.sectionName;
    }
  }
}
