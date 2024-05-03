export class QuestionPool {
  id!: string;
  name: string;
  password: string;
  questions: Question[] = [];

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}

export class Question {
  text: string;
  type: number;

  constructor(text: string, type: number) {
    this.text = text;
    this.type = type;
  }
}