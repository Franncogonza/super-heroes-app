import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeroListComponent } from './components/hero-list/hero-list.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AddHeroComponent } from './components/add-hero/add-hero.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';
import { UppercaseDirective } from './directives/uppercase.directive';
import { LoadingInterceptor } from './interceptors/loading-interceptor.interceptor';
import { HomeComponent } from './components/home/home.component';
import { HeroeComponent } from './components/heroe-detail/heroe.component';
import { FilterHeroComponent } from './components/shared/filter-hero/filter-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroListComponent,
    NavbarComponent,
    AddHeroComponent,
    EditHeroComponent,
    ConfirmModalComponent,
    UppercaseDirective,
    HeroeComponent,
    FilterHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
