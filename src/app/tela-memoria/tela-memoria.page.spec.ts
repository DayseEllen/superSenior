import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMemoriaPage } from './tela-memoria.page';

describe('TelaMemoriaPage', () => {
  let component: TelaMemoriaPage;
  let fixture: ComponentFixture<TelaMemoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaMemoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaMemoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
