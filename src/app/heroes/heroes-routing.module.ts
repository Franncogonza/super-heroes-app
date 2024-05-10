import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroeDetailComponent } from './components/heroe-detail/heroe-detail.component';

const routes: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'add', component: AddHeroComponent },
  { path: 'edit/:id', component: EditHeroComponent },
  { path: ':name', component: HeroeDetailComponent },
  { path: 'search/:term', component: HeroListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
