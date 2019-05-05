import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaArrastaPage } from './tela-arrasta.page';

describe('TelaArrastaPage', () => {
  let component: TelaArrastaPage;
  let fixture: ComponentFixture<TelaArrastaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelaArrastaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaArrastaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
