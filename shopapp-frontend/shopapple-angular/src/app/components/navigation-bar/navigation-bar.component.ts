import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../responses/user/user.response';
import { TokenService } from '../../services/token.service';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  userResponse?: UserResponse | null;
  isPopoverOpen = false;
  activeNavItem: number = 0;

  constructor(
    private userService: UserService,
    //private popoverConfig: NgbPopoverConfig,  
    private tokenService: TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  togglePopover(event: Event): void {
    event.preventDefault();
    this.isPopoverOpen = !this.isPopoverOpen;
  }

  handleItemClick(index: number): void {
    switch (index) {
      case 0:
        debugger
        this.router.navigate(['/']);
        break;
      case 1:
        debugger
        this.router.navigate(['/user-profile']);
        break;
      case 2:
        this.userService.removeUserFromLocalStorage();
        this.tokenService.removeToken();
        this.userResponse = this.userService.getUserResponseFromLocalStorage();
        break;
      case 3:
        debugger
        this.router.navigate(['/carts']);
        break;
      case 4:
        debugger
        this.router.navigate(['/login']);
        break;
      default:
        console.warn('Unhandled index:', index);
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }


  navigateToOrderDetail(userId: number) {
    debugger;
    // Điều hướng đến trang detail-product với productId là tham số
    this.router.navigate(['/orders', userId]);
  }

  setActiveNavItem(index: number) {
    this.activeNavItem = index;
    //alert(this.activeNavItem);
  }
}