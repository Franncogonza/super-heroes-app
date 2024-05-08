import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  closeModal(): void {
    this.onClose.emit();
  }

  confirmDelete(): void {
    this.onConfirm.emit();
  }
}
