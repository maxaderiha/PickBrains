import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectModel } from '../../interfaces/select-model';
@Component({
  selector: 'select-component',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
})
export class SelectComponent {
  @Input() model: SelectModel;
  @Output() modelChange = new EventEmitter<SelectModel>();

  curValue: string = 'asdas';

  onModelChange() {
    this.modelChange.emit(this.model);
  }
}
