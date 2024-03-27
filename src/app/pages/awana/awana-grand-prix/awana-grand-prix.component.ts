import { Component } from '@angular/core';
import { GrandPrixUser } from 'projects/insite-kit/src/model/user.model';

@Component({
  selector: 'app-awana-grand-prix',
  templateUrl: './awana-grand-prix.component.html',
})
export class AwanaGrandPrixComponent {
  testData: GrandPrixUser = [
    { firstName: 'Samuel', lastName: 'Butler', icon: 'R' },
    { firstName: 'Kelsey', lastName: 'Butler', icon: 'G' },
    { firstName: 'Ashley', lastName: 'Suvak', icon: 'B' },
    { firstName: 'Jillian', lastName: 'Bronish', icon: 'Y' },
  ];
  constructor() {}
}
