import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
})
export class UppercaseDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit() {
    this.transformToUppercase();
  }

  @HostListener('blur') onBlur() {
    this.transformToUppercase();
  }

  @HostListener('input') onInput() {
    this.transformToUppercase();
  }

  private transformToUppercase() {
    const value = this.control.value;
    this.control.control?.setValue(value.toUpperCase());
  }
}
