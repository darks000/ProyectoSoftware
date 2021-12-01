import { Injectable, Inject } from '@angular/core';
import { Vehiculo } from '../models/vehiculo';
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
export class VehiculoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}

  post(vehiculo: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.baseUrl + 'api/vehiculo', vehiculo)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Vehiculo>('Registrar Vehiculo', null))
    );
  }

  getAll(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.baseUrl + 'api/vehiculo').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Vehiculo[]>('getAll', []))
    );
  }
 
  get(id: string): Observable<Vehiculo> {
    const url = `${this.baseUrl + 'api/vehiculo'}/${id}`;
    return this.http.get<Vehiculo>(url).pipe(
      tap(_ => this.handleErrorService.log('datos enviados')),
      catchError(this.handleErrorService.handleError<Vehiculo>('Vehiculo Service', null))
    );
  }
  update(vehiculo: Vehiculo): Observable<any> {
    const url = `${this.baseUrl + 'api/vehiculo'}/${vehiculo.placa}`;
    return this.http.put(url, vehiculo, httpOptions).pipe(
      tap(_ => this.log(`ESTADO CAMBIADO con id=${vehiculo.placa}`)),
      catchError(this.handleError<any>('cotizacion'))
    );
  }


  delete(vehiculo: Vehiculo | string): Observable<Vehiculo> {
    const id = typeof vehiculo === 'string' ? vehiculo : vehiculo.placa;
    const url = `${this.baseUrl + 'api/vehiculo'}/${id}`;

    return this.http.delete<Vehiculo>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el vehiculo con id=${id}`)),
      catchError(this.handleError<Vehiculo>('deleteVehiculo'))
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
