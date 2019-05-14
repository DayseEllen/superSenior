import { TestBed } from '@angular/core/testing';

import { BdperguntaService } from './bdpergunta.service';

describe('BdperguntaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BdperguntaService = TestBed.get(BdperguntaService);
    expect(service).toBeTruthy();
  });
});
