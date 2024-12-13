import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  asignaturas: string[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadAsignaturas();
  }

  async loadAsignaturas() {
    try {
      const storedAsignaturas = await this.storageService.get('qrDataList') as string[];
      if (storedAsignaturas && storedAsignaturas.length > 0) {
        this.asignaturas = storedAsignaturas.map(asignatura => asignatura.trim());
      } else {
        this.asignaturas = [];
      }
    } catch (error) {
      console.error('Error al cargar asignaturas:', error);
    }
  }

  verMas(asignatura: string) {
    console.log('Ver más detalles de:', asignatura);
  }
}
