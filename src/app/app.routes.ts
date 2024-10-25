import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WordCardComponent} from "./components/word-card/word-card.component";
import {JogoLetraComponent} from "./components/jogo-letra/jogo-letra.component";
import {JogoPalavrasComponent} from "./components/jogo-palavras/jogo-palavras.component";
import {CacaPalavrasComponent} from "./components/caca-palavras/caca-palavras.component";
import {SoletrandoComponent} from "./components/soletrando/soletrando.component";

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'caca', component: WordCardComponent },
      { path: 'soletrando', component: SoletrandoComponent },
      { path: 'jogo-palavras', component: JogoPalavrasComponent },
      { path: 'jogo-letras', component: JogoLetraComponent },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para 'home' se estiver vazio

];
