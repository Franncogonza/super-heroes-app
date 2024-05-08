import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  show(): void {
    if (++this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    if (--this.loadingCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
