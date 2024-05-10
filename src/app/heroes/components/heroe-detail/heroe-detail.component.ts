import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../../schemas/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroe-detail',
  templateUrl: './heroe-detail.component.html',
})
export class HeroeDetailComponent implements OnInit {
  pageTitle = 'Heroe Detail';
  heroe: Hero | undefined;
  errorMessage = '';

  private router = inject(Router);
  private heroService = inject(HeroesService);

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero(): void {
    const id = this.heroService.getHeroId();
    if (id) {
      this.getHeroe(id);
    }
  }

  getHeroe(id: number): void {
    this.heroService.getHero(id).subscribe({
      next: (heroe) => (this.heroe = heroe),
      error: (err) => (this.errorMessage = err),
    });
  }

  onBack(): void {
    this.router.navigate(['/heroes']);
  }
}
