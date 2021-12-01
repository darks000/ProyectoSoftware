import { Injectable, Inject } from '@angular/core';
import { Cotizacion } from '../models/cotizacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleErrorService } from './handle-error.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}
  post(cotizacion: Cotizacion): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(this.baseUrl + 'api/cotizacion', cotizacion)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Cotizacion>('Registrar Cotizacion', null))
    );
  }


  getAll(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(this.baseUrl + 'api/cotizacion').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Cotizacion[]>('getAll', []))
    );
  }
 
  get(id: string): Observable<Cotizacion> {
    const url = `${this.baseUrl + 'api/cotizacion'}/${id}`;
    return this.http.get<Cotizacion>(url).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Cotizacion>('Cotizacion Service', null))
    );
  }
  update(cotizacion: Cotizacion): Observable<any> {
    const url = `${this.baseUrl + 'api/cotizacion'}/${cotizacion.codigoCotizacion}`;
    return this.http.put(url, cotizacion, httpOptions).pipe(
      tap(_ => this.log(`ESTADO CAMBIADO con id=${cotizacion.codigoCotizacion}`)),
      catchError(this.handleError<any>('cotizacion'))
    );
  }


  delete(cotizacion: Cotizacion | string): Observable<Cotizacion> {
    const id = typeof cotizacion === 'string' ? cotizacion : cotizacion.codigoCotizacion;
    const url = `${this.baseUrl + 'api/cotizacion'}/${id}`;

    return this.http.delete<Cotizacion>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el cotizacion con id=${id}`)),
      catchError(this.handleError<Cotizacion>('deleteCotizacion'))
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
