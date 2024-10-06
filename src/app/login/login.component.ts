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
  faPlus,
  faTimes,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('canvasElement', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  registroForm!: FormGroup;

  // Propiedades del componente
  username: string = '';
  password: string = '';
  isRegistering: boolean = false;
  correo: string = '';
  showConfirmPassword: boolean = false;
  showLoader: boolean = false;
  showPassword: boolean = false;
  currentInfoIndex: number = 0;

  // Nuevas propiedades para el formulario de registro
  activeForm: 'main' | 'additional' = 'main';
  showConfirmPasswordReg: boolean = false;
  nombres: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  pistaContrasena: string = '';

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

  constructor(
    private library: FaIconLibrary,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    library.addIcons(
      faBug,
      faUser,
      faLock,
      faEye,
      faEyeSlash,
      faChevronRight,
      faBell,
      faKeyboard,
      faPlus,
      faTimes,
      faEnvelope
    );
    this.createForm();
  }

  createForm() {
    this.registroForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      pistaPassword: ['', Validators.required]
    });
  }
  

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.RotacionInformacion();
    }
  }

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.access) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.access);
            localStorage.setItem('refreshToken', response.refresh);
          }
  
          this.toastr.success('Inicio de sesión exitoso', 'Éxito', {
            positionClass: 'toast-top-right',
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
  
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000);
        } else {
          this.toastr.error('Credenciales incorrectas', 'Error', {
            positionClass: 'toast-top-right',
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
        }
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.toastr.error('Error al realizar el login', 'Error', {
          positionClass: 'toast-top-right',
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      },
    });
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      this.toastr.error('Por favor, complete todos los campos requeridos', 'Error');
      return;
    }
  
    const formValues = this.registroForm.value;
    const nuevoUsuario = {
      username: formValues.username,
      nombres: formValues.nombres,
      apellido_paterno: formValues.apellidoPaterno,
      apellido_materno: formValues.apellidoMaterno,
      correo: formValues.correo,
      password: formValues.password,
      pista_password: formValues.pistaPassword
    };
  
    this.loginService.postData('usuarios/', nuevoUsuario).subscribe({
      next: (response) => {
        this.toastr.success('Usuario creado con éxito', 'Éxito');
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          this.toastr.error('Error al crear el usuario. Verifique los datos ingresados.', 'Error');
        } else {
          this.toastr.error('Ocurrió un error en el servidor', 'Error');
        }
      }
    });
  }

  AlternarVisibilidadPassword() {
    this.showPassword = !this.showPassword;
  }

  AlternarVisibilidadCreacionPassword() {
    this.showConfirmPasswordReg = !this.showConfirmPasswordReg;
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
    }, 3500);
  }

  cambiarFormulario(formulario: 'main' | 'additional') {
    this.activeForm = formulario;
  }
}