import { Injectable, Inject } from '@angular/core';
import { Repuesto } from '../models/repuesto';
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
export class RepuestoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}
  post(repuesto: Repuesto): Observable<Repuesto> {
    return this.http.post<Repuesto>(this.baseUrl + 'api/repuesto', repuesto)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Repuesto>('Registrar Repuesto', null))
    );
  }


  getAll(): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(this.baseUrl + 'api/repuesto').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Repuesto[]>('getAll', []))
    );
  }
 
  get(id: string): Observable<Repuesto> {
    const url = `${this.baseUrl + 'api/repuesto'}/${id}`;
    return this.http.get<Repuesto>(url).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Repuesto>('Repuesto Service', null))
    );
  }
  update(repuesto: Repuesto): Observable<any> {
    const url = `${this.baseUrl + 'api/repuesto'}/${repuesto.codigoRepuesto}`;
    return this.http.put(url, repuesto, httpOptions).pipe(
      tap(_ => this.log(`ESTADO CAMBIADO con id=${repuesto.codigoRepuesto}`)),
      catchError(this.handleError<any>('cotizacion'))
    );
  }


  delete(repuesto: Repuesto | string): Observable<Repuesto> {
    const id = typeof repuesto === 'string' ? repuesto : repuesto.codigoRepuesto;
    const url = `${this.baseUrl + 'api/repuesto'}/${id}`;

    return this.http.delete<Repuesto>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el repuesto con id=${id}`)),
      catchError(this.handleError<Repuesto>('deleteRepuesto'))
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
