import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
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
import { LeavesAdminComponent } from './views/leaves-admin/leaves-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
  },
  {
    path:'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'leaves',
        component: LeavesManagerComponent,
      },
      {
        path: 'All-leaves',
        component: LeavesAdminComponent,
      },
      {
        path: 'Myleaves',
        component: LeavesUserComponent,
      },
      {
        path: 'success',
        component: AlertSuccessComponent,
      },
      {
        path: 'infoMessage',
        component: AlertInfoMessageComponent,
      },
      {
        path: 'warning',
        component: WarningAlertComponent,
      },
      {
        path: 'error',
        component: ErrorAlertComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
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
