import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public username = 'Franco David Gonzalez';
  public study = 'Analista de Sistemas';
  public developWork =
    'Frontend | Angular Developer | TypeScript | Ionic | NodeJs';
  isLoading: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading = this.loadingService.isLoading();
    this.isLoading.subscribe((isLoading) =>
      console.log('Is Loading:', isLoading)
    );
  }
}



