import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
  @Input() modalText!: string;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  closeModal(): void {
    this.onClose.emit();
  }

  confirmDelete(): void {
    this.onConfirm.emit();
  }
}
