import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { QuizService } from './quiz.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('QuizService', () => {
  let quizService: QuizService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>('HttpClient', [ 'get' ]);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        QuizService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    }).compileComponents();

    quizService = TestBed.inject(QuizService);
  });

  describe('transforming categories from API', () => {
    it('should return empty list', done => {
      httpClientSpy.get.and.returnValue(of({
          trivia_categories: [],
      }));

      quizService.getAllCategories().subscribe(categories => {
        expect(categories.length).toBe(0);
        done();
      });
    });

    it('should return correctly with only one level category', done => {
      httpClientSpy.get.and.returnValue(of({
          trivia_categories: [
            { "id": 1, "name": "Countries" },
            { "id": 2, "name": "Web Development" },
          ],
      }));

      quizService.getAllCategories().subscribe(categories => {
        expect(categories.length).toBe(2);
        expect(categories.some(c => c.sub_category?.length > 0)).toBe(false);
        done();
      });
    });
    
    it('should return correctly with two level category', done => {
      httpClientSpy.get.and.returnValue(of({
        trivia_categories: [
          { "id": 99, "name": "Supermarket" },
          { "id": 162, "name": "Superman: Alain Chautard" },
          { "id": 23, "name": "Superman: Clark Kent" },
        ],
      }));

      quizService.getAllCategories().subscribe(categories => {
        const categoriesWithSubCategories = categories.filter(c => c.sub_category?.length > 0);
        const allSubCategories = categoriesWithSubCategories.flatMap(c => c.sub_category);

        expect(categories.length).toBe(2);
        expect(categoriesWithSubCategories.length).toBe(1);
        expect(allSubCategories.length).toBe(2);
        expect(allSubCategories.find(c => c.name === 'Alain Chautard')).toBeTruthy();

        done();
      });
    });
  });
});
