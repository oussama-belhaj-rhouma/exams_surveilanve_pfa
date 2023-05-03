import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Section } from 'src/app/models/Section';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(private http: HttpClient) {}

  public getSections(): Observable<Section[]> {
    return this.http.get<Section[]>('http://localhost:8080/section/all', {
      withCredentials: true,
    });
  }

   public getSection(id: number): Observable<Section> {
     return this.http.get<Section>(`http://localhost:8080/section/find/${id}`, {
       withCredentials: true,
     });
   }

  public addSection(s: Section): Observable<Section> {
    return this.http.post<Section>('http://localhost:8080/section/add', s, {
      withCredentials: true,
    });
  }

  public updateSection(s: Section): Observable<Section> {
    return this.http.put<Section>('http://localhost:8080/section/update', s, {
      withCredentials: true,
    });
  }

  public deleteSection(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/section/delete/${id}`, {
      withCredentials: true,
    });
  }
}
