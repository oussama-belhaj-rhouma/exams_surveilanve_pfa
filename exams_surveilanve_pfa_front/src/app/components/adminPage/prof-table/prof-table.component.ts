import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Prof } from 'src/app/models/Prof';
import { ProfService } from 'src/app/services/prof/prof.service';

@Component({
  selector: 'app-prof-table',
  templateUrl: './prof-table.component.html',
  styleUrls: ['./prof-table.component.css'],
})
export class ProfTableComponent implements OnInit {
  constructor(private service: ProfService) {}

  public profs!: Prof[];
  content?: string;

  ngOnInit(): void {
    this.getprofs();
  }

  public getprofs(): void {
    this.service.getProfs().subscribe(
      (Response: Prof[]) => {
        this.profs = Response;
        console.log(this.profs);
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
  public onDeleteProf(id: number) {
    this.service.deleteProf(id).subscribe(
      (Response: any) => {
        console.log(Response);
        this.getprofs();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
