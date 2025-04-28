import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicePullAgroService } from '../service-pull-agro.service';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface item {
  id: string;
  folio: string;
  fecha: string;
  pool: string;
  estado: string;
  especie: { nombre: string };
  variedadRot: { nombre: string };
  categoria: { nombre: string };
  categoriaRot: { nombre: string };
  tamano: { nombre: string };
  contenedor: { nombre: string };
  bultos: number;
  kilosNetos: number;
  esPool: boolean;
  completo: boolean | null;
}

const ELEMENT_DATA: any = [];

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit {
  displayedColumns: string[] = [
    'folio',
    'pool',
    'fecha',
    'estado',
    'especie',
    'variedad',
    'categoria',
    'tamano',
    'contenedor',
    'bultos',
    'kilos',
  ];

  loading = false;

  // Filtros
  filtroEstado: string = '';
  kilosNetos: string = '';
  filtroEspecie: any;
  filtroVariedad: any;
  filtroCategoria: any;
  filtroTamano: any;
  filtroEspool: any;
  frmFilter: FormGroup;
  variedadFilter: any;
  especieFilter: any;
  categoriaFilter: any;
  tamanoFilter: any;
  esPoolFilter: any;
  categoríaFilter: any;
  data = {
    filter: 0,
  };
  dataSource = new MatTableDataSource<item>(ELEMENT_DATA);
  public mensaje: string = 'No hay información para mostrar por el momento.';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private services: ServicePullAgroService,
    public formBuilder: FormBuilder
  ) {
    this.especies();
    this.variedad();
    this.caregoria();
    this.tamano();
    this.espool();
    this.frmFilter = this.validaFormularioUsuario();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ClearFilter() {
    this.frmFilter.reset();
    this.getGeneralData(this.data);
  }

  fetchData() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
  espool() {
    this.filtroEspool = [
      { id: true, nombre: 'Si' },
      { id: false, nombre: 'No' },
    ];
  }

  tamano() {
    this.filtroTamano = [
      {
        id: '3',
        nombre: 'CHICO',
      },
      {
        id: '4',
        nombre: 'T/CALIBR',
      },
    ];
  }
  caregoria() {
    this.filtroCategoria = [
      {
        id: '2',
        nombre: 'EX FANCY P  ',
      },
      {
        id: '3',
        nombre: 'EX FANCY R  ',
      },
      {
        id: '32',
        nombre: 'EX FANCY    ',
      },
      {
        id: '33',
        nombre: 'EXFCY-C     ',
      },
    ];
  }
  variedad() {
    this.filtroVariedad = [
      {
        id: '700',
        nombre: 'VARIAS',
      },
      {
        id: '701',
        nombre: 'HAYWARD',
      },
      {
        id: '706',
        nombre: 'SUMMER 3373 ',
      },
      {
        id: '707',
        nombre: 'SWEETKIWI   ',
      },
      {
        id: '708',
        nombre: 'SORELI',
      },
    ];
  }
  especies() {
    this.filtroEspecie = [
      {
        id: '2',
        nombre: 'PERAS',
      },
      {
        id: '3',
        nombre: 'UVAS',
      },
      {
        id: '4',
        nombre: 'CIRUELAS',
      },
      {
        id: '5',
        nombre: 'DURAZNOS',
      },
      {
        id: '6',
        nombre: 'NECTARINES',
      },
      {
        id: '7',
        nombre: 'KIWIS',
      },
      {
        id: '8',
        nombre: 'CEREZAS',
      },
      {
        id: '9',
        nombre: 'DAMASCOS',
      },
      {
        id: '15',
        nombre: 'PLUMCOT',
      },
    ];
  }
  validaFormularioUsuario() {
    return this.formBuilder.group({
      especieFilter: [''],
      categoriaFilter: [''],
      tamanoFilter: [''],
      esPoolFilter: [''],
      variedadFilter: [''],
    });
  }

  applyFilter(frmFilter: FormGroup) {
    this.getGeneralData(frmFilter);
  }

  ngOnInit() {
    this.getGeneralData(this.data);
  }

  getEstado(completo: boolean | null): string {
    return completo === null
      ? 'Pendiente'
      : completo
      ? 'Completo'
      : 'Incompleto';
  }

  getGeneralData(data: any) {
    this.fetchData();
    this.services.getGeneralData(data).subscribe((data: any) => {
      this.dataSource.data = data.items;

      if (this.dataSource.data.length > 0) {
        this.mensaje = '';
      } else {
        this.mensaje = 'No aun datos para el filtro seleccionado';
        this.loading = true;
        console.log('no hay datos', this.dataSource.data);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        this.loading = false;
      }
    });
  }
}
