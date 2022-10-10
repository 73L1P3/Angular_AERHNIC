import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosNuevoComponent } from './pagos-nuevo.component';

describe('PagosNuevoComponent', () => {
  let component: PagosNuevoComponent;
  let fixture: ComponentFixture<PagosNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
