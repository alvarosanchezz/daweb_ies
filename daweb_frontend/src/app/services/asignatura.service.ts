import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignatura } from '../models/asignatura.model';
import { Alumno } from '../models/alumno.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private apiUrl = `${environment.baseUrl}/asignatura`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.apiUrl);
  }

  getById(id: number): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}/${id}`);
  }

  getAlumnosByAsignatura(id: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.apiUrl}/${id}/alumnos`);
  }
}
