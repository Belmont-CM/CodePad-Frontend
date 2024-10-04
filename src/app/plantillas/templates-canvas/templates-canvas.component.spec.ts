import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesCanvasComponent } from './templates-canvas.component';

describe('TemplatesCanvasComponent', () => {
  let component: TemplatesCanvasComponent;
  let fixture: ComponentFixture<TemplatesCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplatesCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatesCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
