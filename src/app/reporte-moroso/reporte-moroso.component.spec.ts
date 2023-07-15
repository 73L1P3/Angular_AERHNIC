import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMorosoComponent } from './reporte-moroso.component';

describe('ReporteMorosoComponent', () => {
  let component: ReporteMorosoComponent;
  let fixture: ComponentFixture<ReporteMorosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMorosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMorosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
