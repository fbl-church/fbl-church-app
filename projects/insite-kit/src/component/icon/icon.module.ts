import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faBackwardStep,
  faBars,
  faBell,
  faCaretDown,
  faCaretLeft,
  faChartSimple,
  faChildren,
  faCircleExclamation,
  faCircleInfo,
  faCirclePlus,
  faClose,
  faForwardStep,
  faHome,
  faLeftLong,
  faLock,
  faPenToSquare,
  faPerson,
  faRightFromBracket,
  faSchool,
  faSearch,
  faSeedling,
  faTriangleExclamation,
  faUser,
  faUserPen,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { BaseInsiteModule } from '../../base-insite.module';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [BaseInsiteModule],
  exports: [IconComponent],
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCirclePlus,
      faTriangleExclamation,
      faCircleExclamation,
      faCircleInfo,
      faBackwardStep,
      faForwardStep,
      faSearch,
      faLeftLong,
      faBars,
      faRightFromBracket,
      faUser,
      faClose,
      faBell,
      faCaretLeft,
      faCaretDown,
      faUserPen,
      faPenToSquare,
      faLock,
      faHome,
      faSeedling,
      faUsers,
      faSchool,
      faChildren,
      faPerson,
      faChartSimple,
      faUserPlus
    );
  }
}
