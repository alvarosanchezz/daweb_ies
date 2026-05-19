import { Alumno } from './alumno.model';
import { Asignatura } from './asignatura.model';

export interface Matricula {
  id: number;
  curso: number;
  notaMedia: number;
  alumno: Alumno;
  asignatura: Asignatura;
}
