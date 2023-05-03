import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from 'src/app/models/Salle';

@Injectable({
  providedIn: 'root',
})
export class SalleService {
  constructor(private http: HttpClient) {}

  public getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>('http://localhost:8080/salle/all', {
      withCredentials: true,
    });
  }

   public getSalle(id: number): Observable<Salle> {
     return this.http.get<Salle>(`http://localhost:8080/salle/find/${id}`, {
       withCredentials: true,
     });
   }

  public addSalle(s: Salle): Observable<Salle> {
    return this.http.post<Salle>('http://localhost:8080/salle/add', s, {
      withCredentials: true,
    });
  }

  public updateSalle(s: Salle): Observable<Salle> {
    return this.http.put<Salle>('http://localhost:8080/salle/update', s, {
      withCredentials: true,
    });
  }

  public deleteSalle(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/salle/delete/${id}`, {
      withCredentials: true,
    });
  }
}
