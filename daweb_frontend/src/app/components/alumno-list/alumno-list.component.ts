import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../models/alumno.model';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.scss'
})
export class AlumnoListComponent {
  private alumnoService = inject(AlumnoService);
  private destroyRef = inject(DestroyRef);

  alumnosValue = signal<Alumno[]>([]);
  alumnosLoading = signal(true);
  alumnosError = signal<unknown>(null);

  constructor() {
    this.loadAlumnos();
  }

  loadAlumnos(): void {
    this.alumnosLoading.set(true);
    this.alumnosError.set(null);
    this.alumnoService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.alumnosValue.set(data);
          this.alumnosLoading.set(false);
        },
        error: err => {
          this.alumnosError.set(err);
          this.alumnosLoading.set(false);
        }
      });
  }
}
