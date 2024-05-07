import { TestBed } from '@angular/core/testing';

import { RestHeroesService } from './heroes.service';

describe('RestHeroesService', () => {
  let service: RestHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestHeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
