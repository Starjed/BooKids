import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-word-card',
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
    NgForOf
  ],
  templateUrl: './word-card.component.html',
  styleUrl: './word-card.component.scss'
})
export class WordCardComponent {

  word: string = 'CACHORRO'; // Palavra a ser adivinhada
  displayedWord: (string | null)[] = []; // Armazena o progresso do jogador (letras adivinhadas)
  syllables: string[] = []; // Lista de sílabas/letras para escolha
  selectedSyllables: string[] = []; // Letras que o jogador já selecionou

  constructor() {
    this.initWordDisplay();
    this.generateSyllables();
  }

  // Inicializa o array de traços com o tamanho da palavra
  initWordDisplay() {
    this.displayedWord = Array(this.word.length).fill(null);
  }

  // Gera letras aleatórias e inclui as da palavra
  generateSyllables() {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.syllables = [...new Set([...this.word.split(''), ...this.getRandomLetters(allLetters)])];
    this.syllables.sort(); // Organiza as letras em ordem alfabética
  }

  // Retorna letras aleatórias
  getRandomLetters(letters: string[], count: number = 10): string[] {
    const randomLetters: string[] = [];
    while (randomLetters.length < count) {
      const letter = letters[Math.floor(Math.random() * letters.length)];
      if (!randomLetters.includes(letter) && !this.word.includes(letter)) {
        randomLetters.push(letter);
      }
    }
    return randomLetters;
  }

  // Método chamado ao selecionar uma sílaba/letra
  selectSyllable(syllable: string) {
    this.selectedSyllables.push(syllable);

    // Revela as letras correspondentes na palavra
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === syllable) {
        this.displayedWord[i] = syllable;
      }
    }
  }
}
