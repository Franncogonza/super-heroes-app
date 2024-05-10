import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hero } from '../../schemas/hero.interface';

@Component({
  selector: 'hero-header',
  templateUrl: './hero-header.component.html',
})
export class HeroHeaderComponent {
  @Input() heroes: Hero[] = [];
  @Input() term: string = '';
  @Output() addHeroClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() filterCleared: EventEmitter<void> = new EventEmitter<void>();

  showAddHero(): void {
    this.addHeroClicked.emit();
  }

  clearFilter(): void {
    this.filterCleared.emit();
  }
}
