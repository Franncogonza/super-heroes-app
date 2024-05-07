import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);

  show(): void {
    console.log('Show loading');
    this.loading.next(true);
  }

  hide(): void {
    console.log('Hide loading');
    this.loading.next(false);
  }
  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
