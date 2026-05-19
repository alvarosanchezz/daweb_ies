import { Profesor } from './profesor.model';

export interface Asignatura {
  id: number;
  nombre: string;
  horas: number;
  profesor: Profesor;
}
