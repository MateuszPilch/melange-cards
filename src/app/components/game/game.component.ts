import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionPool } from '../../models/question.model';
import { GameService } from '../../services/game/game.service';
import { QuestionService } from '../../services/question/question.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  currentPlayerIndex: number = 0;
  playerList: string[] = [];

  currentQuestion!: Question;
  questions: Question[] = [];
  usedQuestions: Question[] = [];

  constructor(private gameService: GameService, private questionService: QuestionService, private router: Router, private route: ActivatedRoute){
    this.playerList = this.getPlayerList();
    this.route.params.subscribe(params => {
      this.questionService.getQuestionPoolOne(params['id'])?.subscribe((data: QuestionPool) => {
        this.questions = data.questions; 
        this.nextQuestion();
      }) 
    });
  }

  getPlayerList(): string[] {
    return this.gameService.getPlayerList();
  }

  nextQuestion(): void {
    if(this.questions.length <= 0) {
      this.questions = this.usedQuestions.slice();
      this.questions.sort(() => Math.random() - 0.5);
    }
    this.currentQuestion = this.questions.pop() as Question;
    this.usedQuestions.push(this.currentQuestion);

    if(this.currentQuestion.type == 0) {
      this.currentPlayerIndex < this.playerList.length - 1 ? this.currentPlayerIndex++: this.currentPlayerIndex = 0;
    }
  }

  homeSection(): void {
    this.router.navigateByUrl('home')
  }
}
