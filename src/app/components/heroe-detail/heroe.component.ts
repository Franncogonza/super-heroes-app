import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../schemas/hero.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent implements OnInit {
  pageTitle = 'Heroe Detail';
  heroe: Hero | undefined;
  errorMessage = '';

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private heroService = inject(HeroesService);

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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
