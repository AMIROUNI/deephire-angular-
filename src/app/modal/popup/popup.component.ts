// shared/components/popup/popup.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  standalone:false
})
export class PopupComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() isSuccess: boolean = false;
  @Input() redirectPath: string | null = null;
  @Input() showCancelButton: boolean = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}