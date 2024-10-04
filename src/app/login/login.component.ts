import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('canvasElement', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.RotacionInformacion();
    }
  }

  constructor(
    private library: FaIconLibrary,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
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
      password: this.password,
    };

    this.loginService.postData('usuarios/login/', loginData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); // Para depuración
        if (response && response.message === 'Login correcto') {
          localStorage.setItem('token', response.token);
          this.toastr.success('Inicio de sesión exitoso', 'Éxito', {
            positionClass: 'toast-top-right', // Cambiado a la parte superior derecha
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });

          // Redirigir al dashboard después de 3 segundos (después de que la notificación desaparezca)
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000); // 3000ms coincide con el tiempo de la notificación
        } else {
          this.toastr.error('Credenciales incorrectas', 'Error', {
            positionClass: 'toast-top-right', // Ajustado para mantener consistencia
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
        }
      },
      error: (err) => {
        console.error('Error de login:', err); // Para depuración
        this.toastr.error('Error al realizar el login', 'Error', {
          positionClass: 'toast-top-right', // Ajustado para mantener consistencia
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
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

  
}
