import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameComponent } from './components/game/game.component';
import { QuestionsDetailsComponent } from './components/questions/questions-details/questions-details.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path:'game/:id', component: GameComponent},
  { path: 'questions', component: QuestionsComponent },
  { path:'questions/:id', component: QuestionsDetailsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }