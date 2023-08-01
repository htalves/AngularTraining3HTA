import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionComponent]
    });
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = {
      question: 'Is this test OK?',
      correct_answer: 'Always',
      incorrect_answers: ['Never', 'Random', 'On Tuesdays'],
      all_answers: ['Always,', 'Never', 'Random', 'On Tuesdays'],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
