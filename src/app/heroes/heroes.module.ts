import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroeComponent } from './components/heroe-detail/heroe.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { UppercaseDirective } from '../directives/uppercase.directive';
import { HttpClientModule } from '@angular/common/http';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';

@NgModule({
  declarations: [
    HeroListComponent,
    AddHeroComponent,
    EditHeroComponent,
    ConfirmModalComponent,
    UppercaseDirective,
    HeroeComponent,
    HeroCardComponent,
    HeroHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    HttpClientModule,
  ],
})
export class HeroesModule {}
