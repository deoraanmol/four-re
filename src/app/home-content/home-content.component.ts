import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from '@angular/material';
import {MobileMenuDialogComponent} from '../mobile-menu-dialog/mobile-menu-dialog.component';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  constructor(private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  takeMe() {
    this.router.navigate(['/get-started']);
  }

  openMobileMenuDialog() {
    const dialogRef = this.dialog.open(MobileMenuDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {

      }
    });
  }
}
