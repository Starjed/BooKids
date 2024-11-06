import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

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
    NgIf
  ],
  styleUrls: ['./anagrama.component.scss']
})
export class AnagramaComponent {
  letters: string[] = ['A', 'M', 'P', 'R', 'O'];
  currentWord: string[] = [];
  possibleWords: { [key: number]: string[] } = {
    2: ['AR', 'PAO'],
    3: ['MAR', 'PAO'],
    4: ['RAMO', 'PARO', 'ROMA', 'AMOR'],
    5: ['POMAR'],
  };
  displayList: { [key: number]: string[] } = {
    2: Array(3).fill('--'),
    3: Array(3).fill('---'),
    4: Array(2).fill('----'),
    5: Array(2).fill('-----'),
    6: Array(1).fill('------'),
  };
  wordsFormed: string[] = [];
  isLoading = false;

  addLetter(letter: string) {
    this.currentWord.push(letter);
  }

  removeLastLetter() {
    this.currentWord.pop();
  }

  checkWord() {
    const word = this.currentWord.join('');
    const wordLength = word.length;

    if (this.possibleWords[wordLength]?.includes(word) && !this.wordsFormed.includes(word)) {
      this.wordsFormed.push(word);

      const wordIndex = this.possibleWords[wordLength].indexOf(word);
      if (wordIndex !== -1) {
        this.displayList[wordLength][wordIndex] = word;
      }
    }

    // Limpar palavra atual após verificar
    this.currentWord = [];
  }
}
