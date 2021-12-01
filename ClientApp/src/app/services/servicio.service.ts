import { Injectable, Inject } from '@angular/core';
import { Servicio } from '../models/servicio';
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
export class ServicioService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}

  post(cotizacion: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.baseUrl + 'api/servicio', cotizacion)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Servicio>('Registrar Servicio', null))
    );
  }


  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.baseUrl + 'api/servicio').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Servicio[]>('getAll', []))
    );
  }
 
  get(id: string): Observable<Servicio> {
    const url = `${this.baseUrl + 'api/servicio'}/${id}`;
    return this.http.get<Servicio>(url).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Servicio>('Servicio Service', null))
    );
  }
  update(servicio: Servicio): Observable<any> {
    const url = `${this.baseUrl + 'api/servicio'}/${servicio.tipoServicio}`;
    return this.http.put(url, servicio, httpOptions).pipe(
      tap(_ => this.log(`ESTADO CAMBIADO con id=${servicio.tipoServicio}`)),
      catchError(this.handleError<any>('cotizacion'))
    );
  }


  delete(servicio: Servicio | string): Observable<Servicio> {
    const id = typeof servicio === 'string' ? servicio : servicio.tipoServicio;
    const url = `${this.baseUrl + 'api/servicio'}/${id}`;

    return this.http.delete<Servicio>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el servicio con id=${id}`)),
      catchError(this.handleError<Servicio>('deleteServicio'))
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
