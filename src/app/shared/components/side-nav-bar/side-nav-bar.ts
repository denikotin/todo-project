import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-side-nav-bar',
  imports: [TuiButton, RouterLink, RouterLinkActive],
  templateUrl: './side-nav-bar.html',
  styleUrl: './side-nav-bar.css'
})
export class SideNavBar {

}
