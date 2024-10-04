import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaNovaComponent } from './plantilla-nova.component';

describe('PlantillaNovaComponent', () => {
  let component: PlantillaNovaComponent;
  let fixture: ComponentFixture<PlantillaNovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantillaNovaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantillaNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
