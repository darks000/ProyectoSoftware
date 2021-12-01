import { Injectable, Inject } from '@angular/core';
import { Usuario } from '../models/usuario';
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
export class UsuarioService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private handleErrorService: HandleErrorService) {}

  post(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + 'api/usuario', usuario)
        .pipe(
            tap(_ => this.handleErrorService.log('datos enviados')),
            catchError(this.handleErrorService.handleError<Usuario>('Registrar Usuario', null))
    );
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl + 'api/usuario').pipe(
      tap(_ => console.log('Se Consulta la información')),
      catchError(this.handleError<Usuario[]>('getAll', []))
    );
  }

  
  get(id: string): Observable<Usuario> {
    const url = `${this.baseUrl + 'api/usuario'}/${id}`;
    return this.http.get<Usuario>(url).pipe(
      tap(_ => console.log('Se Consulta la información'))
    );
  }
  

  update(usuario: Usuario): Observable<any> {
    const url = `${this.baseUrl + 'api/usuario'}/${usuario.identificacion}`;
    return this.http.put(url, usuario, httpOptions).pipe(
      tap(_ => this.log(`se modificaron los datos del cliente con id=${usuario.identificacion}`)),
      catchError(this.handleError<any>('cliente'))
    );
  }


  delete(usuario: Usuario | string): Observable<Usuario> {
    const id = typeof usuario === 'string' ? usuario : usuario.identificacion;
    const url = `${this.baseUrl + 'api/usuario'}/${id}`;

    return this.http.delete<Usuario>(url, httpOptions).pipe(
      tap(_ => this.log(`se eleminó el usuario con id=${id}`)),
      catchError(this.handleError<Usuario>('deleteUsuario'))
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
