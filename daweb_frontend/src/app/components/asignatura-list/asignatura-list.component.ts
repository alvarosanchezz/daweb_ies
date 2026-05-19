import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../models/asignatura.model';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-asignatura-list',
  standalone: true,
  imports: [],
  templateUrl: './asignatura-list.component.html',
  styleUrl: './asignatura-list.component.scss'
})
export class AsignaturaListComponent {
  private asignaturaService = inject(AsignaturaService);
  private destroyRef = inject(DestroyRef);

  asignaturasValue = signal<Asignatura[]>([]);
  asignaturasLoading = signal(true);
  asignaturasError = signal<unknown>(null);

  alumnosPanelValue = signal<Alumno[]>([]);
  alumnosPanelLoading = signal(false);
  alumnosPanelError = signal<unknown>(null);

  expandedId = signal<number | null>(null);

  constructor() {
    this.loadAsignaturas();
  }

  loadAsignaturas(): void {
    this.asignaturasLoading.set(true);
    this.asignaturasError.set(null);
    this.asignaturaService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.asignaturasValue.set(data);
          this.asignaturasLoading.set(false);
        },
        error: err => {
          this.asignaturasError.set(err);
          this.asignaturasLoading.set(false);
        }
      });
  }

  private loadAlumnos(id: number): void {
    this.alumnosPanelLoading.set(true);
    this.alumnosPanelError.set(null);
    this.asignaturaService.getAlumnosByAsignatura(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.alumnosPanelValue.set(data);
          this.alumnosPanelLoading.set(false);
        },
        error: err => {
          this.alumnosPanelError.set(err);
          this.alumnosPanelLoading.set(false);
        }
      });
  }

  verAlumnos(asigId: number): void {
    if (this.expandedId() === asigId) {
      this.expandedId.set(null);
      this.alumnosPanelValue.set([]);
      this.alumnosPanelError.set(null);
    } else {
      this.expandedId.set(asigId);
      this.loadAlumnos(asigId);
    }
  }
}
