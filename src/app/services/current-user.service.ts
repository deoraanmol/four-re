import {EventEmitter, Injectable} from '@angular/core';
import {UserHttpService} from "./user-http.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {PendingPickups} from '../interfaces/PendingPickups';
import {Observable} from 'rxjs';
import {Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  currentUserData: {};
  pendingPickups: PendingPickups[] = [];
  userRefreshed = new EventEmitter<any>();
  phoneNumberValidator = [
    Validators.required,
    Validators.pattern("^[1-9][0-9]{0,11}$"),
    Validators.maxLength(10),
    Validators.minLength(10)];
  emailValidator = [
    Validators.required,
    Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')];

  refreshUserData(angularFireAuth: AngularFireAuth) {
    angularFireAuth.user.subscribe(result => {
      if(result != null) {
        let phoneNo = result.phoneNumber;
        // this.signUpUser(phoneNo);
        //todo anmol mock
        this.userHttpService.getUser(phoneNo)
          .subscribe(res => {
            this.currentUserData = res[0];
            this.userRefreshed.emit(this.currentUserData);
          });
      } else {
        //todo anmol - put it only when success
        this.navToLogin();
      }
    });
  }

  mockUser() {
    this.userHttpService.getUser("test1")
      .subscribe(res => {
        this.currentUserData = res[0];
        this.userRefreshed.emit(this.currentUserData);
      });
  }

  openSnackbar(snackbar, msg, action) {
    snackbar.open(msg, action, {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }


  getPendingRequests() {
    if(this.currentUserData
      && this.currentUserData['_id']) {
      this.userHttpService
        .getPendingPickups(this.currentUserData['_id'])
        .subscribe(res => {
          this.pendingPickups = res;
        });
    }
  }

  signOutUser(angularFireAuth) {
    var self = this;
    angularFireAuth.auth.signOut().then(() => {
      self.navToHome();
    });
  }

  navToLogin() {
    this.router.navigate(["/get-started"]);
  }

  navToHome() {
    this.router.navigate(["/home"]);
  }

  navToRewardsEarned() {
    this.router.navigate(["/dashboard"]);
  }

  excludeCountryCode(countryCode, inputStr) {
    if(inputStr && inputStr.length > 3) {
      if(countryCode === "IND") {
        inputStr = inputStr.replace("+91",'');
      }
      return inputStr;
    } else {
      return inputStr;
    }
  }

  constructor(private userHttpService: UserHttpService,
              private router: Router) { }

  isPayTM(paymentType) {
    if(paymentType.toLowerCase() === "paytm"){
      return true;
    }
    return false;
  }
}
