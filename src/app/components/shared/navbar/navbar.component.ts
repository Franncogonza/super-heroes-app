import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private router = inject(Router);

  searchHero(searchTerm: string) {
    this.router.navigate(['/heroes', { term: searchTerm }]);
  }
}
