import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Affectation } from 'src/app/models/Affectation';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http: HttpClient) {}

  public getAffectations(): Observable<Affectation[]> {
    return this.http.get<Affectation[]>('http://localhost:8080/affectation/all', {
      withCredentials: true,
    });
  }

   public getAffectation(id: number): Observable<Affectation> {
     return this.http.get<Affectation>(`http://localhost:8080/affectation/find/${id}`, {
       withCredentials: true,
     });
   }

  public addAffectation(a: Affectation): Observable<Affectation> {
    return this.http.post<Affectation>(`http://localhost:8080/affectation/add`, a, {
      withCredentials: true,
    });
  }

  public updateAffectation(a: Affectation): Observable<Affectation> {
    return this.http.put<Affectation>(`http://localhost:8080/affectation/update`, a, {
      withCredentials: true,
    });
  }

  public deleteAffectation(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/affectation/delete/${id}`, {
      withCredentials: true,
    });
  }

  public addSection(affectationId: number , sectionId: number): Observable<Affectation>{
    return this.http.post<Affectation>(`http://localhost:8080/affectation/addSection/${affectationId}/${sectionId}`,null)
  }
  public addMatiere(affectationId: number , matiereId: number): Observable<Affectation>{
    return this.http.post<Affectation>(`http://localhost:8080/affectation/addMatiere/${affectationId}/${matiereId}`,null)
 }

  public addSalle(affectationId: number , salleId: number): Observable<Affectation>{
    return this.http.post<Affectation>(`http://localhost:8080/affectation/addSalle/${affectationId}/${salleId}`,null)
 }


    public addProf(affectationId: number , profId: number): Observable<Affectation>{
      return this.http.post<Affectation>(`http://localhost:8080/affectation/addProf/${affectationId}/${profId}`,null)
    }





}
