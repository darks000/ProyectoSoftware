import { Injectable, Inject } from '@angular/core';
import { Mecanico } from '../models/mecanico';
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
export class MecanicoService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}

  post(mecanico: Mecanico): Observable<Mecanico> {
    return this.http.post<Mecanico>(this.baseUrl + 'api/mecanico', mecanico)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Mecanico>('Registrar Mecanico', null))
    );
  }

  getAll(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(this.baseUrl + 'api/mecanico').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Mecanico[]>('getAll', []))
    );
  }

  
  get(id: string): Observable<Mecanico> {
    const url = `${this.baseUrl + 'api/mecanico'}/${id}`;
    return this.http.get<Mecanico>(url).pipe(
      tap(_ => console.log('Se Consulta la información'))
    );
  }
  

  update(mecanico: Mecanico): Observable<any> {
    const url = `${this.baseUrl + 'api/mecanico'}/${mecanico.identificacion}`;
    return this.http.put(url, mecanico, httpOptions).pipe(
      tap(_ => this.log(`se modificaron los datos del mecanico con id=${mecanico.identificacion}`)),
      catchError(this.handleError<any>('cliente'))
    );
  }


  delete(mecanico: Mecanico | string): Observable<Mecanico> {
    const id = typeof mecanico === 'string' ? mecanico : mecanico.identificacion;
    const url = `${this.baseUrl + 'api/mecanico'}/${id}`;

    return this.http.delete<Mecanico>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el mecanico con id=${id}`)),
      catchError(this.handleError<Mecanico>('deleteMecanico'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {

    alert(message);
  }
}
