import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  location: Location;
  private sidebarVisible: boolean;

  public isCollapsed = true;

  constructor(location: Location, private element: ElementRef, private router: Router) {
    this.location = location;
    this.sidebarVisible = window.innerWidth >= 1400;
  }

  ngOnInit() {
  }

  sidebarOpen() {
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    const html = document.getElementsByTagName('html')[0];

    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];

    html.classList.remove('nav-open');
    this.sidebarVisible = false;
  };

  toggleSidebar() {
    console.log(this.sidebarVisible)
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
}
