import { Component, OnInit } from '@angular/core';
import {MobileMenuDialogComponent} from '../../mobile-menu-dialog/mobile-menu-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private router: Router) {
    console.log('Header constructor called');
  }

  ngOnInit() {
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
    dialogRef.afterClosed().subscribe(result => {
      if(result.anchorId) {
        this.takeHomeAt(result.anchorId);
      } else this.router.navigate(['/home']);
    });
  }

  takeHomeAt(anchorId: string) {
    this.router.navigate(["/home"], {state: {anchorId: anchorId}});
  }
}
