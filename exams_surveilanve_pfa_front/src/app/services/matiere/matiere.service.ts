import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from 'src/app/models/Matiere';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  constructor(private http: HttpClient) {}

  public getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>('http://localhost:8080/matiere/all', {
      withCredentials: true,
    });
  }

  // public getMatiere(id: number): Observable<Matiere> {
  //   return this.http.get<Matiere>('http://localhost:8080/matiere/find/${id}', {
  //     withCredentials: true,
  //   });
  // }

  public addMatiere(m: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>('http://localhost:8080/matiere/add', m, {
      withCredentials: true,
    });
  }

  public updateMatiere(m: Matiere): Observable<Matiere> {
    return this.http.put<Matiere>('http://localhost:8080/matiere/update', m, {
      withCredentials: true,
    });
  }

  public deleteMatiere(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/matiere/delete/${id}`, {
      withCredentials: true,
    });
  }
}
