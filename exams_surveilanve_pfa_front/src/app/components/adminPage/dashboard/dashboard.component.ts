import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public editSection!: Section |null ;
  public deleteSection!: Section | null;
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

  public onOpenModal(section: Section | null , mode: string): void {
    const container = document.getElementById('main-container') ;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSectionModal');
    }
    if (mode === 'edit') {
      this.editSection=section;
      button.setAttribute('data-target', '#updateSectionModal');
    }
    if (mode === 'delete') {
      this.deleteSection=section;
      button.setAttribute('data-target', '#deleteSectionModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
  public onAddSection(form: NgForm){
     document.getElementById("add-Section-form")?.click();
     this.sectionService.addSection(form.value).subscribe(
       (      Response: any) =>{
         this.getsections();
         console.log(Response);
         form.reset();
        },
         (error : HttpErrorResponse) => {alert(error.message) ;
           form.reset(); }
    )
  }

  public onUpdateSection(form: NgForm){
    document.getElementById("update-Section-form")?.click();
    this.sectionService.updateSection(form.value).subscribe(
      (      Response: any) =>{
        this.getsections();
        console.log(Response);
        form.reset();
       },
        (error : HttpErrorResponse) => {alert(error.message) ;
          form.reset(); }
   )
 }

 public onDeleteSection( SectionId: any){
  this.sectionService.deleteSection(SectionId).subscribe(
    (Response: any) =>{
    console.log(Response);
    this.getsections();
   },
     (error : HttpErrorResponse) => {alert(error.message)}
 )
}


}
