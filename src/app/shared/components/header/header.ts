import { Component, inject } from '@angular/core';
import { TuiButton, TuiDataList, TuiDropdown } from '@taiga-ui/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-header',
  imports: [TuiButton, TuiDropdown, TuiDataList],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private authService = inject(AuthService)
  
  protected isOpened = false;

  public getUser(): User{
    return this.authService.user();
  }

  public logout(){
    this.authService.logout();
  }

  
}
