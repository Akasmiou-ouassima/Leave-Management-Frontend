import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {UsersComponent} from "./views/users/users.component";
import {LoginComponent} from "./views/login/login.component";
import {ProfileComponent} from "./views/profile/profile.component";
import {TeamsComponent} from "./views/teams/teams.component";
import {LeavesManagerComponent} from "./views/leaves-manager/leaves-manager.component";
import {LeavesUserComponent} from "./views/leaves-user/leaves-user.component";
import {AlertSuccessComponent} from "./views/alert-success/alert-success.component";
import {AlertInfoMessageComponent} from "./views/alert-info-message/alert-info-message.component";
import {WarningAlertComponent} from "./views/warning-alert/warning-alert.component";
import {ErrorAlertComponent} from "./views/error-alert/error-alert.component";
import {CalendarComponent} from "./views/calendar/calendar.component";
import {LeavesAdminComponent} from './views/leaves-admin/leaves-admin.component';
import {AuthenticationGuard} from "./views/guards/authentication.guard";
import {NotAuthorizedComponent} from "./views/not-authorized/not-authorized.component";
import {ForgetPasswordComponent} from "./views/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./views/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
          canActivate: [AuthenticationGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate : [AuthenticationGuard],
      },
      {
        path: 'teams',
        component: TeamsComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'leaves',
        component: LeavesManagerComponent,
        canActivate : [AuthenticationGuard],
      },
      {
        path: 'All-leaves',
        component: LeavesAdminComponent,
        canActivate : [AuthenticationGuard],
      },
      {
        path: 'Myleaves',
        component: LeavesUserComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'success',
        component: AlertSuccessComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'infoMessage',
        component: AlertInfoMessageComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'warning',
        component: WarningAlertComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'error',
        component: ErrorAlertComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule),
        canActivate: [AuthenticationGuard]
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
