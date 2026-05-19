import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatriculaService } from '../../services/matricula.service';
import { Matricula } from '../../models/matricula.model';

@Component({
  selector: 'app-matricula-list',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './matricula-list.component.html',
  styleUrl: './matricula-list.component.scss'
})
export class MatriculaListComponent {
  private matriculaService = inject(MatriculaService);
  private destroyRef = inject(DestroyRef);

  matriculasValue = signal<Matricula[]>([]);
  matriculasLoading = signal(true);
  matriculasError = signal<unknown>(null);

  constructor() {
    this.loadMatriculas();
  }

  loadMatriculas(): void {
    this.matriculasLoading.set(true);
    this.matriculasError.set(null);
    this.matriculaService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.matriculasValue.set(data);
          this.matriculasLoading.set(false);
        },
        error: err => {
          this.matriculasError.set(err);
          this.matriculasLoading.set(false);
        }
      });
  }

  getNotaColor(nota: number): string {
    if (nota >= 9) return '#22c55e';
    if (nota >= 7) return '#3b82f6';
    if (nota >= 5) return '#f59e0b';
    return '#ef4444';
  }
}
