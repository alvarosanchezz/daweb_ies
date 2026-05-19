import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-profesor-list',
  standalone: true,
  imports: [],
  templateUrl: './profesor-list.component.html',
  styleUrl: './profesor-list.component.scss'
})
export class ProfesorListComponent {
  private profesorService = inject(ProfesorService);
  private destroyRef = inject(DestroyRef);

  profesoresValue = signal<Profesor[]>([]);
  profesoresLoading = signal(true);
  profesoresError = signal<unknown>(null);

  constructor() {
    this.loadProfesores();
  }

  loadProfesores(): void {
    this.profesoresLoading.set(true);
    this.profesoresError.set(null);
    this.profesorService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.profesoresValue.set(data);
          this.profesoresLoading.set(false);
        },
        error: err => {
          this.profesoresError.set(err);
          this.profesoresLoading.set(false);
        }
      });
  }
}
