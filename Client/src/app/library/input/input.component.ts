import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true}]
})
export class InputComponent implements ControlValueAccessor, OnInit {

  @Input()
  id?: string;
  @Input()
  label?: string;
  @Input()
  placeholder?: string;
  @Input()
  hint?: string;

  formControl!: FormControl;

  onChange: any = () => {}
  onTouch: any = () => {}

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState(isDisabled: boolean): void {
/*
    this.formControl.disable()
*/
  }

  writeValue(obj: string): void {
    this.formControl.setValue(obj);
  }

  ngOnInit(): void {

    this.formControl = new FormControl<any>(null)

    this.formControl.valueChanges.subscribe({
      next: value => {
        this.onChange(value)
        this.onTouch(value)
      }
    })

  }

}
