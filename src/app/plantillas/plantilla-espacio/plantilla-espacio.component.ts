import { Component, ElementRef, Renderer2, ViewChild, HostListener, AfterViewInit } from '@angular/core';

interface Star {
  x: number;
  y: number;
  radius: number;
  brightness: number;
  flickerSpeed: number;
}

@Component({
  selector: 'app-plantilla-espacio',
  templateUrl: './plantilla-espacio.component.html',
  styleUrls: ['./plantilla-espacio.component.css']
})
export class PlantillaEspacioComponent implements AfterViewInit {
  @ViewChild('spaceCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private stars: Star[] = [];
  private starCount = 200;
  private nebulaOffset = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.initializeCanvas(canvas);
    this.createStars(canvas);

    this.animate(ctx, canvas);
  }

  private initializeCanvas(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createStars(canvas: HTMLCanvasElement) {
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        brightness: Math.random(),
        flickerSpeed: Math.random() * 0.05 + 0.01
      });
    }
  }

  private drawNebula(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, offset: number) {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );

    gradient.addColorStop(0, 'rgba(16, 24, 32, 0)');
    gradient.addColorStop(0.5, `rgba(48, 64, 96, ${0.2 + Math.sin(offset) * 0.05})`);
    gradient.addColorStop(1, 'rgba(16, 24, 32, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private animate(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.drawNebula(ctx, canvas, this.nebulaOffset);
      this.nebulaOffset += 0.001;

      this.stars.forEach(star => {
        star.brightness += Math.sin(Date.now() * star.flickerSpeed) * 0.05;
        star.brightness = Math.max(0.3, Math.min(star.brightness, 1));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();

        // Efecto parallax suave
        star.x += (0.05 * star.radius);
        if (star.x > canvas.width) star.x = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const canvas = this.canvasRef.nativeElement;
    this.initializeCanvas(canvas);
  }
}
