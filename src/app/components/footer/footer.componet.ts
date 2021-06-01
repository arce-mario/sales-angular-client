import { Component } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent{
  public by: any = {
    firstName: 'Mario',
    lastName: 'Arce',
    email: 'mario.arce4526@est.uca.edu.ni'
  };
}
