import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsDetailsComponent } from './questions/questions-details/questions-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path:'game/:id', component: GameComponent},
  { path: 'questions', component: QuestionsComponent },
  { path:'questions/:id', component: QuestionsDetailsComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }