import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatDivider} from "@angular/material/divider";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule, NgIf} from "@angular/common";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatMenuTrigger,
    MatToolbar,
    MatListItem,
    MatSidenavContent,
    MatDivider,
    MatSidenav,
    MatNavList,
    MatSidenavContainer,
    RouterOutlet,
    RouterLink,
    MatButton,
    NgIf,

  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  conteudo: string | null = null;

  constructor(private router: Router, private stateService: StateService) {
  }

  ngOnInit(){
    this.stateService.currentConteudo$.subscribe( it => {
      this.conteudo = it
    });
    this.resetContentNavigation()
  }

  resetContentNavigation() {
    this.stateService.setConteudo(null)
    this.router.navigate(['/home'])
  }

  setContentAndNavigate(conteudo: string | null) {
    this.stateService.setConteudo(conteudo); // Define o conteúdo no serviço
    this.conteudo = conteudo
    this.router.navigate(['/home', conteudo ? conteudo : '']); // Navega para a rota correspondente
  }
}
