import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faBug,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faChevronRight,
  faBell,
  faKeyboard,
  faCheckDouble,
  faBolt,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LoginService } from '../service/login.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('canvasElement', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.setupCanvas();
    this.RotacionInformacion();
  }

  constructor(private library: FaIconLibrary, private loginService: LoginService, private router: Router) {
    library.addIcons(
      faBug,
      faUser,
      faLock,
      faEye,
      faEyeSlash,
      faChevronRight,
      faBell,
      faKeyboard
    );
  }

  // * Iniciar sesion
  username: string = '';
  password: string = '';

  // * Resgistrarse
  isRegistering: boolean = false;
  email: string = '';
  showConfirmPassword: boolean = false;
  showLoader: boolean = false;
  showPassword: boolean = false;

  // * Informacion del sistema
  currentInfoIndex: number = 0;

  // * Fondo canvas
  mouseX: number = 0;
  mouseY: number = 0;

  InfoSistema: {
    title: string;
    icon: IconDefinition;
    items: { text: string; icon: IconDefinition }[];
  }[] = [
    {
      title: 'Bugs arreglados',
      icon: faBug,
      items: [
        { text: 'Corregido error de carga en reportes', icon: faCheckDouble },
        { text: 'Solucionado problema de sincronización', icon: faCheckDouble },
        {
          text: 'Mejorado rendimiento en dispositivos móviles',
          icon: faCheckDouble,
        },
      ],
    },
    {
      title: 'Novedades',
      icon: faBell,
      items: [
        { text: 'Nueva interfaz de usuario más intuitiva', icon: faBolt },
        { text: 'Integración con servicios de terceros', icon: faBolt },
        { text: 'Modo oscuro automático', icon: faBolt },
      ],
    },
    {
      title: 'Atajos de teclado',
      icon: faKeyboard,
      items: [
        { text: 'Ctrl + N: Nuevo documento', icon: faMicrochip },
        { text: 'Ctrl + F: Búsqueda rápida', icon: faMicrochip },
        { text: 'Ctrl + S: Guardar cambios', icon: faMicrochip },
      ],
    },
  ];

  onSubmit() {
    const loginData = {
      username: this.username, 
      password: this.password
    };
  
    this.loginService.postData('usuarios/login/', loginData).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message === 'Login correcto') { // Verifica que el mensaje coincide
          localStorage.setItem('token', response.token); 
          alert('Inicio de sesión exitoso.'); // Mensaje de éxito
          this.router.navigate(['/dashboard']); // Redirige al dashboard
        } else {
          alert('Credenciales incorrectas. Intenta nuevamente.');
        }
      },
      error: (err) => {
        console.log(err);
        alert('Error al realizar el login. Intenta nuevamente.');
      }
    });
  }  
  
  

  crearUsuario() {
    // Aquí va la lógica para crear usuario
  }

  AlternarVisibilidadPassword() {
    this.showPassword = !this.showPassword;
  }

  AlternarVisibilidadCreacionPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  RotacionInformacion() {
    setInterval(() => {
      this.currentInfoIndex =
        (this.currentInfoIndex + 1) % this.InfoSistema.length;
    }, 5000);
  }

  crearUsuarioVisibilidad() {
    this.showLoader = true;
    this.isRegistering = false;
    setTimeout(() => {
      this.showLoader = false;
      this.isRegistering = true;
    }, 2000);
  }

  setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 150;
    // const colors = ['#cc33ff', '#9966ff', '#ff33ff', '#bf00ff', '#d580ff']; //  ORIGINAL
    // const colors = ['#ff3333', '#ff6666', '#ff0000', '#ff9999', '#ff4d4d']; // ! ROJO
    const colors = ['#00ff99', '#00ffcc', '#33ff33', '#66ffff', '#00ff66']; // * VERDE
    // const colors = ['#00ffff', '#00ccff', '#0099ff', '#0066ff', '#00aaff']; // ? NEON

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      maxSpeed: number = 0.7;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.radius = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);

          const repulsionStrength = 1.55;
          this.vx += repulsionStrength * force * Math.cos(angle);
          this.vy += repulsionStrength * force * Math.sin(angle);
        }

        this.limitSpeed();
      }

      limitSpeed() {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > this.maxSpeed) {
          this.vx = (this.vx / speed) * this.maxSpeed;
          this.vy = (this.vy / speed) * this.maxSpeed;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawBackground() {
      if (!ctx) return;
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );
      //  ORIGINAL
      // gradient.addColorStop(0, '#0a000a');
      // gradient.addColorStop(0.3, '#1a001a');
      // gradient.addColorStop(0.7, '#260026');
      // gradient.addColorStop(1, '#330033');

      // * VERDE
      gradient.addColorStop(0, '#000a05');
      gradient.addColorStop(0.3, '#001a0f');
      gradient.addColorStop(0.7, '#002617');
      gradient.addColorStop(1, '#003320');

      // ! ROJO
      // gradient.addColorStop(0, '#0a0000');
      // gradient.addColorStop(0.3, '#1a0000');
      // gradient.addColorStop(0.7, '#260000');
      // gradient.addColorStop(1, '#330000');

      // ? NEON
      // gradient.addColorStop(0, '#001624');
      // gradient.addColorStop(0.1, '#000a14');
      // gradient.addColorStop(0.3, '#000305');
      // gradient.addColorStop(0.5, '#000000');
      // gradient.addColorStop(0.7, '#000305');
      // gradient.addColorStop(0.9, '#000a14');
      // gradient.addColorStop(1, '#001624');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawLines() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    const getPosicionRaton = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', getPosicionRaton);

    const animate = () => {
      drawBackground();
      particles.forEach((particle) => {
        particle.update(this.mouseX, this.mouseY);
        particle.draw();
      });

      drawLines();
      requestAnimationFrame(animate);
    };

    animate();
  }
}
