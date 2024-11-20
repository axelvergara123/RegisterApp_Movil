import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Event {
  title: string;
  date: Date;
  type: 'class' | 'exam' | 'activity';
}

@Component({
  selector: 'app-alumno-inicio',
  templateUrl: './alumno-inicio.page.html',
  styleUrls: ['./alumno-inicio.page.scss'],
})
export class AlumnoInicioPage implements OnInit {
  usuario = JSON.parse(localStorage.getItem('usuario') ?? '{}');
  alumnoNombre: string = this.usuario.nombre;
  fechaActual: Date = new Date();

  // New events array
  proximosEventos: Event[] = [
    {
      title: 'Examen de Matemáticas',
      date: new Date(2024, 2, 15, 10, 0),
      type: 'exam'
    },
    {
      title: 'Taller de Programación',
      date: new Date(2024, 2, 16, 14, 30),
      type: 'activity'
    },
    {
      title: 'Clase de Inglés',
      date: new Date(2024, 2, 20),
      type: 'class'
    }
  ];

  constructor(
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.proximosEventos.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // Existing methods remain the same

  escanearQR(){}

  verHistorial(){
    this.router.navigate(['alumno-historial-asistencia']);
  }

  verPerfil(){
    this.router.navigate(['alumno-ver-perfil']);
  }

  cerrarSesion(){
    this.router.navigate(['login']);
  }

  changeSpanish(){
    this.translate.use('es')
  }

  changeEnglish(){
    this.translate.use('en')
  }
}
