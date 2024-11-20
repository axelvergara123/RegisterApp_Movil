import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Event {
  title: string;
  date: Date;
  type: 'class' | 'meeting' | 'deadline';
}

@Component({
  selector: 'app-profesor-inicio',
  templateUrl: './profesor-inicio.page.html',
  styleUrls: ['./profesor-inicio.page.scss'],
})
export class ProfesorInicioPage implements OnInit {
  usuario = JSON.parse(localStorage.getItem('usuario') ?? '{}');
  profesorNombre: string = this.usuario.nombre;
  fechaActual: Date = new Date();

  secciones: { [key: string]: string[] } = {
    '001D': ['matematica', 'ingles', 'programacion'],
    '002E': ['contabilidad', 'herramientas tecnologicas'],
    '003F': ['matematica', 'herramientas tecnologicas']
  };

  // New events array
  proximosEventos: Event[] = [
    {
      title: 'Clase de Matemáticas - 001D',
      date: new Date(2024, 2, 15, 10, 0),
      type: 'class'
    },
    {
      title: 'Reunión de Coordinación',
      date: new Date(2024, 2, 16, 14, 30),
      type: 'meeting'
    },
    {
      title: 'Entrega de Calificaciones',
      date: new Date(2024, 2, 20),
      type: 'deadline'
    }
  ];

  asignaturasVisibles: { [key: string]: boolean } = {};
  asignaturaSeleccionada: string | null = null;
  asignaturasSeleccionadas: { [key: string]: { [asignatura: string]: boolean } } = {};
  checkboxBloqueado: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    // Sort events by date
    this.proximosEventos.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // Rest of the existing methods remain the same

  generarQR(){}

  // Alternar visibilidad de asignaturas por sección
  toggleAsignaturas(seccion: string) {
    this.asignaturasVisibles[seccion] = !this.asignaturasVisibles[seccion];
  }

   // Verificar si las asignaturas son visibles para una sección
   isAsignaturasVisible(seccion: string): boolean {
    return this.asignaturasVisibles[seccion] || false;
  }

  seleccionarAsignatura(asignatura: string) {
    this.asignaturaSeleccionada = asignatura;
  }

  verPerfil(){
    this.router.navigate(['/profesor-ver-perfil']);
  }

  verHistorial(){
    this.router.navigate(['/profesor-ver-historial']);
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
  }
  changeEnglish(){
    this.translate.use('en');
  }
  changeSpanish(){
    this.translate.use('es');
  }



  toggleCheckbox(seccion: string, asignatura: string) {
    if (!this.asignaturasSeleccionadas[seccion]) {
      this.asignaturasSeleccionadas[seccion] = {};
    }
  
    const estaSeleccionada = this.asignaturasSeleccionadas[seccion][asignatura];
  
    // Si selecciona un checkbox, bloquear los demás
    if (!estaSeleccionada && !this.checkboxBloqueado) {
      this.asignaturasSeleccionadas[seccion][asignatura] = true;
      this.checkboxBloqueado = true;
    } 
    // Si deselecciona el checkbox, desbloquear los demás
    else if (estaSeleccionada) {
      this.asignaturasSeleccionadas[seccion][asignatura] = false;
      this.checkboxBloqueado = false;
    }
  }

}
