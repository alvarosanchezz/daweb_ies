import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private apiUrl = `${environment.baseUrl}/matricula`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiUrl);
  }

  getById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiUrl}/${id}`);
  }
}
