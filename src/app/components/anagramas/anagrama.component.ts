import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {Router} from "@angular/router";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  standalone: true,
  imports: [
    MatButton,
    MatCardContent,
    NgForOf,
    MatCardActions,
    MatCard,
    NgIf,
    SlicePipe
  ],
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent {
  letters: string[] = ['A', 'M', 'P', 'R', 'O'];
  currentWord: string[] = [];
  possibleWords: string[] = ['AR', 'PAO', 'MAR', 'RAMO', 'PARO', 'ROMA', 'AMOR', 'POMAR'];
  revealedWords: string[] = Array(8).fill('----');

  checkWord(): void {
    const word = this.currentWord.join('');
    const index = this.possibleWords.indexOf(word);
    if (index !== -1) {
      this.revealedWords[index] = word;
    }
    this.currentWord = [];
  }

  isLoading = false;

  addLetter(letter: string) {
    this.currentWord.push(letter);
  }

  removeLastLetter() {
    this.currentWord.pop();
  }

  constructor(private router: Router, private stateService: StateService) {
  }

  resetContentNavigation() {
    this.router.navigate(['/home']);
    this.stateService.setConteudo(null);
  }
}
