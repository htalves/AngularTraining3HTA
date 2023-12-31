import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersComponent } from './answers.component';

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswersComponent],
    });
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;

    component.data = {
      questions: [],
      answers: [],
      score: 0,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
