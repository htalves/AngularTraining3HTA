import {Component, inject, Input} from '@angular/core';
import {Category, Difficulty, Question} from '../data.models';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  private _questions: Question[] | null = null;
  @Input()
  set questions(value: Question[] | null) {
    this._questions = value || [];
    this.canSwapQuestions = true;
  }
  get questions() {
    return this._questions;
  }

  @Input()
  category: Category | null = null;

  @Input()
  difficulty: string = '';

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  public canSwapQuestions = true;

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }

  wasSwapped(questionIndex: number) {
    if (!this.category?.id || !this.difficulty) {
      return;
    }

    this.quizService.getIsolatedQuestion(this.category.id.toString(), this.difficulty as Difficulty)
    .subscribe(newQuestion => {
      this.canSwapQuestions = false;
      this.questions![questionIndex] = newQuestion;
      delete this.userAnswers[questionIndex];
    });
  }
}
