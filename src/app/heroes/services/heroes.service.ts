import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../schemas/hero.interface';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private apiUrl = 'assets/heroes.json';
  private heroesCache!: Hero[];
  private heroId: number | undefined;
  private http = inject(HttpClient);

  getHeroes(): Observable<Hero[]> {
    if (this.heroesCache) {
      return new Observable((observer) => {
        observer.next(this.heroesCache);
        observer.complete();
      });
    } else {
      return this.http.get<{ superheroes: Hero[] }>(this.apiUrl).pipe(
        map((response) => {
          this.heroesCache = response.superheroes;
          return this.heroesCache;
        })
      );
    }
  }
  setHeroId(id: number): void {
    this.heroId = id;
  }

  getHeroId(): number | undefined {
    return this.heroId;
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.getHeroes().pipe(
      map((heroes) => heroes.find((hero) => hero.id === id))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const newHero = { ...hero, id: this.heroesCache.length + 1 };
    this.heroesCache.push(newHero);
    return of(hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    const index = this.heroesCache.findIndex((h) => h.id === hero.id);
    if (index > -1) {
      this.heroesCache[index] = hero;
    }
    return of(hero);
  }

  deleteHero(id: number): Observable<number> {
    this.heroesCache = this.heroesCache.filter((hero) => hero.id !== id);
    return new Observable((observer) => {
      observer.next(id);
      observer.complete();
    });
  }

  searchHero(term: string): Observable<Hero[]> {
    return this.getHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) =>
          hero.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }
}
