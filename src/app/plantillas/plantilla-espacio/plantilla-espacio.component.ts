import { Component, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Estrella {
  x: number;
  y: number;
  radio: number;
  brillo: number;
  velocidadParpadeo: number;
}

interface EstrellaFugaz {
  x: number;
  y: number;
  radio: number;
  brillo: number;
  velocidadX: number;
  velocidadY: number;
  estela: { x: number; y: number; brillo: number }[];
  tonoBlanco?: string;
}
@Component({
  selector: 'app-plantilla-espacio',
  templateUrl: './plantilla-espacio.component.html',
  styleUrls: ['./plantilla-espacio.component.css']
})


export class PlantillaEspacioComponent implements OnInit {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private estrellas: Estrella[] = [];
  private estrellasFugaces: EstrellaFugaz[] = [];
  private clickTimeout: any;  // Para gestionar clicks prolongados
  private clickStartTime: number = 0;  // Tiempo en el que se presionó el botón
  private manteniendoClick: boolean = false;
  private clickPosX: number = 0;  // Posición del clic
  private clickPosY: number = 0;
  private radioCreciente: number = 2.5;  // Tamaño de la estrella que crecerá

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.canvas = this.elementRef.nativeElement.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d')!;
      this.redimensionarCanvas();

      this.crearEstrellas();
      this.animar();

      // Escuchar el redimensionamiento de la ventana
      window.addEventListener('resize', () => this.redimensionarCanvas());

      // Escuchar eventos de click en el canvas
      this.canvas.addEventListener('mousedown', (event) => this.iniciarClick(event));
      this.canvas.addEventListener('mouseup', () => this.terminarClick());
    }
  }

  crearEstrellas(): void {
    for (let i = 0; i < 200; i++) {
      this.estrellas.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radio: Math.random() * 1.5,
        brillo: Math.random(),
        velocidadParpadeo: 0.005 + Math.random() * 0.01,
      });
    }
  }

  dibujarEstrellas(): void {
    this.estrellas.forEach(estrella => {
      this.ctx.beginPath();
      this.ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${estrella.brillo})`;
      this.ctx.fill();

      // Efecto de parpadeo
      estrella.brillo += estrella.velocidadParpadeo;
      if (estrella.brillo > 1 || estrella.brillo < 0.1) {
        estrella.velocidadParpadeo *= -1;
      }
    });
  }

  manejarEstrellasFugaces(): void {
    // Crear estrella fugaz aleatoria ocasionalmente
    if (Math.random() < 0.02 && this.estrellasFugaces.length < 3) {
      this.crearEstrellaFugazAleatoria();
    }

    this.estrellasFugaces.forEach((estrella, index) => {
      this.ctx.beginPath();
      this.ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);

      const tonoBlanco = estrella.tonoBlanco ? estrella.tonoBlanco : `rgba(255, 255, 255, ${estrella.brillo})`;
      this.ctx.fillStyle = tonoBlanco;
      this.ctx.fill();

      // Dibujar la estela
      estrella.estela.forEach((punto, i) => {
        this.ctx.beginPath();
        this.ctx.arc(punto.x, punto.y, estrella.radio * (1 - i / 20), 0, Math.PI * 2);
        this.ctx.fillStyle = tonoBlanco;
        this.ctx.fill();
      });

      // Actualizar posición
      estrella.x += estrella.velocidadX;
      estrella.y += estrella.velocidadY;

      // Añadir punto a la estela
      estrella.estela.unshift({ x: estrella.x, y: estrella.y, brillo: estrella.brillo });
      if (estrella.estela.length > 20) {
        estrella.estela.pop();
      }

      // Desvanecer la estela
      estrella.estela.forEach(punto => {
        punto.brillo *= 0.9;
      });

      // Eliminar la estrella fugaz si sale de la pantalla
      if (
        estrella.x < 0 ||
        estrella.x > this.canvas.width ||
        estrella.y < 0 ||
        estrella.y > this.canvas.height
      ) {
        this.estrellasFugaces.splice(index, 1);
      }
    });
  }

  iniciarClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.clickPosX = event.clientX - rect.left;
    this.clickPosY = event.clientY - rect.top;

    this.manteniendoClick = true;
    this.clickStartTime = Date.now();  // Guardar el tiempo en que se presiona el clic

    this.radioCreciente = 2.5;  // Reiniciar el tamaño de la estrella en cada clic

    // Iniciar la animación de crecimiento mientras el clic se mantiene
    this.clickTimeout = setInterval(() => {
      if (this.manteniendoClick) {
        const elapsedTime = (Date.now() - this.clickStartTime) / 1000;  // Tiempo en segundos
        this.radioCreciente = Math.min(2.5 + elapsedTime * 5, 10);  // Limitar el tamaño máximo
      }
    }, 100);
  }

  terminarClick(): void {
    clearInterval(this.clickTimeout);  // Detener el crecimiento de la estrella
    this.manteniendoClick = false;

    // Crear la estrella fugaz con el tamaño final
    this.crearEstrellaFugazEspecial(this.clickPosX, this.clickPosY, this.radioCreciente);
  }

  crearEstrellaFugazAleatoria(): void {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    const radio = 1.5;
    const brillo = 1;
    const tonoBlanco = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;

    this.estrellasFugaces.push({
      x,
      y,
      radio,
      brillo,
      velocidadX: (Math.random() - 0.5) * 4,
      velocidadY: (Math.random() - 0.5) * 4,
      estela: [],
      tonoBlanco
    });
  }

  crearEstrellaFugazEspecial(x: number, y: number, radio: number): void {
    const brillo = 1.5;
    const tonoBlanco = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;

    this.estrellasFugaces.push({
      x,
      y,
      radio,
      brillo,
      velocidadX: (Math.random() - 0.5) * 6,
      velocidadY: (Math.random() - 0.5) * 6,
      estela: [],
      tonoBlanco
    });
  }

  animar(): void {
    this.ctx.fillStyle = 'rgba(0, 0, 20, 0.2)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.dibujarEstrellas();
    this.manejarEstrellasFugaces();

    requestAnimationFrame(() => this.animar());
  }

  redimensionarCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}