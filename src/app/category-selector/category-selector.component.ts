import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Category } from '../data.models';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CategorySelectorComponent,
      multi: true
    }]
})
export class CategorySelectorComponent implements ControlValueAccessor {
  @Input()
  categories: Category[] | null = [];

  public placeholder = 'Select category';
  public onChange: any = () => {};
  public onTouch: any = () => {};
  public selectedName: string = '';
  public filteredCategories: Category[] = [];
  
  public writeValue(categoryId: string): void {
    // Not needed to the exercise, we don't set value adhoc of the form control
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    // Not needed to the exercise, we don't disable this component
  }

  public filter(event: Event, triggerChange: boolean): void {
    const input = event.currentTarget as HTMLInputElement;
    const originalCategories = (this.categories ?? []);
    this.filteredCategories = input.value.length === 0
      ? originalCategories
      : originalCategories.filter(c => c.name.toLocaleLowerCase().includes(input.value.toLocaleLowerCase()));
    
    if (triggerChange) {
      const matchingCategory = originalCategories.find(c => c.name.toLocaleLowerCase() === input.value.toLocaleLowerCase());
      this.onChange(matchingCategory?.guid ?? '');
    }
  }

  public itemSelect(category: Category): void {
    this.selectedName = category.name;
    this.filteredCategories = [];
    this.onChange(category.guid);
  }
}
