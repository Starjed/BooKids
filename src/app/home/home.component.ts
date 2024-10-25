import { Component } from '@angular/core';
import {SidenavComponent} from "../components/sidenav/sidenav.component";
import {WordCardComponent} from "../components/word-card/word-card.component";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {StateService} from "../services/state.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidenavComponent,
    WordCardComponent,
    MatButton,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  conteudo: string | null = null;

  clearConteudo() {
    this.stateService.setConteudo(null)
  }

  constructor(private stateService: StateService, private router: Router) {
    this.stateService.currentConteudo$.subscribe(conteudo => {
      this.conteudo = conteudo;
    });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url.split('/')[2];
      this.stateService.setConteudo(currentRoute);
    });
  }

}
