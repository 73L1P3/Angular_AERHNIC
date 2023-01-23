import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoSocioComponent } from './pago-socio.component';

describe('PagoSocioComponent', () => {
  let component: PagoSocioComponent;
  let fixture: ComponentFixture<PagoSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoSocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
