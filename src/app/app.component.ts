import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * Entry Point for the code
 * Routing is called in app.component.html
 */
export class AppComponent {
  title = 'movie-client-angular';

  constructor(){}

}
