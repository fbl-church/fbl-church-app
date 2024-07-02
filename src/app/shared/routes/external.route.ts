import { Route } from '@angular/router';
import { VBSExternalRegistrationCompleteComponent } from 'src/app/pages/vbs/vbs-external-registration/vbs-external-registration-complete/vbs-external-registration-complete.component';
import { VBSExternalRegistrationComponent } from 'src/app/pages/vbs/vbs-external-registration/vbs-external-registration.component';
import { UnauthenticatedLayoutComponent } from '../components/layouts/unauthenticated-layout/unauthenticated-layout.component';

export const EXTERNAL_ROUTE: Route = {
  path: 'external',
  component: UnauthenticatedLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: '/external/vbs/registration',
      pathMatch: 'full',
    },
    {
      path: 'vbs/registration',
      component: VBSExternalRegistrationComponent,
      data: {
        wizardData: {
          baseRoute: '/external/vbs/registration',
          translation: 'VBS Registration',
        },
      },
    },
    {
      path: 'vbs/registration/complete',
      component: VBSExternalRegistrationCompleteComponent,
    },
  ],
};
