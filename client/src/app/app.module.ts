import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EditAppComponent } from './edit-app/edit-app.component';
import { RouterModule, Routes } from '@angular/router';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import {MaterialModule} from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DndModule } from 'ngx-drag-drop';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListFormsComponent } from './list-forms/list-forms.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { FormResponseComponent } from './form-response/form-response.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ResponseDetailComponent } from './response-detail/response-detail.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { HttpInterceptorService } from './core/services/http-interceptor.service';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserAccessRightsComponent } from './user-access-rights/user-access-rights.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserAccessRightsComponent } from './edit-user-access-rights/edit-user-access-rights.component';
import { PrivateUserFormComponent } from './private-user-form/private-user-form.component';
import { PublicUserFormComponent } from './public-user-form/public-user-form.component';
import { DataGuardService } from './core/services/data-guard.service';

const appRoutes: Routes = [
  {
    path: '', component: EditAppComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'home/:id', component: EditAppComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'listForms', component: ListFormsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'previewForm/:id', component: PreviewFormComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'formResponse/:id', component: FormResponseComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'detailReport/:id', component: ResponseDetailComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'editFormData/:id/:id2', component: PreviewFormComponent, canActivate: [AuthGuardService]
  }, {
    path: 'login',
    component: AuthComponent
  }, {
    path: 'signup',
    component: AuthComponent
  },
  {
    path: 'manageUsers', component: ManageUserComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'userAccessRights', component: UserAccessRightsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'editUserAccessRights/:id', component: EditUserAccessRightsComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'data/:id', component: PrivateUserFormComponent, canActivate: [DataGuardService]
  }, {
    path: 'dataGeneral/:id', component: PublicUserFormComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    EditAppComponent,
    ListFormsComponent,
    HeaderNavbarComponent,
    PreviewFormComponent,
    FormResponseComponent,
    ConfirmDialogComponent,
    ResponseDetailComponent,
    ManageUserComponent,
    UserAccessRightsComponent,
    AddUserComponent,
    AddUserComponent,
    EditUserAccessRightsComponent,
    PrivateUserFormComponent,
    PublicUserFormComponent
  ],
  entryComponents: [ConfirmDialogComponent, AddUserComponent],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DndModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    CoreModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true
  },
  {provide: LocationStrategy, useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
