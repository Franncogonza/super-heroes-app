import { HeroesService } from './../../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Hero } from '../../../schemas/hero.interface';

@Component({
  selector: 'filter-hero',
  templateUrl: './filter-hero.component.html',
})
export class FilterHeroComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  term: string = '';

  private routeSub!: Subscription;
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private heroesService = inject(HeroesService);

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      const term = params['term'];
      if (term) {
        this.term = term;
        this.searchHeroes(term);
      } else {
        this.heroesService
          .getHeroes()
          .subscribe((heroes) => (this.heroes = heroes));
      }
    });
  }

  searchHeroes(term: string): void {
    this.heroesService.searchHero(term).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  goTo(heroe: Hero): void {
    this.router.navigate(['/heroe', heroe.id]);
  }

  trackByIndex(index: number): number {
    return index;
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
