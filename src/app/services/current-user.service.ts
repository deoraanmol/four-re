import {EventEmitter, Injectable} from '@angular/core';
import {UserHttpService} from "./user-http.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {PendingPickups} from '../interfaces/PendingPickups';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  currentUserData: {};
  pendingPickups: PendingPickups[] = [];
  userRefreshed = new EventEmitter<any>();

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
        return this.mockUser();
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
    angularFireAuth.auth.signOut().then(() => {
      this.navToLogin();
    });
  }

  navToLogin() {
    this.router.navigate(["/get-started"]);
  }

  navToHome() {
    this.router.navigate(["/home-content"]);
  }

  navToRewardsEarned() {
    this.router.navigate(["/rewards-earned"]);
  }

  constructor(private userHttpService: UserHttpService,
              private router: Router) { }

}
