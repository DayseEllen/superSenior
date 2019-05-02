import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariocadastroPage } from './formulariocadastro.page';

describe('FormulariocadastroPage', () => {
  let component: FormulariocadastroPage;
  let fixture: ComponentFixture<FormulariocadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariocadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariocadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
