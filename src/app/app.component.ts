import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isLoading: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {
    this.isLoading = this.loadingService.isLoading();
  }

  ngAfterViewInit() {
    this.isLoading.subscribe(() => {
      this.cdRef.detectChanges();
    });
  }
}
