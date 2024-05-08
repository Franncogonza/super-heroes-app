import { Component, inject } from '@angular/core';
import { Hero } from '../../../schemas/hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];

  private router = inject(Router);

  searchHero(searchText: string) {
    this.router.navigate(['/filter', searchText]);
  }
}
