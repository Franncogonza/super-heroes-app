import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';
import { NavItem } from './shared/navbar/schemas/nav-item-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isLoading: Observable<boolean>;

  appTitle = 'Heroes App';
  searchPlaceholder = 'Buscar Heroe';
  navItems: NavItem[] = [
    { name: 'Home', link: '/home', active: false },
    { name: 'Heroes List', link: '/heroes', active: false },
  ];

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
