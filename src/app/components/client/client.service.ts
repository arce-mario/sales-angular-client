import { Injectable } from '@angular/core';
import { Client } from './client';
import { formatDate, registerLocaleData} from '@angular/common';
import localeES  from '@angular/common/locales/es-NI';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  baseURL: string = 'http://localhost:8080/api/clients';
  private httpHeader: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient, private router: Router) { }

  get(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL).pipe(
      map(observer =>{
        let clients = observer as Client[];
        return clients.map(
          client =>{
            registerLocaleData(localeES,'es');
            client.createAt = formatDate(client.createAt, 'EEEE d, MMMM YYYY','es-ES');
            client.updateAt = formatDate(client.updateAt, 'EEEE d, MMMM YYYY','es-ES');
            return client;
          }
        );
      })
    );
  }

  create(client: Client): Observable<any>{
    return this.http.post<any>(this.baseURL,client,{headers:this.httpHeader}).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {

        if(e.status == 400){
          return throwError(e);
        }

        console.log(e.error.message);
        Swal.fire('Error al crear el registro', e.error.message,'error');
        return throwError(e);
      })
    );
  }

  put(client: Client): Observable<any>{
    return this.http.put<any>(`${this.baseURL}/${client.id}`,client,{headers:this.httpHeader}).pipe(
      map((response: any) => response.client as Client),
      catchError(e => {

        if(e.status == 400){
          return throwError(e);
        }

        console.log(e.error.message);
        Swal.fire('Error al actualizar el registro', e.error.message,'error');
        return throwError(e);
      })
    );
  }

  getByID(id:number): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clients']);
        console.log(e.error.message);
        Swal.fire('Error al actualizar el registro', e.error.message,'error');
        return throwError(e);
      })
    );
  }

  delete(id:number): Observable<Client> {
    return this.http.delete<Client>(`${this.baseURL}/${id}`,{headers:this.httpHeader}).pipe(
      catchError(e => {
        console.log(e.error.message);
        Swal.fire('Error al eliminar el registro', e.error.message,'error');
        return throwError(e);
      })
    );
  }
}
