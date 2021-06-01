import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Primeros pasos en angular';
  description: string = 'Esta es una prueba, para comprobar la funcionalidad de Angular';
  name: string = 'Mario Arce'
}
