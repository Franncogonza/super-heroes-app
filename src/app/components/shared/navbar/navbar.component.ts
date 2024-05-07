import { Component } from '@angular/core';
import { Hero } from '../../../schemas/hero.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  heroes: Hero[] = [];
  filteredHeroes: Hero[] = [];

  searchHero(searchText: string) {
    console.log(searchText);
    this.filteredHeroes = this.heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}