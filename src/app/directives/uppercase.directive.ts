import {
  Directive,
  HostListener,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective implements OnInit {
  private control = inject(NgControl);

  ngOnInit(): void {
    this.transformToUppercase();
  }

  @HostListener('blur') onBlur() {
    this.transformToUppercase();
  }

  @HostListener('input') onInput() {
    this.transformToUppercase();
  }

  private transformToUppercase(): void {
    const value = this.control.value;
    this.control.control?.setValue(value.toUpperCase());
  }
}
