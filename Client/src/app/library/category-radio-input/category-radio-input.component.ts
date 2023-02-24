import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CategoryModel} from "../../models/CategoryModel";

@Component({
  selector: 'app-category-radio-input',
  templateUrl: './category-radio-input.component.html',
  styleUrls: ['./category-radio-input.component.sass'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CategoryRadioInputComponent, multi: true}]

})
export class CategoryRadioInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  category!: CategoryModel;
  @Input()
  name!: string
  formControl!: FormControl;
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  ngOnInit(): void {

    this.formControl = new FormControl<CategoryModel>(this.category)

    this.formControl.valueChanges.subscribe({
      next: value => {
        this.onChange(value)
        this.onTouch(value)
      }
    })

  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
  }

}
