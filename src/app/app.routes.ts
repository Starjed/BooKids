import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {JogoPalavrasComponent} from "./components/jogo-palavras/jogo-palavras.component";
import {CacaPalavrasComponent} from "./components/caca-palavras/caca-palavras.component";
import {SoletrandoComponent} from "./components/soletrando/soletrando.component";
import {AnagramaComponent} from "./components/anagramas/anagrama.component";

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'caca-palavras', component: CacaPalavrasComponent },
      { path: 'soletrando', component: SoletrandoComponent },
      { path: 'jogo-palavras', component: JogoPalavrasComponent },
      { path: 'jogo-letras', component: AnagramaComponent },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para 'home' se estiver vazio

];
