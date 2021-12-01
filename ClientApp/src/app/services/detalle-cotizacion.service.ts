import { Injectable, Inject } from '@angular/core';
import { DetalleCotizacion } from '../models/detalle-cotizacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DetalleCotizacionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}

  
  post(detalleCotizacion: DetalleCotizacion): Observable<DetalleCotizacion> {
    return this.http.post<DetalleCotizacion>(this.baseUrl + 'api/detalleCotizacion', detalleCotizacion)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<DetalleCotizacion>('Registrar DetalleCotizacion', null))
    );
  }


  getAll(): Observable<DetalleCotizacion[]> {
    return this.http.get<DetalleCotizacion[]>(this.baseUrl + 'api/detalleCotizacion').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<DetalleCotizacion[]>('getAll', []))
    );
  }
 
  get(id: string): Observable<DetalleCotizacion> {
    const url = `${this.baseUrl + 'api/detalleCotizacion'}/${id}`;
    return this.http.get<DetalleCotizacion>(url).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<DetalleCotizacion>('DetalleCotizacion Service', null))
    );
  }
  update(detalleCotizacion: DetalleCotizacion): Observable<any> {
    const url = `${this.baseUrl + 'api/detalleCotizacion'}/${detalleCotizacion.codigoDetalle}`;
    return this.http.put(url, detalleCotizacion, httpOptions).pipe(
      tap(_ => this.log(`se modificaron los datos del detalleCotizacion con id=${detalleCotizacion.codigoDetalle}`)),
      catchError(this.handleError<any>('detalleCotizacion'))
    );
  }


  delete(detalleCotizacion: DetalleCotizacion | string): Observable<DetalleCotizacion> {
    const id = typeof detalleCotizacion === 'string' ? detalleCotizacion : detalleCotizacion.codigoDetalle;
    const url = `${this.baseUrl + 'api/detalleCotizacion'}/${id}`;

    return this.http.delete<DetalleCotizacion>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el detalle con id=${id}`)),
      catchError(this.handleError<DetalleCotizacion>('deleteCotizacion'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {

    alert(message);
  }
}
