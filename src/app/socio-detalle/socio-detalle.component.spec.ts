import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioDetalleComponent } from './socio-detalle.component';

describe('SocioDetalleComponent', () => {
  let component: SocioDetalleComponent;
  let fixture: ComponentFixture<SocioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocioDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
