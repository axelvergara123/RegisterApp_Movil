import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AlertController, ToastController } from '@ionic/angular'; // Para mostrar alertas o notificaciones
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-alumno-ver-perfil',
  templateUrl: './alumno-ver-perfil.page.html',
  styleUrls: ['./alumno-ver-perfil.page.scss'],
})
export class AlumnoVerPerfilPage implements OnInit {
  
  alumnoNombre: string ='';
  alumnoEmail: string ='';
  alumnoSeccion: string ='';
  alumnoCarrera: string ='';
  alumnoSemestre: string ='';

  actividadesRecientes: Array<{ fecha: string, descripcion: string }> = [
    { fecha: '2023-09-15', descripcion: 'Asistencia a Matemáticas' },
    { fecha: '2023-09-14', descripcion: 'Asistencia a Física' }
  ];

  constructor(
    private router: Router,
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private translate: TranslateService
  ){}


  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil(){
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    this.alumnoNombre = usuario.nombre || 'Nombre no disponible';
    this.alumnoEmail = usuario.email || 'Correo no disponible';
    this.alumnoSeccion = usuario.seccion || 'Sección no disponible';
    this.alumnoCarrera = usuario.carrera || 'Carrera no disponible';
    this.alumnoSemestre = usuario.semestre || 'Semestre no disponible';
  }

  async editarPerfil(){
    const alert = await this.alertCtrl.create({
      header: 'Editar Perfil',
      inputs: [
        { name: 'nombre', type: 'text', value: this.alumnoNombre, placeholder: 'Nombre' },
        { name: 'email', type: 'email', value: this.alumnoEmail, placeholder: 'Correo' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.alumnoNombre = data.nombre;
            this.alumnoEmail = data.email;

            // Actualizar los datos en localStorage
            const usuarioActualizado = {
              nombre: this.alumnoNombre,
              email: this.alumnoEmail,
              seccion: this.alumnoSeccion,
              carrera: this.alumnoCarrera,
              semestre: this.alumnoSemestre
            };
            localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
            this.mostrarToast('Perfil actualizado');
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
    this.mostrarToast('Sesión cerrada correctamente');  
  }

  changeSpanish(){
    this.translate.use('es')
  }

  changeEnglish(){
    this.translate.use('en')
  }

}
