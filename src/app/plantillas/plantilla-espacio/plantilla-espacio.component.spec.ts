import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaEspacioComponent } from './plantilla-espacio.component';

describe('PlantillaEspacioComponent', () => {
  let component: PlantillaEspacioComponent;
  let fixture: ComponentFixture<PlantillaEspacioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantillaEspacioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaEspacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
