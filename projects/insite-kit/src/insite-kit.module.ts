import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { BaseInsiteModule } from './base-insite.module';
import { BannerComponent } from './component/banner/banner.component';
import { CardHeaderCollapsibleComponent } from './component/card/card-header-collapsible/card-header-collapsible.component';
import { CardHeaderComponent } from './component/card/card-header/card-header.component';
import { CardInfoComponent } from './component/card/card-info/card-info.component';
import { CardComponent } from './component/card/card.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { FooterComponent } from './component/footer/footer.component';
import { ContactAdminModalComponent } from './component/footer/modals/contact-admin-modal/contact-admin-modal.component';
import { PrivacyPolicyModalComponent } from './component/footer/modals/privacy-policy-modal/privacy-policy-modal.component';
import { ProjectModalComponent } from './component/footer/modals/project-modal/project-modal.component';
import { FormFieldErrorComponent } from './component/form/field-error/form-field-error.component';
import { FormFieldComponent } from './component/form/field/form-field.component';
import { FormComponent } from './component/form/form.component';
import { GridChecklistColumnComponent } from './component/grid/grid-checklist-column/grid-checklist-column.component';
import { GridColumnComponent } from './component/grid/grid-column/grid-column.component';
import { GridDownloadComponent } from './component/grid/grid-download/grid-download.component';
import { GridPagerComponent } from './component/grid/grid-pager/grid-pager.component';
import { GridSearchComponent } from './component/grid/grid-search/grid-search.component';
import { GridSelectionColumnComponent } from './component/grid/grid-selection-column/grid-selection-column.component';
import { GridShowAllComponent } from './component/grid/grid-show-all/grid-show-all.component';
import { GridComponent } from './component/grid/grid.component';
import { HeaderBackComponent } from './component/header/header-back/header-back.component';
import { HeaderComponent } from './component/header/header.component';
import { IconModule } from './component/icon/icon.module';
import { IndicatorLightComponent } from './component/indicator-light/indicator-light.component';
import { InfoCardComponent } from './component/info-card/info-card.component';
import { InputTagComponent } from './component/input-tag/input-tag.component';
import { InsitePageComponent } from './component/insite-page/insite-page.component';
import { LoadingComponent } from './component/loading/loading.component';
import { ModalActionBarComponent } from './component/modal/modal-action-bar/modal-action-bar.component';
import { ModalBodyComponent } from './component/modal/modal-body/modal-body.component';
import { ModalHeaderComponent } from './component/modal/modal-header/modal-header.component';
import { ModalComponent } from './component/modal/modal.component';
import { MultiSelectInputComponent } from './component/multiselect/multi-select-input.component';
import { NavbarProfileContentComponent } from './component/navbar/navbar-profile-content/navbar-profile-content.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotificationPopupComponent } from './component/notification-popup/notification-popup.component';
import { ProgressComponent } from './component/progress/progress.component';
import { SingleSelectInputComponent } from './component/select/select.component';
import { DropdownComponent } from './component/sidebar/dropdown/dropdown.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { TagInputFieldComponent } from './component/tag-input-field/tag-input-field.component';
import { UploadComponent } from './component/upload/upload.component';
import { WizardStepComponent } from './component/wizard/wizard-step/wizard-step.component';
import { WizardStepDirective } from './component/wizard/wizard-step/wizard-step.directive';
import { WizardComponent } from './component/wizard/wizard.component';
import { AttendanceRecordActivationDirective } from './service/directives/attendance-record-activation.directive';
import { FeatureAccessDirective } from './service/directives/feature-access.directive';
import { NumberRestrictionDirective } from './service/directives/number-restriction.directive';
import { PhoneMaskDirective } from './service/directives/phone-mask.directive';
import { TooltipDirective } from './service/directives/tooltip.directive';
import { WebRoleRestrictionAccessDirective } from './service/directives/webRole-restriction-access.directive';
import { DOMModule } from './service/dom/dom.module';
import { BasicHttpInterceptorService } from './service/interceptor/http-interceptor.service';
import { AddressPipe } from './service/pipe/address.pipe';
import { AgePipe } from './service/pipe/age.pipe';
import { ChurchGroupTranslationPipe } from './service/pipe/church-group-translation.pipe';
import { UsernamePipe } from './service/pipe/format-user-name.pipe';
import { NotificationMessagePipe } from './service/pipe/notification-message.pipe';
import { RelationshipTranslationPipe } from './service/pipe/relationship-translation.pipe';
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
    FormFieldErrorComponent,
    FormComponent,
    MultiSelectInputComponent,
    DropdownComponent,
    RelationshipTranslationPipe,
    AttendanceRecordActivationDirective,
    CardHeaderCollapsibleComponent,
    UploadComponent,
    ProgressComponent,
    NavbarProfileContentComponent,
    InputTagComponent,
    TagInputFieldComponent,
    GridDownloadComponent,
    TooltipDirective,
  ],
  imports: [
    BaseInsiteModule,
    IconModule,
    DOMModule,
    RouterModule.forRoot([]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    FileUploadModule,
  ],
  exports: [
    IconModule,
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
    FormFieldErrorComponent,
    FormComponent,
    MultiSelectInputComponent,
    DropdownComponent,
    RelationshipTranslationPipe,
    AttendanceRecordActivationDirective,
    CardHeaderCollapsibleComponent,
    UploadComponent,
    ProgressComponent,
    NavbarProfileContentComponent,
    InputTagComponent,
    TagInputFieldComponent,
    GridDownloadComponent,
    DOMModule,
    TooltipDirective,
  ],
  providers: [UsernamePipe, NotificationMessagePipe, { provide: APP_BASE_HREF, useValue: '/' }],
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
