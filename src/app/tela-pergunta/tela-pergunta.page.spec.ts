import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPerguntaPage } from './tela-pergunta.page';

describe('TelaPerguntaPage', () => {
  let component: TelaPerguntaPage;
  let fixture: ComponentFixture<TelaPerguntaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaPerguntaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaPerguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
