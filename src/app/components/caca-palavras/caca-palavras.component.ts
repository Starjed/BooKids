import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { StateService } from "../../services/state.service";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {LoaderComponent} from "../../loader/loader.component";

@Component({
  selector: 'app-caca-palavras',
  standalone: true,
  templateUrl: './caca-palavras.component.html',
  styleUrl: './caca-palavras.component.scss',
  imports: [
    MatButton,
    MatProgressSpinner,
    NgIf,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatCard,
    NgForOf,
    LoaderComponent,
    NgStyle,
  ]
})
export class CacaPalavrasComponent {

  isLoading: boolean = false;

  words = [
    { word: 'BEBE', syllables: [{ text: 'BE', color: 'yellow' }, { text: 'BE', color: 'orange' }], url: 'assets/bebe.png' },
    { word: 'BOLA', syllables: [{ text: 'BO', color: 'red' }, { text: 'LA', color: 'green' }], url: 'assets/ball.png' },
    { word: 'SOL', syllables: [{ text: 'SOL', color: 'yellow' }], url: 'https://cdn-icons-png.flaticon.com/512/869/869869.png' },
    { word: 'GATO', syllables: [{ text: 'GA', color: 'orange' }, { text: 'TO', color: 'blue' }], url: 'assets/gato.jpg' }
  ];

  currentWord: { word: string; url: string } | null = null;
  options: { word: string; url: string }[] = [];
  conteudo: string | null = null;

  constructor(private snackBar: MatSnackBar, private router: Router, private stateService: StateService) {
    stateService.currentConteudo$.subscribe(conteudo => this.conteudo = conteudo);
  }

  ngOnInit() {
    this.shuffleOptions();
  }

  shuffleOptions() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.currentWord = this.words[randomIndex];

    const distractors = this.words.filter(wordObj => wordObj.word !== this.currentWord?.word);
    const randomDistractors = this.shuffleArray(distractors).slice(0, 2);

    this.options = this.shuffleArray([this.currentWord, ...randomDistractors]);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectWord(wordObj: { word: string }) {
    if (wordObj.word === this.currentWord?.word) {
      this.showSuccessMessage();
    } else {
      this.snackBar.open('Tente novamente!', 'Fechar', { duration: 2000 });
    }
  }

  showSuccessMessage() {
    this.isLoading = true;
    this.snackBar.open('Parabéns! Você acertou a palavra!', 'Fechar', {
      duration: 3000,
    });
    setTimeout(() => {
      this.isLoading = false;
      this.shuffleOptions();
    }, 3000);
  }

  resetContentNavigation() {
    this.router.navigate(['/home']);
    this.stateService.setConteudo(null);
  }
}

