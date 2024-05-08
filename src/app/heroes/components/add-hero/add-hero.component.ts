import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../../shared/services/loading.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
})
export class AddHeroComponent implements OnDestroy {
  heroForm: FormGroup;
  private subscriptions = new Subscription();

  private loadingService = inject(LoadingService);
  private router = inject(Router);
  private heroService = inject(HeroesService);

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
    });
  }

  addHero(): void {
    if (this.heroForm.valid) {
      this.subscriptions.add(
        this.heroService.createHero(this.heroForm.value).subscribe({
          next: () => {
            this.router.navigate(['/heroes']);
            this.loadingService.show();
            return void 0;
          },
          error: (err) => console.error('Error creating hero:', err),
        })
      );
    }
    this.loadingService.hide();
  }

  onBack(): void {
    this.router.navigate(['/heroes']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
