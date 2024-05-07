import { HeroesService } from './../../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'filter-hero',
  templateUrl: './filter-hero.component.html',
})
export class FilterHeroComponent implements OnInit, OnDestroy {
  heroes: any[] = [];
  term: string = '';

  private routeSub!: Subscription;
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private heroesService = inject(HeroesService);

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params) => {
      const term = params['term'];
      if (term) {
        console.log(term);
        this.term = term;
        this.searchHeroes(term);
      }
    });
  }

  searchHeroes(term: string): void {
    this.heroesService.searchHero(term).subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  goTo(heroe: any): void {
    this.router.navigate(['/heroe', heroe.id]);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
