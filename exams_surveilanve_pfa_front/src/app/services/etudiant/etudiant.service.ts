import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from 'src/app/models/Calendrier';
import { Etudiant } from 'src/app/models/Etudiant';
import { Section } from 'src/app/models/Section';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) {}
  public getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>('http://localhost:8080/etudiant/all', {
      withCredentials: true,
    });
  }

   public getEtudiant(id: number): Observable<Etudiant> {
     return this.http.get<Etudiant>('http://localhost:8080/etudiant/find/${id}', {
    withCredentials: true,
    });
   }

  public addEtudiant(m: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>('http://localhost:8080/etudiant/add', m, {
      withCredentials: true,
    });
  }

  public updateEtudiant(m: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>('http://localhost:8080/etudiant/update', m, {
      withCredentials: true,
    });
  }

  public deleteEtudiant(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/etudiant/delete/${id}`, {
      withCredentials: true,
    });
  }

 public addSectionToEtudiant(etudiantId: number, sectionId: number): Observable<Etudiant> {
    return this.http.post<Etudiant>(`http://localhost:8080/etudiant/addSection/${etudiantId}/${sectionId}`,null )
  }


    public getCalendriers(): Observable<Calendrier[]>{
      return this.http.get<Calendrier[]>(`http://localhost:8080/etudiant/calendriers/`, {
        withCredentials: true,
      });
  

    }

}


