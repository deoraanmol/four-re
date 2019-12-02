import { Component, OnInit } from '@angular/core';
import {
  FirebaseuiAngularLibraryService,
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from "firebaseui-angular";
import {Router} from "@angular/router";
import {FirebaseAuth} from "@angular/fire";
import {AngularFireAuth} from "@angular/fire/auth";
import {UserHttpService} from "../services/user-http.service";
import {CurrentUserService} from "../services/current-user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  homeSource: string = '';

  constructor(private router: Router,
              private firebaseAuth: AngularFireAuth,
              private userHttpService: UserHttpService,
              private currentUserService: CurrentUserService) {
    this.homeSource = this.router.getCurrentNavigation().extras.state.source;
  }


  ngOnInit() {
    this.firebaseAuth.user.subscribe(result => {
      if(result != null) {
        let phoneNo = result.phoneNumber;
        this.signUpUser(phoneNo);
        //todo anmol mock
        // this.signUpUser("test1");
      } else {
        //todo anmol - put it only when success
        // this.signUpUser("test1");
        // this.currentUserService.navToLogin();
      }
    });

  }

  private signUpUser(phoneNumber) {
    this.userHttpService.getUser(phoneNumber)
      .subscribe(res => {
        if(res && res.length > 0) {
          console.log("User already saved, hence not saving again");
          this.navigateToRequestPickup(res[0]);
        } else {
          this.userHttpService.saveUser({phoneNumber: phoneNumber, enabled: true})
            .subscribe(res => {
              console.log("User Saved successfully!");
              this.navigateToRequestPickup(res);
            });
        }
      })
  }

  private navigateToRequestPickup(user) {
    this.currentUserService.currentUserData = user;
    if(this.homeSource === 'viewRequests') {
      //take user directly to his dashboard
      this.currentUserService.navToRewardsEarned();
    } else {
      this.userHttpService
            .getPendingPickups(user['_id'])
            .subscribe(res => {
              debugger
              if(res && res.length > 0) {
                //there are pending requests, dont allow a new pickup -> navigate directly to my rewards
                this.currentUserService.navToRewardsEarned();
              } else {
                this.router.navigate(['/pickup']);
              }
          });
    }

  }

  successCallback($event: FirebaseUISignInSuccessWithAuthResult) {
    let phoneno = $event.authResult.user.phoneNumber;
    this.userHttpService.getUser(phoneno)
      .subscribe(res => {
        this.navigateToRequestPickup(res);
      });
  }

  errorCallback($event: FirebaseUISignInFailure) {
  }

  testSignOut() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.currentUserService.navToLogin();
    });
  }
}
