import { Component } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
