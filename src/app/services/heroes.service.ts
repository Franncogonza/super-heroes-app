import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../schemas/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private apiUrl = 'assets/heroes.json';
  private heroesCache!: Hero[];
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

  searchHero(term: string): Observable<Hero[]> {
    return this.getHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) =>
          hero.name.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  getHero(id: number): Observable<Hero | undefined> {
    return this.getHeroes().pipe(
      map((heroes) => heroes.find((hero) => hero.id === id))
    );
  }

  createHero(hero: any): Observable<any> {
    hero.id = this.heroesCache.length + 1;
    this.heroesCache.push(hero);
    return new Observable((observer) => {
      observer.next(hero);
      observer.complete();
    });
  }

  updateHero(hero: any): Observable<any> {
    const index = this.heroesCache.findIndex((h) => h.id === hero.id);
    if (index > -1) {
      this.heroesCache[index] = hero;
    }
    return new Observable((observer) => {
      observer.next(hero);
      observer.complete();
    });
  }

  deleteHero(id: number): Observable<any> {
    this.heroesCache = this.heroesCache.filter((hero) => hero.id !== id);
    return new Observable((observer) => {
      observer.next(id);
      observer.complete();
    });
  }

  addHero(hero: any): Observable<any> {
    const newHero = { ...hero, id: this.heroesCache.length + 1 };
    this.heroesCache.push(newHero);
    return new Observable((observer) => {
      observer.next(newHero);
      observer.complete();
    });
  }
}
