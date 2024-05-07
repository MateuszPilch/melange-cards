import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionPool } from '../../models/question.model';
import { QuestionService } from '../../services/question/question.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  questionPoolName: string = '';
  questionPoolPassword: string = '';
  questionPool: QuestionPool[] = [];

  currentQuestionPool!: QuestionPool;
  currentPassword: string='';
  passwordModal: boolean= false;

  constructor(private questionService: QuestionService, private router: Router) {
    this.questionService.getQuestionPoolCollection().subscribe(data => {
      this.questionPool = data;
    });
  }

  addQuestionPool(): void {
    if(this.questionPoolName != '') {
      this.questionService.addQuestionPool(this.questionPoolName, this.questionPoolPassword);
      this.questionPoolName = '';
      this.questionPoolPassword = '';
    }
  }

  questionDetailsSection(id: string): void {
    this.router.navigate(['questions', id])
  }

  homeSection(): void {
    this.router.navigateByUrl('home');
  }
  
  setPasswordModalEnable(modalStatus: boolean, questionPool?:QuestionPool): void {
    
    if(questionPool) {
      this.currentQuestionPool = questionPool;
    }
    this.passwordModal = modalStatus;
  }

  async checkPassword(): Promise<void> {
    localStorage.removeItem(this.currentQuestionPool.id);

    if(await bcrypt.compare(this.currentPassword, this.currentQuestionPool.password)) {
      this.passwordModal = false;
      localStorage.setItem(this.currentQuestionPool.id, 'true');
      this.questionDetailsSection(this.currentQuestionPool.id);
    } else {
      localStorage.removeItem(this.currentQuestionPool.id);
    }
  }
}
