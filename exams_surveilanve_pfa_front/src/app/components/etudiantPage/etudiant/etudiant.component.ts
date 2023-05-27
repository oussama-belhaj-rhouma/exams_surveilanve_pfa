import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Etudiant } from 'src/app/models/Etudiant';
import { EtudiantService } from 'src/app/services/etudiant/etudiant.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent  implements OnInit { 
    currentUser: any;
    currentEtudiant!: Etudiant;
    content?: string;
  constructor(private storageService: StorageService , private etudianService: EtudiantService) { }
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getEtudiant();
  }

  public getEtudiant(): void {
    this.etudianService.getEtudiant(this.currentUser.username).subscribe(
      (      Response: Etudiant)=>{
        this.currentEtudiant=Response;
      }, 
      (error : HttpErrorResponse)=>{
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.currentEtudiant = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public onUpdateEtudiant(form: NgForm){
    document.getElementById("update-form")?.click();
    this.etudianService.updateEtudiant(form.value).subscribe(
      (      Response: any) =>{
        this.getEtudiant();
        console.log(Response);
  
       },
        (error : HttpErrorResponse) => {alert(error.message) ;
    }
   )
 }


}
