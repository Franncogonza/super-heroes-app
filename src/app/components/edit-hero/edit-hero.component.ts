import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
})
export class EditHeroComponent implements OnInit, OnDestroy {
  heroForm: FormGroup;
  heroId!: number;
  private subscriptions = new Subscription();

  private heroService = inject(HeroesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private loadingService = inject(LoadingService);

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadHeroData();
  }

  private loadHeroData() {
    this.heroId = parseInt(this.route.snapshot.params['id'], 10);
    this.heroService.getHero(this.heroId).subscribe((hero) => {
      this.heroForm.setValue({
        name: hero?.name,
        description: hero?.description,
        image: hero?.image,
      });
    });
  }

  saveHero(): void {
    const updatedHero = { ...this.heroForm.value, id: this.heroId };
    this.loadingService.show();

    const sub = this.heroService
      .updateHero(updatedHero)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: () => {
          this.router.navigate(['/heroes']);
          return void 0;
        },
        error: (err) => console.error('Error updating hero:', err),
      });
    this.subscriptions.add(sub);
  }

  onBack(): void {
    this.router.navigate(['/heroes']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
