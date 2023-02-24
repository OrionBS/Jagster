import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input()
  form?: 'classic' | 'secondary' | 'tertiary' | 'link'
  @Input()
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  @Input()
  color?: 'primary' | 'success' | 'warning' | 'error' | 'grayscale'
  @Input()
  length?: 'w-content' | 'w-full'

  @HostBinding('class')
  get defineClass() {
    return this.form + ' ' + this.size + " " + this.color + " " + this.length;
  }

  @Input()
  prefixIcon?: string;
  @Input()
  suffixIcon?: string;
  @Input()
  type?: 'button' | 'submit' | 'reset'
  @Input()
  label?: string;

}
