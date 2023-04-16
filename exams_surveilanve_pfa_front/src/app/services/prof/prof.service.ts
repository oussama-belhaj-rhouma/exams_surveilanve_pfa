import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prof } from 'src/app/models/Prof';

@Injectable({
  providedIn: 'root',
})
export class ProfService {
  constructor(private http: HttpClient) {}

  public getProfs(): Observable<Prof[]> {
    return this.http.get<Prof[]>('http://localhost:8080/prof/all', {
      withCredentials: true,
    });
  }

  // public getProf(id: number): Observable<Prof> {
  //   return this.http.get<Prof>('http://localhost:8080/prof/find/${id}', {
  //     withCredentials: true,
  //   });
  // }

  public addProf(p: Prof): Observable<Prof> {
    return this.http.post<Prof>('http://localhost:8080/prof/add', p, {
      withCredentials: true,
    });
  }

  public updateProf(p: Prof): Observable<Prof> {
    return this.http.put<Prof>('http://localhost:8080/prof/update', p, {
      withCredentials: true,
    });
  }

  public deleteProf(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/prof/delete/${id}`, {
      withCredentials: true,
    });
  }
}
