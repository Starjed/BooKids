import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { StateService } from "../../services/state.service";
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {LoaderComponent} from "../../loader/loader.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-soletrando',
  standalone: true,
  templateUrl: './soletrando.component.html',
  styleUrl: './soletrando.component.scss',
  imports: [
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCard,
    LoaderComponent,
    NgForOf,
    NgIf,
  ]
})
export class SoletrandoComponent {

  isLoading: boolean = false;

  words = [
    { word: 'BEBE', url: 'assets/bebe.png' },
    { word: 'BOLA', url: 'assets/ball.png'  }
  ];

  currentWord: { word: string; url: string } | null = null;
  correctWord: string[] = [];
  displayedWord: Array<string | null> = [];
  letters: string[] = [];
  selectedLetters: string[] = [];

  constructor(private snackBar: MatSnackBar, private router: Router, private stateService: StateService) {
    // stateService.currentConteudo$.subscribe(conteudo => this.conteudo = conteudo);
  }

  ngOnInit() {
    this.shuffleWord();
  }

  shuffleWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const randomWordObj = this.words[randomIndex];
    this.correctWord = randomWordObj.word.split('');

    this.setWord(randomWordObj);

    this.displayedWord = [this.correctWord[0], ...Array(this.correctWord.length - 1).fill(null)];

    const distractorLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    this.letters = this.shuffleArray([...new Set([...this.correctWord.slice(1), ...distractorLetters])]);
  }

  setWord(word: { word: string; url: string }) {
    this.currentWord = word;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectLetter(letter: string) {
    const indices = this.correctWord
      .map((char, index) => (char === letter ? index : -1))
      .filter(index => index !== -1);

    indices.forEach(index => {
      if (this.displayedWord[index] === null) {
        this.displayedWord[index] = letter;
      }
    });

    const allOccurrencesFilled = indices.every(index => this.displayedWord[index] === letter);
    if (allOccurrencesFilled) {
      this.selectedLetters.push(letter);
    }

    if (this.isWordComplete()) {
      this.showSuccessMessage();
    }
  }


  isWordComplete(): boolean {
    return this.displayedWord.every(part => part !== null);
  }

  showSuccessMessage() {
    this.isLoading = true;
    this.snackBar.open('Parabéns! Você acertou a palavra!', 'Fechar', {
      duration: 3000,
    });
    setTimeout(() => {
      this.isLoading = false;
      this.shuffleWord();
      this.selectedLetters = [];
    }, 3000);
  }

  resetContentNavigation() {
    this.router.navigate(['/home']);
    this.stateService.setConteudo(null);
  }
}
