import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public title: string = "Crear cliente";
  public client:Client = new Client();
  public backendErrors: string[] = [];

  constructor(private clientService: ClientService, private router: Router, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.loadClient();
  }

  create():void{
    console.log("Click validado");
    console.log(this.client);
    this.clientService.create(this.client).subscribe(
      client => {
        this.router.navigate(['/clients'])
        alert(`Usuario ${client.firstname} creado correctamente.`);
      },
      err => {
        this.backendErrors = err.error.errors as string[];
        console.log(err.status);
        console.error(err.error.errors);
      }
    );
  }

  loadClient():void {
    this.activatedRoute.params.subscribe(
      params =>{
        let id = params['id'];
        if(id){
          this.clientService.getByID(id).subscribe(client => {
            this.client = client
          })
        }
      }
    )
  }

  update():void {
    this.clientService.put(this.client).subscribe(
      client => {
        this.router.navigate(['/clients'])
        alert(`Usuario ${client.firstname} actualizado correctamente.`);
      },
      err => {
        this.backendErrors = err.error.errors as string[];
        console.log(err.status);
        console.error(err.error.errors);
      }
    )
  }
}
