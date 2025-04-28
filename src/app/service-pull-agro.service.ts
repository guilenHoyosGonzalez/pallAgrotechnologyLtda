import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicePullAgroService {
  private url =
    'http://200.113.7.92/data_apiMercInterno/api/ListadoMercadoInterno?frigorifico=%20%2042&temporada=23/24&exportadora=100&zona=40&estado=0&existen=false&pagina=1&filas=20';

  constructor(private clienteHttp: HttpClient) {}

  public getGeneralData<T>(data: any): Observable<T> {
    if (data.filter != 0) {
      let especie = data.value.especieFilter;
      let categoria = data.value.categoriaFilter;
      let tamano = data.value.tamanoFilter;
      let esPool = data.value.esPoolFilter;
      let variedad = data.value.variedadFilter;
      this.url =
        this.url +
        `&especie=` +
        especie +
        `&variedadRot=` +
        variedad +
        `&categoria=` +
        categoria +
        `&tamano=` +
        tamano +
        `&esPool=` +
        esPool;
    }

    return this.clienteHttp.get<T>(this.url.trim());
  }
}
