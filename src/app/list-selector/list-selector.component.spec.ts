import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSelectorComponent } from './list-selector.component';

describe('CategorySelectorComponent', () => {
  let component: ListSelectorComponent;
  let fixture: ComponentFixture<ListSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSelectorComponent]
    });
    fixture = TestBed.createComponent(ListSelectorComponent);
    component = fixture.componentInstance;
    
    component.items = [
      { "label": "Banana-nana", "guid": "e1075489-0b9c-44f6-aa2e-6f3c90b05343" },
      { "label": "Jollybean", "guid": "2b8ecdb2-120c-4841-83ac-d42dbfb78344" },
      { "label": "Merryberry", "guid": "b1b9377b-e209-42d2-9b1c-1526d5c5422a" },
      { "label": "Yuckalemon", "guid": "e6d77bb1-3802-49c3-b6db-6e712b6c02a8" },
      { "label": "Teeheeapple", "guid": "c4c0c8e2-08e3-43d2-b9e0-3f9cc07de17a" },    
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when filtering by text', () => {
    describe('and no text is written', () => {
      beforeEach(() => {
        component.selectedName = '';
        component.filter(true);

        fixture.detectChanges();
      });

      it('should have a data view model the same size as the original', () => {
        expect(component.filteredDataViewModel.length).toBe((component.items ?? []).length);
      });
    });

    describe('and some text is written', () => {
      beforeEach(() => {
        component.selectedName = 'bE';
        component.filter(true);

        fixture.detectChanges();
      });

      it('should have a data view model with filtered fruits', () => {
        expect(component.filteredDataViewModel.length).toBe(2);
        expect(component.filteredDataViewModel[0].label).toEqual('Jolly<b>be</b>an');
        expect(component.filteredDataViewModel[1].label).toEqual('Merry<b>be</b>rry');
      });
    });
  });
});
