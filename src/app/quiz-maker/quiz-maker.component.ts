import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, Difficulty, Question} from '../data.models';
import {Observable, Subject, takeUntil} from 'rxjs';
import {QuizService} from '../quiz.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizForm } from '../models/quiz-form.model';
import { DataItem } from '../models/data-item.model';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit, OnDestroy {

  questions$!: Observable<Question[]>;

  private categories: Category[] = [];
  private subCategories: Category[] = [];

  public categoriesDataList: DataItem[] = [];
  public subCategoriesDataList: DataItem[] = [];
  public formGroup: FormGroup<QuizForm>;

  public selectedCategory: Category | null = null;
  public selectedSubCategory: Category | null = null;
  
  private unsubscribe = new Subject<void>();
  constructor(
    protected quizService: QuizService,
    protected readonly formBuild: FormBuilder,
  ) {
    this.formGroup = this.formBuild.group<QuizForm>(
      {
        category: new FormControl<string | null>('', [Validators.required]),
        subCategory: new FormControl<string | null>('', [Validators.required]),
        difficulty: new FormControl<string | null>('', [Validators.required]),
      }
    );
  }

  private subscribeFormHandlers(): void {
    this.formGroup.controls.category.valueChanges
      .subscribe(guid => this.mainCategoryChanged(guid));

    this.formGroup.controls.subCategory.valueChanges
      .subscribe(guid => this.subCategoryChanged(guid));
  }

  private resetSubCategory(): void {
    this.selectedSubCategory = null;
    this.formGroup.controls.subCategory.setValue('');

    if (this.subCategories.length > 0) {
      this.formGroup.controls.subCategory.enable();
    } else {
      this.formGroup.controls.subCategory.disable();
    }
  }

  ngOnInit(): void {
    this.subscribeFormHandlers();

    this.quizService.getAllCategories()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(categories => {
        this.categories = categories;
        this.categoriesDataList = this.categories.map(c => ({ label: c.name, guid: c.guid }));
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  mainCategoryChanged(categoryGuid: string | null): void {
    this.selectedCategory = this.categories.find(c => c.guid === categoryGuid)!;
    this.subCategories = this.selectedCategory?.sub_category || [];
    this.subCategoriesDataList = this.subCategories.map(c => ({ label: c.name, guid: c.guid }));

    this.resetSubCategory();
  }

  subCategoryChanged(categoryGuid: string | null): void {
    this.selectedSubCategory = this.subCategories.find(c => c.guid === categoryGuid)!;
  }

  createQuiz(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const category = this.selectedSubCategory?.id || this.selectedCategory?.id || '';
    const difficulty: Difficulty = this.formGroup.value.difficulty as Difficulty;

    this.questions$ = this.quizService.createQuiz(category.toString(), difficulty);
  }
}
