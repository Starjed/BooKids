import { Component } from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-soletrando',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    NgOptimizedImage,
    NgForOf,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './soletrando.component.html',
  styleUrl: './soletrando.component.scss'
})
export class SoletrandoComponent {

  isLoading: boolean = false;

  words = [
    { word: 'BEBE', syllables: ['BE', 'BE'], url: 'https://png.pngtree.com/png-clipart/20190116/ourmid/pngtree-cute-baby-sitting-baby-mother-and-baby-baby-with-open-hands-png-image_396696.jpg' },
    { word: 'CARTA', syllables: ['CAR', 'TA'], url: 'https://i.pinimg.com/originals/e1/b0/f9/e1b0f90c48330ec1f86ff132f2815acc.png' },
    { word: 'CARRO', syllables: ['CAR', 'RO'], url: 'https://w7.pngwing.com/pngs/828/685/png-transparent-volkswagen-brasilia-car-volkswagen-voyage-volkswagen-do-brasil-volkswagen-compact-car-sedan-car.png' }
  ];

  currentWord: { word: string; syllables: string[]; url: string } | null = null;

  distractorSyllables: string[] = ['LI', 'LE', 'BI', 'BE', 'RA', 'RO'];

  correctWord: string[] = [];

  displayedWord: Array<string | null> = [];

  syllables: string[] = [];

  selectedSyllables: string[] = [];

  setWord(word: { word: string; syllables: string[]; url: string }) {
    this.currentWord = word;
  }

  conteudo: string | null = null;

  constructor(private snackBar: MatSnackBar, private router: Router, private stateService: StateService) {
    stateService.currentConteudo$.subscribe(conteudo => this.conteudo = conteudo);
  }

  ngOnInit() {
    this.shuffleWord();
  }

  shuffleWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const randomWordObj = this.words[randomIndex];

    this.correctWord = randomWordObj.word.split(''); // Divide a palavra em caracteres

    this.setWord(randomWordObj)

    const revealedSyllable = randomWordObj.syllables[0]; // Primeira sílaba revelada
    this.displayedWord = revealedSyllable.split(''); // Mostra a primeira sílaba

    for (let i = revealedSyllable.length; i < this.correctWord.length; i++) {
      this.displayedWord[i] = null;
    }

    const remainingSyllables = randomWordObj.syllables.slice(1);

    const distractorCount = 3; // Número de sílabas distratoras a serem adicionadas
    const randomDistractors = this.getRandomDistractors(distractorCount);

    this.syllables = this.shuffleArray([...remainingSyllables, ...randomDistractors]);
  }

  getRandomDistractors(count: number): string[] {
    const randomDistractors = [];
    const availableDistractors = [...this.distractorSyllables];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableDistractors.length);
      randomDistractors.push(availableDistractors.splice(randomIndex, 1)[0]);
    }

    return randomDistractors;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selectSyllable(syllable: string) {
    const nextEmptyIndex = this.displayedWord.indexOf(null);

    if (nextEmptyIndex !== -1 && this.isCorrectSyllable(syllable, nextEmptyIndex)) {
      this.displayedWord[nextEmptyIndex] = syllable[0]; // Pega a primeira letra da sílaba
      this.displayedWord[nextEmptyIndex + 1] = syllable[1]; // Pega a segunda letra da sílaba
      this.selectedSyllables.push(syllable); // Adiciona a sílaba à lista de selecionadas

      if (this.isWordComplete()) {
        this.showSuccessMessage(); // Exibe o toaster quando a palavra for completa
      }
    }
  }

  isCorrectSyllable(syllable: string, index: number): boolean {
    return syllable[0] === this.correctWord[index] && syllable[1] === this.correctWord[index + 1];
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
      this.selectedSyllables = [];
    }, 3000);
  }

  resetContentNavigation() {
    this.router.navigate(['/home'])
    this.stateService.setConteudo(null)
  }

}
