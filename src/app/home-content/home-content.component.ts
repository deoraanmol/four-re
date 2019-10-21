import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  takeMe() {
    this.router.navigate(['/get-started']);
  }

}
