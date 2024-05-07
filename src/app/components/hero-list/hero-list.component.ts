import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { Hero } from '../../schemas/hero.interface';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit {
  heroes: any = [];
  showModal = false;
  selectedHeroId: number | null = null;
  paginatedHeroes: any = [];
  currentPage = 1;
  heroesPerPage = 6;
  totalPages = 1;

  private heroService = inject(HeroesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (heroes) => {
        this.heroes = heroes;
        this.totalPages = Math.ceil(heroes.length / this.heroesPerPage);
        this.changePage(this.currentPage);
      },
      error: (error) => console.error(error),
    });
  }

  goTo(heroe: any): void {
    this.router.navigate(['/heroe', heroe.id]);
  }

  editHero(heroe: any): void {
    this.router.navigate(['/edit-heroe', heroe.id]);
  }

  showAddHero(): void {
    this.router.navigate(['/add-hero']);
  }

  goToEditHero(hero: any): void {
    this.router.navigate(['/edit-hero', hero.id]);
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  openDeleteModal(id: number): void {
    this.selectedHeroId = id;
    this.showModal = true;
  }

  closeDeleteModal(): void {
    this.showModal = false;
  }

  confirmDelete(): void {
    if (this.selectedHeroId != null) {
      this.heroService.deleteHero(this.selectedHeroId).subscribe(() => {
        const heroesAfterDelete = this.heroes.filter(
          (hero: Hero) => hero.id !== this.selectedHeroId
        );
        this.heroes = heroesAfterDelete;
        this.totalPages = Math.ceil(this.heroes.length / this.heroesPerPage);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
        this.changePage(this.currentPage);
        this.closeDeleteModal();
      });
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.heroesPerPage;
    const endIndex = startIndex + this.heroesPerPage;
    this.paginatedHeroes = this.heroes.slice(startIndex, endIndex);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
