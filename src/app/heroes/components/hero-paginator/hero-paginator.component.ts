import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'hero-paginator',
  templateUrl: './hero-paginator.component.html',
})
export class HeroPaginatorComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();

  changePage(pageNumber: number): void {
    if (pageNumber) {
      this.pageChanged.emit(pageNumber);
    }
  }
}
