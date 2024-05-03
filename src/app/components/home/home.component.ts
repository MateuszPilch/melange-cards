import { Component } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Router } from '@angular/router';
import { QuestionPool } from '../../models/question.model';
import { QuestionService } from '../../services/question/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  playerName: string = '';
  playerList: string[] = [];
  questionPool: QuestionPool[] = [];
  selectedQuestionPool!: QuestionPool;

  constructor(private gameService: GameService, private questionService: QuestionService, private router: Router){
    this.playerList = this.getPlayerList();
    this.questionService.getQuestionPoolCollection().subscribe(data => {
      this.questionPool = data as QuestionPool[];
    });
  }

  addPlayer(player: string): void {
    this.gameService.addPlayer(player);
    this.playerList = this.getPlayerList();
    this.playerName = '';
  }

  removePlayer(player: string): void {
    this.gameService.removePlayer(player);
    this.playerList = this.getPlayerList();
  }

  getPlayerList(): string[] {
    return this.gameService.getPlayerList();
  }

  startGame(): void {
    if(this.playerList.length >= 2 && this.selectedQuestionPool) {
      this.router.navigate(['game',this.selectedQuestionPool.id])
    }
  }

  questionSection(): void {
    this.router.navigateByUrl('questions')
  }
}
