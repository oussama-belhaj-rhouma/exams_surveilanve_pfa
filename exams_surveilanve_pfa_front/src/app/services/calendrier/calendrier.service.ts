import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from 'src/app/models/Calendrier';

@Injectable({
  providedIn: 'root',
})
export class CalendrierService {
  constructor(private http: HttpClient) {}

  public getCalendriers(): Observable<Calendrier[]> {
    return this.http.get<Calendrier[]>('http://localhost:8080/calendrier/all', {
      withCredentials: true,
    });
  }

  // public getCalendrier(id: number): Observable<Calendrier> {
  //   return this.http.get<Calendrier>('http://localhost:8080/calendrier/find/${id}', {
  //     withCredentials: true,
  //   });
  // }

  public addCalendrier(c: Calendrier): Observable<Calendrier> {
    return this.http.post<Calendrier>('http://localhost:8080/calendrier/add', c, {
      withCredentials: true,
    });
  }

  public updateCalendrier(c: Calendrier): Observable<Calendrier> {
    return this.http.put<Calendrier>('http://localhost:8080/calendrier/update', c, {
      withCredentials: true,
    });
  }

public addAffectation(affectationId: number, calendrierId: number): Observable<Calendrier>{
  return this.http.post<Calendrier>(`http://localhost:8080/calendrier/addAffectaion/${calendrierId}/${affectationId}`, null) 

}

public addSection(sectionId: number, calendrierId: number): Observable<Calendrier>{
  return this.http.post<Calendrier>(`http://localhost:8080/calendrier/addSection/${calendrierId}/${sectionId}`, null)
}

  public deleteCalendrier(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/calendrier/delete/${id}`, {
      withCredentials: true,
    });
  }
}
