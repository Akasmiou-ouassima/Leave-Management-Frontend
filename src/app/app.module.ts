import { NgModule } from '@angular/core';
import { LocationStrategy, NgOptimizedImage, PathLocationStrategy} from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { MatIconModule } from '@angular/material/icon';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule, ButtonCloseDirective,
  ButtonDirective,
  ButtonGroupModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent, ModalModule,
  ModalTitleDirective,
  ModalToggleDirective,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { UsersComponent } from './views/users/users.component';
import { LoginComponent } from './views/login/login.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from "@angular/material/input";
import {MatLineModule} from "@angular/material/core";
import {MatBadgeModule} from "@angular/material/badge";
import { ProfileComponent } from './views/profile/profile.component';
import {RouterModule} from "@angular/router";
import { TeamsComponent } from './views/teams/teams.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import { LeavesUserComponent } from './views/leaves-user/leaves-user.component';
import { MakeRequestPopUpComponent } from './views/make-request-pop-up/make-request-pop-up.component';
import { LeavesManagerComponent } from './views/leaves-manager/leaves-manager.component';
import { EditRequestPopUpComponent } from './views/edit-request-pop-up/edit-request-pop-up.component';
import { AddUserPopUpComponent } from './views/add-user-pop-up/add-user-pop-up.component';
import { UpdateUserPopUpComponent } from './views/update-user-pop-up/update-user-pop-up.component';
import { AddTeamPopUpComponent } from './views/add-team-pop-up/add-team-pop-up.component';
import { UpdateTeamPopUpComponent } from './views/update-team-pop-up/update-team-pop-up.component';
import { DiscoverTeamComponent } from './views/discover-team/discover-team.component';
import { AlertSuccessComponent } from './views/alert-success/alert-success.component';
import { AlertInfoMessageComponent } from './views/alert-info-message/alert-info-message.component';
import { WarningAlertComponent } from './views/warning-alert/warning-alert.component';
import { ErrorAlertComponent } from './views/error-alert/error-alert.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { MatSelectModule } from '@angular/material/select';
import {HttpClientModule} from "@angular/common/http";
import { TeamSuccessComponent } from './views/team-success/team-success.component';
import { ErrorDeleteTeamComponent } from './views/error-delete-team/error-delete-team.component';
import { ConfirmDeleteTeamComponent } from './views/confirm-delete-team/confirm-delete-team.component';
import { WarningDeleteLeaveComponent } from './views/warning-delete-leave/warning-delete-leave.component';
import { SuccessSaveLeaveComponent } from './views/success-save-leave/success-save-leave.component';
import { LeavesAdminComponent } from './views/leaves-admin/leaves-admin.component';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, UsersComponent, LoginComponent, ProfileComponent, TeamsComponent, LeavesUserComponent, MakeRequestPopUpComponent,
    LeavesManagerComponent, EditRequestPopUpComponent, AddUserPopUpComponent, UpdateUserPopUpComponent, AddTeamPopUpComponent, UpdateTeamPopUpComponent, DiscoverTeamComponent,
    AlertSuccessComponent, AlertInfoMessageComponent, WarningAlertComponent, ErrorAlertComponent, CalendarComponent, TeamSuccessComponent, ErrorDeleteTeamComponent, ConfirmDeleteTeamComponent, WarningDeleteLeaveComponent, SuccessSaveLeaveComponent, LeavesAdminComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    MatIconModule,
    NgOptimizedImage,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatLineModule,
    MatBadgeModule,
    RouterModule,
    ModalHeaderComponent,
    ModalToggleDirective,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    ModalComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalModule,
    FullCalendarModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
