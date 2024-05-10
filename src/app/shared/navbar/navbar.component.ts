import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from './schemas/nav-item-interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() searchPlaceholder = 'Search Hero';
  @Input() title = 'Tour of Heroes';
  @Input() navItems!: NavItem[];

  private router = inject(Router);

  searchHero(event: Event, searchText: any) {
    event.preventDefault();
    const searchTerm = searchText.value;
    searchText.value = '';
    this.router.navigate(['/heroes', { term: searchTerm }]);
  }
}
