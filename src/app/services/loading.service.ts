import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  show() {
    // Incrementa el contador y si es la primera solicitud activa, emite verdadero.
    if (++this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    // Decrementa el contador y si ya no hay solicitudes activas, emite falso.
    if (--this.loadingCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
