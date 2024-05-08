import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private minimumDisplayTime = 500;

  constructor() {}

  show(): void {
    if (++this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide(): void {
    if (--this.loadingCount === 0) {
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, this.minimumDisplayTime);
    }
  }

  isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}
