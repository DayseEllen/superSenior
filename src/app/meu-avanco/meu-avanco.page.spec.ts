import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuAvancoPage } from './meu-avanco.page';

describe('MeuAvancoPage', () => {
  let component: MeuAvancoPage;
  let fixture: ComponentFixture<MeuAvancoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeuAvancoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuAvancoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
