import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profesor-ver-perfil',
  templateUrl: './profesor-ver-perfil.page.html',
  styleUrls: ['./profesor-ver-perfil.page.scss'],
})
export class ProfesorVerPerfilPage implements OnInit {

  profesorNombre: string = '';
  profesorEmail: string = '';
  profesorArea: string = '';
  profesorSemestre: string = '';

  actividadesRecientes: Array<{ fecha: string, descripcion: string }> = [
    { fecha: '2023-09-15', descripcion: 'Se realizo clases de matematica' },
    { fecha: '2023-09-14', descripcion: 'Se realizo clases de fisica' }
  ];

  constructor(
    private router: Router, 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil(){
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.profesorNombre = usuario.nombre || 'Nombre no disponible';
    this.profesorEmail = usuario.email || 'Correo no disponible';
    this.profesorArea = usuario.area || 'Area no disponible'
  }

  async editarPerfil(){
    const alert = await this.alertCtrl.create({
      header: 'Editar Perfil',
      inputs: [
        { name: 'nombre', type: 'text', value: this.profesorNombre, placeholder: 'Nombre' },
        { name: 'email', type: 'email', value: this.profesorEmail, placeholder: 'Correo' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.profesorNombre = data.nombre;
            this.profesorEmail = data.email;

            // Actualizar los datos en localStorage
            const usuarioActualizado = {
              nombre: this.profesorNombre,
              email: this.profesorEmail,
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
