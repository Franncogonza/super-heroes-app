import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });

    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch heroes from API via GET request', () => {
    const mockHeroes = [
      { id: 1, name: 'Spider-Man' },
      { id: 2, name: 'Iron Man' },
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('assets/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ superheroes: mockHeroes });
  });

  it('should fetch a hero by id from API via GET request', () => {
    const mockHero = { id: 1, name: 'Spider-Man' };

    service.getHero(1).subscribe((hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne('assets/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ superheroes: [mockHero] });
  });

  it('should create a hero via POST request', () => {
    const newHero = { name: 'Hulk' };

    service.createHero(newHero).subscribe((hero) => {
      expect(hero.id).toBeDefined();
      expect(hero.name).toBe(newHero.name);
    });

    const req = httpMock.expectOne('assets/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ superheroes: [] }); // Mocking an empty array of heroes
  });

  it('should update a hero via PUT request', () => {
    const updatedHero = { id: 1, name: 'Iron Man', description: 'Genius, billionaire, playboy, philanthropist', image: 'iron-man.jpg' };

    service.updateHero(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne('assets/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ superheroes: [updatedHero] });
  });

  it('should delete a hero via DELETE request', () => {
    const deletedHeroId = 1;

    service.deleteHero(deletedHeroId).subscribe((id) => {
      expect(id).toBe(deletedHeroId);
    });

    const req = httpMock.expectOne('assets/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ superheroes: [] });
  });


  it('should add a hero via POST request', () => {
    const newHero = { name: 'Thor' };

    service.addHero(newHero).subscribe((hero) => {
      expect(hero.id).toBeDefined();
      expect(hero.name).toBe(newHero.name);
    });

    const req = httpMock.expectOne('assets/heroes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ superheroes: [] });
  });
});
