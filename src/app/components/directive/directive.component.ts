import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive',
  templateUrl: './directive.component.html'
})
export class DirectiveComponent implements OnInit {

  public courses: string[] = ['TypeScript', 'Java SE', 'Linux', 'Web design', 'Android', 'Canvas'];
  public departments: any[] = [
    {
      name: 'Mario Arce',
      email: 'marioarce402@gmail.com',
      phone: '+505 57256547'
    },{
      name: 'Pedro Arce',
      email: 'marioarce402@gmail.com',
      phone: '+505 57256547'
    },{
      name: 'Manuel Arce',
      email: 'marioarce402@gmail.com',
      phone: '+505 57256547'
    },{
      name: 'Rodrigo Arce',
      email: 'marioarce402@gmail.com',
      phone: '+505 57256547'
    }
  ];

  public isVisibleCard = false;
  constructor() { }

  ngOnInit(): void {
  }
}
