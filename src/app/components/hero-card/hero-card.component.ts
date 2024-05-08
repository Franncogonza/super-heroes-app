import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../schemas/hero.interface';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Output() viewHero = new EventEmitter<any>();
  @Output() editHero = new EventEmitter<any>();
  @Output() deleteHero = new EventEmitter<any>();

  goTo(hero: Hero): void {
    this.viewHero.emit(hero);
  }

  goToEditHero(hero: Hero): void {
    this.editHero.emit(hero);
  }

  openDeleteModal(hero: Hero): void {
    this.deleteHero.emit(hero);
  }
}
