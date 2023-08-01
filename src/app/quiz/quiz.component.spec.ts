import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { QuizService } from '../quiz.service';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let quizServiceMock: jasmine.SpyObj<QuizService>;

  beforeEach(() => {
    quizServiceMock = jasmine.createSpyObj<QuizService>('QuizService', ['computeScore']);

    TestBed.configureTestingModule({
      declarations: [QuizComponent],
      providers: [
        { provide: QuizService, useValue: quizServiceMock },
      ],
    });
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
