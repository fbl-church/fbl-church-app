import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'ik-project-modal',
  templateUrl: 'project-modal.component.html',
})
export class ProjectModalComponent {
  @ViewChild('projectModal') modal: ModalComponent;
}
