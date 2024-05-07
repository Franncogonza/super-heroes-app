import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  info = {
    pageTitle: 'Welcome',
    username: 'Franco David Gonzalez',
    developWork: 'Frontend | Angular Developer | TypeScript | Ionic | NodeJs',
    github: 'https://github.com/Franncogonza',
  };
}
