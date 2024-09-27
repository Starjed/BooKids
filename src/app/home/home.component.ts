import { Component } from '@angular/core';
import {SidenavComponent} from "../sidenav/sidenav.component";
import {WordCardComponent} from "../word-card/word-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    WordCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
