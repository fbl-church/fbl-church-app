import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'ik-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.scss'],
})
export class PrivacyPolicyModalComponent {
  @ViewChild('privacyModal') modal: ModalComponent;
}
