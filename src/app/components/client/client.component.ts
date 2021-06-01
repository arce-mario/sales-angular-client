import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
  public clients: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.get().pipe(
      tap(clients => this.clients = clients)
    ).subscribe();
  }

  delete(client: Client): void{
    Swal.fire({
      title: 'Alerta!',
      text: `¿Realmente, desea eliminar al cliente  ${client.firstname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.clientService.delete(client.id).subscribe(
          response =>{
            this.clients = this.clients.filter(c => c !== client);
            console.log(response);
            Swal.fire(
              'Cliente eliminado correctamente',
              `El registro de ${client.firstname} ha sido eliminado correctamente`,
              'success'
            )
          }
        )
      }
    })
  }
}
