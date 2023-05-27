import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/Etudiant';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';
@Component({
  selector: 'app-etudianttable',
  templateUrl: './etudianttable.component.html',
  styleUrls: ['./etudianttable.component.css'],
})
export class EtudianttableComponent implements OnInit {
  constructor(private service: EtudiantService) {}

  public etudiants!: Etudiant[];
  content?: string;

  ngOnInit(): void {
    this.getEtudiants();
  }

  public getEtudiants(): void {
    this.service.getEtudiants().subscribe(
      (Response: Etudiant[]) => {
        this.etudiants = Response;
        console.log(this.etudiants);
      },
      (error: HttpErrorResponse) => {
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.etudiants = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public onDeleteEtudiant(id: number | any) {
    this.service.deleteEtudiant(id).subscribe(
      (Response: any) => {
        console.log(Response);
        this.getEtudiants();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
