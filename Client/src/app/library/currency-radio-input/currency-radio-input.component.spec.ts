import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRadioInputComponent } from './currency-radio-input.component';

describe('CurrencyRadioInputComponent', () => {
  let component: CurrencyRadioInputComponent;
  let fixture: ComponentFixture<CurrencyRadioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRadioInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyRadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
