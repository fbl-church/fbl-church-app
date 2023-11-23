import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAddressBook,
  faBabyCarriage,
  faBackwardStep,
  faBars,
  faBell,
  faBug,
  faCaretDown,
  faCaretLeft,
  faCaretUp,
  faChartSimple,
  faCheck,
  faChildren,
  faChurch,
  faCircleExclamation,
  faCircleInfo,
  faCirclePlus,
  faClose,
  faDownload,
  faEnvelope,
  faForwardStep,
  faHome,
  faLeftLong,
  faLock,
  faPaperPlane,
  faPenToSquare,
  faPerson,
  faRightFromBracket,
  faRotate,
  faSchool,
  faSearch,
  faSeedling,
  faSpinner,
  faTrashCan,
  faTriangleExclamation,
  faUpload,
  faUser,
  faUserCheck,
  faUserPen,
  faUserPlus,
  faUserXmark,
  faUsers,
  faXmark,
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
      faCaretUp,
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
      faUserPlus,
      faUserCheck,
      faTrashCan,
      faRotate,
      faPaperPlane,
      faCheck,
      faEnvelope,
      faCheck,
      faXmark,
      faBabyCarriage,
      faAddressBook,
      faUserXmark,
      faChurch,
      faUpload,
      faDownload,
      faBug,
      faSpinner
    );
  }
}
