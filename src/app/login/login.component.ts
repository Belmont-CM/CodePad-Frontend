import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('canvasElement', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  username: string = '';
  password: string = '';
  isRegistering: boolean = false;
  showPassword: boolean = false;
  currentInfoIndex: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  
  systemInfo = [
    {
      title: "Novedades",
      icon: "fa-bell",
      items: [
        "Nueva interfaz de usuario más intuitiva",
        "Integración con servicios de terceros",
        "Modo oscuro automático"
      ]
    },
    {
      title: "Atajos de teclado",
      icon: "fa-keyboard",
      items: [
        "Ctrl + N: Nuevo documento",
        "Ctrl + F: Búsqueda rápida",
        "Ctrl + S: Guardar cambios"
      ]
    },
    {
      title: "Bugs arreglados",
      icon: "fa-bug",
      items: [
        "Corregido error de carga en reportes",
        "Solucionado problema de sincronización",
        "Mejorado rendimiento en dispositivos móviles"
      ]
    }
  ];
email: any;

  ngAfterViewInit() {
    this.setupCanvas();
    this.startInfoRotation();
  }

  onSubmit() {
    // Manejar el inicio de sesión
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  startInfoRotation() {
    setInterval(() => {
      this.currentInfoIndex = (this.currentInfoIndex + 1) % this.systemInfo.length;
    }, 5000);
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
    //  const colors = ['#cc33ff', '#9966ff', '#ff33ff', '#bf00ff', '#d580ff']; //  ORIGINAL
    //  const colors = ['#ff3333', '#ff6666', '#ff0000', '#ff9999', '#ff4d4d']; // ! ROJO
     const colors = ['#00ff99', '#00ffcc', '#33ff33', '#66ffff', '#00ff66']; // * VERDE
    //  const colors = ['#00ffff', '#00ccff', '#0099ff', '#0066ff', '#00aaff']; // ? NEON



    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      maxSpeed: number = .7; // Velocidad máxima de las partículas (ajustable)

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.radius = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Detectar bordes del canvas
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // * Lógica de interacción con el mouse
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100; // Rango de influencia del ratón

        if (distance < maxDistance) {
          // Cuanto más cerca esté del ratón, mayor es la fuerza de repulsión
          const force = (maxDistance - distance) / maxDistance; 
          const angle = Math.atan2(dy, dx); 

          // Reducimos la fuerza de repulsión
          const repulsionStrength = 1.55; // Factor para hacer el movimiento más lento
          this.vx += repulsionStrength * force * Math.cos(angle);
          this.vy += repulsionStrength * force * Math.sin(angle);
        }

        // Limitar la velocidad de las partículas
        this.limitSpeed();
      }

      // Función para limitar la velocidad de las partículas
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
      const gradient = ctx!.createLinearGradient(0, 0, canvas.width, canvas.height);
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

      ctx!.fillStyle = gradient;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawLines() { 
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) { 
            ctx!.beginPath();
            const gradient = ctx!.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            ctx!.strokeStyle = gradient;
            ctx!.lineWidth = 2;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    // Función para obtener la posición del ratón
    const getMousePosition = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
    };

    // Escuchar el evento de movimiento del ratón
    canvas.addEventListener('mousemove', getMousePosition);

    const animate = () => { 
      drawBackground();
      particles.forEach((particle) => {
        particle.update(this.mouseX, this.mouseY); // Pasamos la posición del ratón
        particle.draw();
      });

      drawLines();
      requestAnimationFrame(animate);
    };

    animate();
  }
}