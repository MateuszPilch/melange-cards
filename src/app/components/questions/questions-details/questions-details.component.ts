import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionPool, Question } from '../../../models/question.model';
import { QuestionService } from '../../../services/question/question.service';

@Component({
  selector: 'app-questions-details',
  templateUrl: './questions-details.component.html',
  styleUrls: ['./questions-details.component.css']
})
export class QuestionsDetailsComponent {
  questionText: string = '';
  questionType: number = 0;
  questionPool!: QuestionPool;

  constructor(private questionService: QuestionService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.questionService.getQuestionPoolOne(params['id'])?.subscribe((data: QuestionPool) => {
        this.questionPool = data; 
      }) 
    });
  }

  addQuestion(): void {
    this.questionService.addQuestion(this.questionPool, new Question(this.questionText, this.questionType))
    this.questionText = '';
    this.questionType = 0;
  }

  removeQuestion(questionPool: QuestionPool, question: Question): void {
    this.questionService.removeQuestion(questionPool, question);
  }

  removeQuestionPool(questsionPool: QuestionPool): void {
    this.questionService.removeQuestionPool(questsionPool);
    this.router.navigateByUrl('questions')
  }

  questionSection(): void {
    this.router.navigateByUrl('questions')
  }
}
