import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CurrencyModel} from "../../models/CurrencyModel";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-currency-radio-input',
  templateUrl: './currency-radio-input.component.html',
  styleUrls: ['./currency-radio-input.component.sass'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CurrencyRadioInputComponent, multi: true}]
})
export class CurrencyRadioInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  currency!: CurrencyModel;
  @Input()
  name!: string
  formControl!: FormControl;
  subscription: Subscription = new Subscription();
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  ngOnInit(): void {

    this.formControl = new FormControl<number>(this.currency.id)

    this.subscription.add(
      this.formControl.valueChanges.subscribe({
        next: (value: number) => {
          this.onChange(value)
          this.onTouch(value)
        }
      })
    )

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
