import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizMakerComponent} from './quiz-maker.component';
import { QuizService } from '../quiz.service';
import { of } from 'rxjs';
import { QuizComponent } from '../quiz/quiz.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('QuizMakerComponent', () => {
  let component: QuizMakerComponent;
  let fixture: ComponentFixture<QuizMakerComponent>;
  let quizServiceMock: jasmine.SpyObj<QuizService>;

  beforeEach(async () => {
    quizServiceMock = jasmine.createSpyObj<QuizService>('QuizService', ['getAllCategories', 'createQuiz']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        QuizMakerComponent,
        QuizComponent,
      ],
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

  describe('when main category changes', () => {
    beforeEach(() => {
      (component as any).categories = [
        { guid: '5581a4a4-d03c-4c88-a29d-abd07519e7b1', id: 1, name: 'Category #1', sub_category: [
          { guid: '0920357f-52f2-4b44-b2a7-f89a302193f0', id: 2, name: 'Category #1.1' },
          { guid: 'dc9f94df-0ac2-4194-ae1c-8222d228a1ca', id: 2, name: 'Category #1.2' }
        ] },
        { guid: '01698491-0bc6-42e2-a941-fc3204da459a', id: 2, name: 'Category #2' },
      ];

      component.mainCategoryChanged('5581a4a4-d03c-4c88-a29d-abd07519e7b1');
      fixture.detectChanges();
    });

    it('should set selected category', () => {
      expect(component.selectedCategory).toBeTruthy();
    });
    
    it('should reset selected subcategory', () => {
      expect(component.selectedSubCategory).toBeFalsy();
    });
    
    it('should set selected subcategory data list', () => {
      expect(component.subCategoriesDataList).toBeDefined();
      expect(component.subCategoriesDataList.length).toBe(2);
    });
  });
});
