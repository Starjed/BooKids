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
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";
import {StateService} from "../../services/state.service";

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
    NgForOf,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './word-card.component.html',
  styleUrl: './word-card.component.scss'
})
export class WordCardComponent {
  isLoading: boolean = false;

  palavras = [
    { palavra: 'BEBE', silabas: ['BE', 'BE'], url: 'https://png.pngtree.com/png-clipart/20190116/ourmid/pngtree-cute-baby-sitting-baby-mother-and-baby-baby-with-open-hands-png-image_396696.jpg' },
    { palavra: 'CARTA', silabas: ['CAR', 'TA'], url: 'https://i.pinimg.com/originals/e1/b0/f9/e1b0f90c48330ec1f86ff132f2815acc.png' },
    { palavra: 'CARRO', silabas: ['CAR', 'RO'], url: 'https://w7.pngwing.com/pngs/828/685/png-transparent-volkswagen-brasilia-car-volkswagen-voyage-volkswagen-do-brasil-volkswagen-compact-car-sedan-car.png' }
  ];

  palavraAtual: { palavra: string; silabas: string[]; url: string } | null = null;

  silabasAvulsas: string[] = ['LI', 'LE', 'BI', 'BE', 'RA', 'RO'];

  palavraCorreta: string[] = [];

  palavraExibida: Array<string | null> = [];

  silabas: string[] = [];

  silabasSelecionadas: string[] = [];



  conteudo: string | null = null;

  constructor(private snackBar: MatSnackBar, private router: Router, private stateService: StateService) {
    stateService.currentConteudo$.subscribe(conteudo => this.conteudo = conteudo);
  }

  ngOnInit() {
    this.randomizarPalavra();
  }

  setPalavra(palavra: { palavra: string; silabas: string[]; url: string }) {
    this.palavraAtual = palavra;
  }

  randomizarPalavra() {
    const randomIndex = Math.floor(Math.random() * this.palavras.length);
    const palavraRandom = this.palavras[randomIndex];

    this.palavraCorreta = palavraRandom.palavra.split(''); // Divide a palavra em caracteres

    this.setPalavra(palavraRandom)

    const revelarSilaba = palavraRandom.silabas[0]; // Primeira sílaba revelada
    this.palavraExibida = revelarSilaba.split(''); // Mostra a primeira sílaba

    for (let i = revelarSilaba.length; i < this.palavraCorreta.length; i++) {
      this.palavraExibida[i] = null;
    }

    const silabasRestantes = palavraRandom.silabas.slice(1);

    const quantidadeSilabasAvulsas = 3; // Número de sílabas distratoras a serem adicionadas
    const randomSilabasAvulsas = this.getRandomDistractors(quantidadeSilabasAvulsas);

    this.silabas = this.randomizarArray([...silabasRestantes, ...randomSilabasAvulsas]);
  }

  getRandomDistractors(count: number): string[] {
    const randomSilabasAvulsas = [];
    const availableDistractors = [...this.silabasAvulsas];

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableDistractors.length);
      randomSilabasAvulsas.push(availableDistractors.splice(randomIndex, 1)[0]);
    }

    return randomSilabasAvulsas;
  }

  randomizarArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  selecionarSilaba(silaba: string) {
    const proximoIndexEmpty = this.palavraExibida.indexOf(null);

    if (proximoIndexEmpty !== -1 && this.ehSilabaCorreta(silaba, proximoIndexEmpty)) {
      this.palavraExibida[proximoIndexEmpty] = silaba[0]; // Pega a primeira letra da sílaba
      this.palavraExibida[proximoIndexEmpty + 1] = silaba[1]; // Pega a segunda letra da sílaba
      this.silabasSelecionadas.push(silaba); // Adiciona a sílaba à lista de selecionadas

      if (this.palavraCompleta()) {
        this.showSuccessMessage(); // Exibe o toaster quando a palavra for completa
      }
    }
  }

  ehSilabaCorreta(silaba: string, index: number): boolean {
    return silaba[0] === this.palavraCorreta[index] && silaba[1] === this.palavraCorreta[index + 1];
  }

  palavraCompleta(): boolean {
    return this.palavraExibida.every(part => part !== null);
  }

  showSuccessMessage() {
    this.isLoading = true;
    this.snackBar.open('Parabéns! Você acertou a palavra!', 'Fechar', {
      duration: 3000,
    });
    setTimeout(() => {
      this.isLoading = false;
      this.randomizarPalavra();
      this.silabasSelecionadas = [];
    }, 3000);
  }

  resetContentNavigation() {
    this.router.navigate(['/home'])
    this.stateService.setConteudo(null)
  }

}
