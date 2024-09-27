import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatDivider} from "@angular/material/divider";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";

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

  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
