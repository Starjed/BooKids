import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private conteudoSource = new BehaviorSubject<string | null>(null);
  currentConteudo$ = this.conteudoSource.asObservable();

  getConteudo() {
    // return this this.currentConteudo$.
  }

  setConteudo(conteudo: string | null) {
    this.conteudoSource.next(conteudo);
  }
}
