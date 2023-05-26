import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'src/app/models/Session';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  public getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>('http://localhost:8080/session/all', {
      withCredentials: true,
    });
  }

  public getSession(id: number): Observable<Session> {
    return this.http.get<Session>(`http://localhost:8080/session/find/${id}`, {
      withCredentials: true,
    });
  }

  public addSession(s: Session): Observable<Session> {
    return this.http.post<Session>('http://localhost:8080/session/add', s, {
      withCredentials: true,
    });
  }

  public updateSession(s: Session): Observable<Session> {
    return this.http.put<Session>('http://localhost:8080/session/update', s, {
      withCredentials: true,
    });
  }

  public deleteSession(id: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/session/delete/${id}`,
      {
        withCredentials: true,
      }
    );
  }

  public addCalendrier(
    affectationId: number,
    CalendrierId: number
  ): Observable<void> {
    return this.http.post<void>(
      `http://localhost:8080/affectation/addCalendrier/${affectationId}/${CalendrierId}`,
      null
    );
  }
}
