import { Component, Input } from '@angular/core';
import { Category } from '../data.models';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type DataItem = { label: string, guid: string };

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
  public filteredData: DataItem[] = [];
  
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
    const filteredCategories = input.value.length === 0
      ? originalCategories
      : originalCategories.filter(c => c.name.toLocaleLowerCase().includes(input.value.toLocaleLowerCase()));
      
    this.filteredData = filteredCategories.map(c => {
      const label = input.value.length === 0
        ? c.name
        : c.name.replace(new RegExp(`${input.value}`, 'gi'), `<b>$&</b>`);
      return { label, guid: c.guid };
    })
    
    if (triggerChange) {
      const matchingCategory = originalCategories.find(c => c.name.toLocaleLowerCase() === input.value.toLocaleLowerCase());
      this.onChange(matchingCategory?.guid ?? '');
    }
  }

  public itemSelect(guid: string): void {
    const category = this.categories!.find(c => c.guid === guid)!;
    this.selectedName = category.name;
    this.filteredData = [];
    this.onChange(category.guid);
  }
}
