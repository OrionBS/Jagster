import {Component, inject, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Dayjs} from "dayjs";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.sass'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: DateInputComponent, multi: true}]

})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  formControl: FormControl = new FormControl<string>("");
  formBuilder: FormBuilder = inject(FormBuilder)
  month: string[] = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ]
  today: Dayjs = dayjs()
  formGroup!: FormGroup;
  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  ngOnInit(): void {
    this.initFormGroup()
    this.initFormControl()
    this.formControlObserveFormGroup()
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
    this.today = dayjs(obj);
  }

  formControlObserveFormGroup() {
    this.formGroup.valueChanges.subscribe({
      next: value => this.formControl.setValue(this.formGroupToDate(value))
    })
  }

  initFormControl() {
    this.formControl = this.formBuilder.control(this.formGroupToDate(this.formGroup))
  }

  formGroupToDate(formGroupValues: any) {
    return formGroupValues.year
      + '-' +
      ('0' + (this.month.indexOf(formGroupValues.month) + 1)).slice(-2)
      + '-' +
      formGroupValues.day
  }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      year: [this.today.get('year')],
      month: [this.month[this.today.get('month')]],
      day: [this.today.get('date')]
    })
  }

  updateYearUp() {
    this.today = this.today.add(1, 'year')
    this.updateFormGroup()
  }

  updateYearDown() {
    this.today = this.today.subtract(1, 'year')
    this.updateFormGroup()
  }

  updateMonthUp() {
    this.today = this.today.add(1, 'month')
    this.updateFormGroup()
  }

  updateMonthDown() {
    this.today = this.today.subtract(1, 'month')
    this.updateFormGroup()
  }

  updateFormGroup() {
    this.formGroup.setValue({
      day: this.today.get('date'),
      month: this.month[this.today.get('month')],
      year: this.today.get('year')
    })
  }

  updateDayUp() {
    this.today = this.today.add(1, 'day')
    this.updateFormGroup()
  }

  updateDayDown() {
    this.today = this.today.subtract(1, 'day')
    this.updateFormGroup()
  }

}
