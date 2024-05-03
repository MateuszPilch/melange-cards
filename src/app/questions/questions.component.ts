import { Component } from '@angular/core';
import { QuestionPool } from '../models/question.model';
import { QuestionService } from '../services/question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questionPoolName: string = '';
  questionPoolPassword: string = '';
  questionPool: QuestionPool[] = [];

  constructor(private questionService: QuestionService, private router: Router) {
    this.questionService.getQuestionPoolCollection().subscribe(data => {
      this.questionPool = data;
    });
  }

  addQuestionPool(): void {
    this.questionService.addQuestionPool(this.questionPoolName, this.questionPoolPassword);
    this.questionPoolName = '';
    this.questionPoolPassword = '';
  }
  removeQuestionPool(questsionPool: QuestionPool): void {
    this.questionService.removeQuestionPool(questsionPool);
  }

  questionDetailsSection(id: string): void {
    this.router.navigate(['questions', id])
  }

  homeSection(): void {
    this.router.navigateByUrl('home');
  }
}
