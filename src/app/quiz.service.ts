import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, Observable} from 'rxjs';
import {Category, Difficulty, ApiQuestion, Question, Results} from './data.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = "https://opentdb.com";
  private latestResults!: Results;

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<{ trivia_categories: Category[] }>(this.API_URL + "/api_category.php").pipe(
      map(res => this.transformCategories(res.trivia_categories)),
    );
  }

  createQuiz(categoryId: string, difficulty: Difficulty): Observable<Question[]> {
    return this.getQuizQuestions(5, categoryId, difficulty);
  }

  getIsolatedQuestion(categoryId: string, difficulty: Difficulty): Observable<Question> {
    return this.getQuizQuestions(1, categoryId, difficulty)
      .pipe(
        filter(questions => questions.length > 0),
        map(questions => questions[0]),
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  getLatestResults(): Results {
    return this.latestResults;
  }

  private getQuizQuestions(numberOfQuestions: number, categoryId: string, difficulty: Difficulty): Observable<Question[]> {
    return this.http.get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      .pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  private transformCategories(originalCategories: Category[]): Category[] {
    const categories: Category[] = [];

    originalCategories.forEach(parentCategory => {
      const categorySplitResult = parentCategory.name?.split(': ');
      const hasSubCategories = categorySplitResult.length >= 2;
      
      if (hasSubCategories) {
        const mainCategoryName = categorySplitResult[0];
        const categoryProcessed: Category = { ...parentCategory, name: categorySplitResult[1], guid: crypto.randomUUID() };
        const existingCategoryIndex = categories.findIndex(c => c.name === mainCategoryName);
        
        if (existingCategoryIndex >= 0)
        {
          categories[existingCategoryIndex].sub_category.push(categoryProcessed);
        } else {
          categories.push({ guid: crypto.randomUUID(), name: mainCategoryName, id: null, sub_category: [categoryProcessed] });
        }
      } else {
        categories.push({ ...parentCategory, sub_category: [], guid: crypto.randomUUID() });
      }
    })

    return categories;
  }
}
