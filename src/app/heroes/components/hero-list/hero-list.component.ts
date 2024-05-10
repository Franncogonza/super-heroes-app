import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../schemas/hero.interface';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingService } from '../../../shared/services/loading.service';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  showModal = false;
  selectedHeroId: number | null = null;
  modalText: string = '';
  paginatedHeroes: Hero[] = [];
  currentPage = 1;
  heroesPerPage = 6;
  totalPages = 1;
  term: string = '';
  isLoading: boolean = false;
  private subscriptions = new Subscription();

  private heroService = inject(HeroesService);
  private router = inject(Router);
  private routeSub!: Subscription;
  private activatedRoute = inject(ActivatedRoute);

  constructor(private loadingService: LoadingService) {
    const sub = this.loadingService.isLoading().subscribe((state) => {
      this.isLoading = state;
    });
    this.subscriptions.add(sub);
  }

  ngOnInit(): void {
    this.loadHeroes();
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      const term = params['term'];
      this.term = term;

      if (term) {
        this.searchHeroes(term);
      } else {
        this.loadHeroes();
      }
    });
  }

  searchHeroes(term: string): void {
    this.heroService.searchHero(term).subscribe({
      next: (heroes) => {
        if (heroes.length > 0) {
          this.heroes = heroes;
          this.totalPages = Math.ceil(heroes.length / this.heroesPerPage);
          this.changePage(1);
        } else {
          this.heroes = [];
          this.paginatedHeroes = [];
          this.totalPages = 0;
          this.currentPage = 1;
        }
      },
      error: (error) => {
        console.error('Error searching heroes:', error);
        this.heroes = [];
        this.paginatedHeroes = [];
        this.totalPages = 0;
        this.currentPage = 1;
      },
    });
  }

  clearFilter(): void {
    this.term = '';
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.heroService.getHeroes().subscribe({
      next: (heroes: Hero[]) => {
        this.heroes = heroes;
        this.totalPages = Math.ceil(heroes.length / this.heroesPerPage);
        this.changePage(1);
      },
      error: (error) => console.error(error),
    });
  }

  showAddHero(): void {
    this.router.navigate(['heroes/add']);
  }

  handleViewHero(hero: Hero): void {
    const heroNameSlug = this.convertToSlug(hero.name);
    this.heroService.setHeroId(hero.id);
    this.router.navigate(['/heroes', heroNameSlug]);
  }

  handleEditHero(heroe: Hero): void {
    this.router.navigate(['/heroes/edit', heroe.id]);
  }

  handleDeleteHero(heroe: Hero): void {
    this.openDeleteModal(heroe.id, heroe.name);
  }

  openDeleteModal(heroId: number, heroName: string): void {
    this.selectedHeroId = heroId;
    this.modalText = `¿Estás seguro de que deseas eliminar a ${heroName}?`;
    this.showModal = true;
  }

  closeDeleteModal(): void {
    this.showModal = false;
  }

  confirmDelete(): void {
    if (this.selectedHeroId != null) {
      this.loadingService.show();
      this.heroService.deleteHero(this.selectedHeroId).subscribe({
        next: () => {
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
          this.loadingService.hide();
        },
        error: (error) => {
          console.error('Error deleting hero:', error);
          this.loadingService.hide();
        },
      });
    }
  }

  changePage(page: any): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.heroesPerPage;
    const endIndex = startIndex + this.heroesPerPage;
    this.paginatedHeroes = this.heroes.slice(startIndex, endIndex);
  }

  onBack(): void {
    this.router.navigate(['/home']);
  }

  convertToSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    this.subscriptions.unsubscribe();
  }
}
