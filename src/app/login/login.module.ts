import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from "@angular/forms";
import {WindowServiceService} from "../services/window-service.service";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {FirebaseUIModule} from 'firebaseui-angular';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import {environment} from "../../environments/environment";
import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/database";
import {UserHttpService} from "../services/user-http.service";

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      whitelistedCountries: ['+91'],
      recaptchaParameters: {
        size: 'invisible'
      }

    }
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'four-re'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  declarations: [LoginComponent],
  exports: [
    LoginComponent
  ],
  providers: [WindowServiceService]
})
export class LoginModule { }
