import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckBoxModel } from '../../interfaces/check-box';

@Component({
  selector: 'check-box',
  templateUrl: 'check-box.component.html',
  styleUrls: ['check-box.component.scss'],
})

export class CheckBoxComponent {
  @Input() info: CheckBoxModel;
  @Output() infoChange = new EventEmitter<CheckBoxModel>();

  onModelChange() {
    this.infoChange.emit(this.info);
  }
}
