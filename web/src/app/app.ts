import { Component, signal } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  imports: [MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web');
}
