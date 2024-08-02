import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleDown } from '@fortawesome/free-regular-svg-icons';
import {
  faAddressBook,
  faAngleLeft,
  faAngleRight,
  faArrowRotateLeft,
  faBabyCarriage,
  faBackwardStep,
  faBars,
  faBell,
  faBug,
  faCalendarDays,
  faCaretDown,
  faCaretLeft,
  faCaretUp,
  faChartSimple,
  faCheck,
  faChildren,
  faChurch,
  faCircleArrowRight,
  faCircleExclamation,
  faCircleInfo,
  faCirclePlus,
  faClipboardCheck,
  faClose,
  faDownload,
  faEnvelope,
  faEye,
  faEyeSlash,
  faForwardStep,
  faHome,
  faLeftLong,
  faList,
  faLock,
  faMagnifyingGlass,
  faPaperPlane,
  faPenToSquare,
  faPerson,
  faPhone,
  faPlus,
  faRightFromBracket,
  faRotate,
  faSchool,
  faSearch,
  faSeedling,
  faSpinner,
  faStar,
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
  imports: [BaseInsiteModule, IconComponent],
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
      faSpinner,
      faEye,
      faEyeSlash,
      faCalendarDays,
      faAngleLeft,
      faAngleRight,
      faList,
      faCircleDown,
      faUserXmark,
      faArrowRotateLeft,
      faCircleCheck,
      faPlus,
      faClipboardCheck,
      faCircleInfo,
      faStar,
      faMagnifyingGlass,
      faCircleArrowRight,
      faPhone,
      faXmark
    );
  }
}
