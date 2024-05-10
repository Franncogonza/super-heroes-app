import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroesRoutingModule } from './heroes-routing.module';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroeDetailComponent } from './components/heroe-detail/heroe-detail.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { UppercaseDirective } from '../directives/uppercase.directive';
import { HttpClientModule } from '@angular/common/http';
import { HeroHeaderComponent } from './components/hero-header/hero-header.component';
import { HeroPaginatorComponent } from './components/hero-paginator/hero-paginator.component';

@NgModule({
  declarations: [
    HeroListComponent,
    AddHeroComponent,
    EditHeroComponent,
    ConfirmModalComponent,
    UppercaseDirective,
    HeroeDetailComponent,
    HeroCardComponent,
    HeroHeaderComponent,
    HeroPaginatorComponent,
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
