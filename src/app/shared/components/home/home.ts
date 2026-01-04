import { Component } from '@angular/core';
import { SideNavBar } from '../side-nav-bar/side-nav-bar';
import { Header } from '../header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header,SideNavBar,RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
