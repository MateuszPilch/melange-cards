import { Injectable } from '@angular/core';
import { Question, QuestionPool } from '../../models/question.model';
import { DocumentData, Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, docData, updateDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionCollection!: any;

  constructor(private fs: Firestore) {
    this.questionCollection = collection(this.fs, 'questionPool');
  }

  addQuestion(questionPool: QuestionPool, question: Question): void {
    updateDoc(doc(this.fs, 'questionPool', questionPool.id), {questions: arrayUnion({...question})});
  }

  addQuestionPool(questionPoolName: string, questionPoolPassword: string): void {
    bcrypt.hash(questionPoolPassword, 14, (err,hash) => {
      addDoc(this.questionCollection, {
        'name': questionPoolName, 
        'password': hash,
        'questions': [],
      })
    })

  }

  removeQuestion(questionPool: QuestionPool, question: Question): void {
    updateDoc(doc(this.fs, 'questionPool', questionPool.id), {questions: arrayRemove({...question})});
  }

  removeQuestionPool(questionPool: QuestionPool): void {
    deleteDoc(doc(this.fs, 'questionPool', questionPool.id));
  }

  getQuestionPoolOne(questionPoolId: string): Observable<QuestionPool> | DocumentData | undefined{
    return docData(doc(this.fs, 'questionPool', questionPoolId), {idField: "id"});
  }

  getQuestionPoolCollection(): Observable<QuestionPool[]> {
    return collectionData(this.questionCollection, {idField: "id"});
  }
}