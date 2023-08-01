import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizMakerComponent} from './quiz-maker.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';

describe('QuizMakerComponent', () => {
  let component: QuizMakerComponent;
  let fixture: ComponentFixture<QuizMakerComponent>;
  let quizServiceMock: jasmine.SpyObj<QuizService>;

  beforeEach(async () => {
    quizServiceMock = jasmine.createSpyObj<QuizService>('QuizService', ['getAllCategories', 'createQuiz']);

    await TestBed.configureTestingModule({
      declarations: [QuizMakerComponent],
      providers: [
        { provide: QuizService, useValue: quizServiceMock },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizMakerComponent);
    component = fixture.componentInstance;

    quizServiceMock.getAllCategories.and.returnValue(of([]));
    quizServiceMock.createQuiz.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
