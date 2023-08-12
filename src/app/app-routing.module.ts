import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import {UsersComponent} from "./views/users/users.component";
import {LoginComponent} from "./views/login/login.component";
import {ProfileComponent} from "./views/profile/profile.component";
import {TeamsComponent} from "./views/teams/teams.component";
import {LeavesManagerComponent} from "./views/leaves-manager/leaves-manager.component";
import {LeavesUserComponent} from "./views/leaves-user/leaves-user.component";
import {AlertComponent} from "@coreui/angular";
import {AlertSuccessComponent} from "./views/alert-success/alert-success.component";
import {AlertInfoMessageComponent} from "./views/alert-info-message/alert-info-message.component";
import {WarningAlertComponent} from "./views/warning-alert/warning-alert.component";
import {ErrorAlertComponent} from "./views/error-alert/error-alert.component";

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
