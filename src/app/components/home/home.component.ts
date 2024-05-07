import { Component } from '@angular/core';
import { GameService } from '../../services/game/game.service';
import { Router } from '@angular/router';
import { QuestionPool } from '../../models/question.model';
import { QuestionService } from '../../services/question/question.service';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  playerName: string = '';
  playerList: Player[] = [];
  questionPool: QuestionPool[] = [];
  selectedQuestionPool!: QuestionPool;

  constructor(private gameService: GameService, private questionService: QuestionService, private router: Router){
    this.playerList = this.getPlayerList();
    this.questionService.getQuestionPoolCollection().subscribe(data => {
      this.questionPool = data as QuestionPool[];
    });
  }

  addPlayer(): void {
    if(this.playerName != ''){
      this.gameService.addPlayer(new Player(this.playerName, this.generatePlayerColor()));
      this.playerList = this.getPlayerList();
      this.playerName = '';
    }
  }

  removePlayer(player: Player): void {
    this.gameService.removePlayer(player);
    this.playerList = this.getPlayerList();
  }

  getPlayerList(): Player[] {
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

  generatePlayerColor(): string {
    let hue = Math.floor(360 * Math.random());
    return 'hsl('+ hue.toString() +', 100%, 50%)';
  }
}
