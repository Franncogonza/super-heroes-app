import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
})
export class EditHeroComponent implements OnInit {
  heroForm: FormGroup;
  heroId!: number;

  constructor(
    private heroService: HeroesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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
    this.heroService.updateHero(updatedHero).subscribe({
      next: () => this.router.navigate(['/heroes']),
      error: (err) => console.error('Error updating hero:', err),
    });
  }

  onBack(): void {
    this.router.navigate(['/Heroes']);
  }
}
