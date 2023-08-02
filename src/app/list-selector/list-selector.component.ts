import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataItem } from '../models/data-item.model';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListSelectorComponent,
      multi: true
    }]
})
export class ListSelectorComponent implements ControlValueAccessor {
  @Input()
  items: DataItem[] | null = [];

  @Input()
  placeholder: string = '';

  public onChange: any = () => {};
  public onTouch: any = () => {};
  public selectedName: string = '';
  public filteredDataViewModel: DataItem[] = [];
  
  public writeValue(id: string): void {
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

  public filter(triggerChange: boolean): void {
    const originalItems = (this.items ?? []);
    const hasTextOnFilter = this.selectedName.length > 0;

    const filteredItems = !hasTextOnFilter
      ? originalItems
      : originalItems.filter(c => c.label.toLocaleLowerCase().includes(this.selectedName.toLocaleLowerCase()));
      
    this.filteredDataViewModel = filteredItems.map(c => {
      const label = !hasTextOnFilter
        ? c.label
        : c.label.replace(new RegExp(`${this.selectedName}`, 'gi'), `<b>$&</b>`);
      return { label, guid: c.guid };
    })

    if (triggerChange) {
      const matchingItem = originalItems.find(c => c.label.toLocaleLowerCase() === this.selectedName.toLocaleLowerCase());
      this.onChange(matchingItem?.guid ?? '');
    }
  }

  public itemSelect(guid: string): void {
    const item = this.items!.find(c => c.guid === guid)!;
    this.selectedName = item.label;
    this.filteredDataViewModel = [];
    this.onChange(item.guid);
  }
}
