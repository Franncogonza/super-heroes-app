import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
})
export class AddHeroComponent {
  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroesService,
    private router: Router
  ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
    });
  }

  addHero(): void {
    if (this.heroForm.valid) {
      this.heroService.createHero(this.heroForm.value).subscribe({
        next: () => {
          this.router.navigate(['/heroes']);
          return void 0;
        },
        error: (err) => console.error('Error creating hero:', err),
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/Heroes']);
  }
}
