import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBug, faUser, faLock, faEye, faEyeSlash, faChevronRight, faBell, faKeyboard, faCheckDouble, faBolt, faMicrochip} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('canvasElement', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  username: string = '';
  password: string = '';
  isRegistering: boolean = false;
  email: string = '';
  showLoader: boolean = false;
  showPassword: boolean = false;
  currentInfoIndex: number = 0;       // Para la contraseña
  showConfirmPassword: boolean = false;
  mouseX: number = 0;
  mouseY: number = 0;
  
  systemInfo: {
    title: string;
    icon: IconDefinition; // Cambiar a IconDefinition
    items: { text: string; icon: IconDefinition }[]; // Cambiar a IconDefinition
}[] = [
    {
        title: "Bugs arreglados",
        icon: faBug,
        items: [
            { text: 'Corregido error de carga en reportes', icon: faCheckDouble }, // Cambiar a faCheckDouble
            { text: 'Solucionado problema de sincronización', icon: faCheckDouble },
            { text: 'Mejorado rendimiento en dispositivos móviles', icon: faCheckDouble }
        ]
    },
    {
        title: "Novedades",
        icon: faBell,
        items: [
            { text: 'Nueva interfaz de usuario más intuitiva', icon: faBolt }, // Cambiar a faBolt
            { text: 'Integración con servicios de terceros', icon: faBolt },
            { text: 'Modo oscuro automático', icon: faBolt }
        ]
    },
    {
        title: "Atajos de teclado",
        icon: faKeyboard,
        items: [
            { text: 'Ctrl + N: Nuevo documento', icon: faMicrochip }, // Cambiar a faMicrochip
            { text: 'Ctrl + F: Búsqueda rápida', icon: faMicrochip },
            { text: 'Ctrl + S: Guardar cambios', icon: faMicrochip }
        ]
    }
];
  

  constructor(private library: FaIconLibrary) {
    library.addIcons(faBug, faUser, faLock, faEye, faEyeSlash, faChevronRight, faBell, faKeyboard);
  }

  ngOnInit() {
    this.setupCanvas();
    this.startInfoRotation();
  }

  onSubmit() {
    // Manejar el inicio de sesión
  }

  onRegister() {
    // Aquí va la lógica para crear usuario
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  startInfoRotation() {
    setInterval(() => {
      this.currentInfoIndex = (this.currentInfoIndex + 1) % this.systemInfo.length;
    }, 5000);
  }

  createUser() {
    this.showLoader = true; // Muestra el spinner
    this.isRegistering = false; // Oculta el formulario de inicio de sesión
    setTimeout(() => {
      this.showLoader = false; // Oculta el spinner
      this.isRegistering = true; // Muestra el formulario de registro
    }, 2000); // Cambia después de 3 segundos
  }
  
  setupCanvas() { 
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Inicializa el tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Particle[] = [];
    const particleCount = 150;
    const colors = ['#00ff99', '#00ffcc', '#33ff33', '#66ffff', '#00ff66']; // Verde

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
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#000a05');
      gradient.addColorStop(0.3, '#001a0f');
      gradient.addColorStop(0.7, '#002617');
      gradient.addColorStop(1, '#003320');

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
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
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

    const getMousePosition = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', getMousePosition);

    const animate = () => {
      drawBackground();
      particles.forEach((particle) => {
        particle.update(this.mouseX, this.mouseY);
        particle.draw();
      });

      drawLines();
      requestAnimationFrame(animate);
    };

    // Iniciar la animación inmediatamente
    animate();
  }
}