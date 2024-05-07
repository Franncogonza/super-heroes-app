import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { HeroeComponent } from './components/heroe-detail/heroe.component';
import { HomeComponent } from './components/home/home.component';
import { FilterHeroComponent } from './components/shared/filter-hero/filter-hero.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroe/:id', component: HeroeComponent },
  { path: 'add-hero', component: AddHeroComponent },
  { path: 'edit-hero/:id', component: EditHeroComponent },
  { path: 'filter/:term', component: FilterHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
