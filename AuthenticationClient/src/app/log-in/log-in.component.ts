import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.sass']
})
export class LogInComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup
  formBuilder: FormBuilder = inject(FormBuilder)

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({})
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    window.location.href = 'http://localhost:4200'
  }
}
