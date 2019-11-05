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

  scrollWeb(el: HTMLElement, divType: string) {
    el.scrollIntoView(true);
    if(divType === "howitworks") {
      window.scrollBy(0,-90);
    } else if(divType === "whyreuse") {
      window.scrollBy(0,-100);
    } else if(divType === "faq") {
      window.scrollBy(0,-100);
    } else if(divType === "aboutus") {
      window.scrollBy(0,-100);
    }
  }

  scrollMob(anchorId: string) {
    let doc = document.getElementById(anchorId);
    if(doc) {
      doc.scrollIntoView(true);
      if(anchorId === "hiwmobile") {
        window.scrollBy(0,-90);
      } else if(anchorId === "wrmobile") {
        window.scrollBy(0,-100);
      } else if(anchorId === "faqmobile") {
        window.scrollBy(0,-100);
      } else if(anchorId === "aumobile") {
        window.scrollBy(0,-100);
      }
    }
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
      this.scrollMob(result.anchorId);
    });
  }
}
