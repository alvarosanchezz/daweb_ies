import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private apiUrl = `${environment.baseUrl}/alumno`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }
}
