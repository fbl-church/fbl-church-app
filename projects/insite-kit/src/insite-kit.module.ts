import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { BannerComponent } from './component/banner/banner.component';
import { CardHeaderComponent } from './component/card/card-header/card-header.component';
import { CardInfoComponent } from './component/card/card-info/card-info.component';
import { CardComponent } from './component/card/card.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactAdminModalComponent } from './component/footer/modals/contact-admin-modal/contact-admin-modal.component';
import { PrivacyPolicyModalComponent } from './component/footer/modals/privacy-policy-modal/privacy-policy-modal.component';
import { ProjectModalComponent } from './component/footer/modals/project-modal/project-modal.component';
import { FormFieldComponent } from './component/form/field/form-field.component';
import { FormComponent } from './component/form/form.component';
import { GridChecklistColumnComponent } from './component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridColumnComponent } from './component/grid/grid-column/grid-column.component';
import { GridPagerComponent } from './component/grid/grid-pager/grid-pager.component';
import { GridSearchComponent } from './component/grid/grid-search/grid-search.component';
import { GridSelectionColumnComponent } from './component/grid/grid-selection-column/grid-selection-column.component';
import { GridShowAllComponent } from './component/grid/grid-show-all/grid-show-all.component';
import { GridComponent } from './component/grid/grid.component';
import { HeaderBackComponent } from './component/header/header-back/header-back.component';
import { HeaderComponent } from './component/header/header.component';
import { IconComponent } from './component/icon/icon.component';
import { IndicatorLightComponent } from './component/indicator-light/indicator-light.component';
import { InfoCardComponent } from './component/info-card/info-card.component';
import { InsitePageComponent } from './component/insite-page/insite-page.component';
import { LoadingComponent } from './component/loading/loading.component';
import { ModalActionBarComponent } from './component/modal/modal-action-bar/modal-action-bar.component';
import { ModalBodyComponent } from './component/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from './component/modal/modal-header/modal-header.component';
import { ModalComponent } from './component/modal/modal.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotificationPopupComponent } from './component/notification-popup/notification-popup.component';
import { SingleSelectInputComponent } from './component/select/select.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { WizardStepComponent } from './component/wizard/wizard-step/wizard-step.component';
import { WizardStepDirective } from './component/wizard/wizard-step/wizard-step.directive';
import { WizardComponent } from './component/wizard/wizard.component';
import { FeatureAccessDirective } from './directives/featureAccess/feature-access.directive';
import { WebRoleRestrictionAccessDirective } from './directives/webRoleRestrictionAccess/webRole-restriction-access.directive';
import { NumberRestrictionDirective } from './service/directive/number-restriction.directive';
import { PhoneMaskDirective } from './service/directive/phone-mask.directive';
import { BasicHttpInterceptorService } from './service/interceptor/http-interceptor.service';
import { AddressPipe } from './service/pipe/address.pipe';
import { AgePipe } from './service/pipe/age.pipe';
import { ChurchGroupTranslationPipe } from './service/pipe/church-group-translation.pipe';
import { UsernamePipe } from './service/pipe/format-user-name.pipe';
import { NotificationMessagePipe } from './service/pipe/notification-message.pipe';
import { WebRoleTranslationPipe } from './service/pipe/web-role-translation.pipe';
import { InisteGeneralNotificationComponent } from './subscription/insite-general-notification/insite-general-notification.component';
import { InisteUserNotificationComponent } from './subscription/insite-user-notification/insite-user-notification.component';

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    UsernamePipe,
    NotificationMessagePipe,
    WebRoleTranslationPipe,
    NavbarComponent,
    SidebarComponent,
    InsitePageComponent,
    ContactAdminModalComponent,
    PrivacyPolicyModalComponent,
    ProjectModalComponent,
    ModalActionBarComponent,
    ModalBodyComponent,
    ModalHeaderComponent,
    ModalComponent,
    FooterComponent,
    LoadingComponent,
    BannerComponent,
    CardHeaderComponent,
    CardInfoComponent,
    CardComponent,
    CheckboxComponent,
    GridColumnComponent,
    GridPagerComponent,
    GridSearchComponent,
    GridShowAllComponent,
    GridComponent,
    GridChecklistColumnComponent,
    GridSelectionColumnComponent,
    HeaderBackComponent,
    HeaderComponent,
    NotificationPopupComponent,
    IndicatorLightComponent,
    IconComponent,
    InisteUserNotificationComponent,
    InisteGeneralNotificationComponent,
    ChurchGroupTranslationPipe,
    PhoneMaskDirective,
    WebRoleRestrictionAccessDirective,
    FeatureAccessDirective,
    AgePipe,
    SingleSelectInputComponent,
    NumberRestrictionDirective,
    AddressPipe,
    WizardComponent,
    WizardStepComponent,
    WizardStepDirective,
    InfoCardComponent,
    FormFieldComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  exports: [
    UsernamePipe,
    NotificationMessagePipe,
    WebRoleTranslationPipe,
    NavbarComponent,
    SidebarComponent,
    InsitePageComponent,
    ContactAdminModalComponent,
    PrivacyPolicyModalComponent,
    ProjectModalComponent,
    ModalActionBarComponent,
    ModalBodyComponent,
    ModalHeaderComponent,
    ModalComponent,
    FooterComponent,
    LoadingComponent,
    BannerComponent,
    CardHeaderComponent,
    CardInfoComponent,
    CardComponent,
    CheckboxComponent,
    GridColumnComponent,
    GridPagerComponent,
    GridSearchComponent,
    GridShowAllComponent,
    GridComponent,
    GridChecklistColumnComponent,
    GridSelectionColumnComponent,
    HeaderBackComponent,
    HeaderComponent,
    NotificationPopupComponent,
    IndicatorLightComponent,
    IconComponent,
    InisteUserNotificationComponent,
    InisteGeneralNotificationComponent,
    ChurchGroupTranslationPipe,
    PhoneMaskDirective,
    WebRoleRestrictionAccessDirective,
    FeatureAccessDirective,
    AgePipe,
    SingleSelectInputComponent,
    NumberRestrictionDirective,
    AddressPipe,
    WizardComponent,
    WizardStepComponent,
    WizardStepDirective,
    InfoCardComponent,
    FormFieldComponent,
    FormComponent,
  ],
  entryComponents: [ModalComponent, NotificationPopupComponent],
  providers: [
    UsernamePipe,
    NotificationMessagePipe,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class InsiteKitModule {
  static forRoot(environment: any): ModuleWithProviders<InsiteKitModule> {
    return {
      ngModule: InsiteKitModule,
      providers: [
        {
          provide: 'env',
          useValue: environment,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BasicHttpInterceptorService,
          multi: true,
        },
      ],
    };
  }
}
