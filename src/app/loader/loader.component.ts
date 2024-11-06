import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  standalone: true,
    imports: [
        MatProgressSpinner,
        NgIf
    ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
