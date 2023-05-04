import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/Affectation';
import { Prof } from 'src/app/models/Prof';
import { ProfService } from 'src/app/services/prof/prof.service';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-prof-profile',
  templateUrl: './prof-profile.component.html',
  styleUrls: ['./prof-profile.component.css']
})
export class ProfProfileComponent implements OnInit { 
  currentUser: any;
  currentProf!: Prof;
  content?: string;
  history?: Affectation[];
  constructor(private storageService: StorageService , private profService: ProfService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.getProf();
    this.getHistory();
  }

  public getProf(): void {
    this.profService.getProf(this.currentUser.username).subscribe(
      (      Response: Prof)=>{
        this.currentProf=Response;
      }, 
      (error : HttpErrorResponse)=>{
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.currentProf = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }
      }
    );
  }

  public getHistory(): void {
    this.profService.getHistory(this.currentUser.username).subscribe(
      (      Response: Affectation[])=>{
        this.history=Response;
        console.log(Response)
      }, 
      (error : HttpErrorResponse)=>{
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.currentProf = res.message;
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

