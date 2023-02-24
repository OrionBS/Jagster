import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRadioInputComponent } from './category-radio-input.component';

describe('CategoryRadioInputComponent', () => {
  let component: CategoryRadioInputComponent;
  let fixture: ComponentFixture<CategoryRadioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRadioInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryRadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
