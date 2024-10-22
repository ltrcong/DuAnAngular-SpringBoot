import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category.admin',
  standalone: true,
  imports: [],
  templateUrl: './category.admin.component.html',
  styleUrl: './category.admin.component.css'
})
export class CategoryAdminComponent {
  isPopoverOpen = false;

  constructor(
    private router: Router,
  ) { }
  
  handleItemClick(index: number): void {
    switch (index) {
      case 0:
        debugger
        this.router.navigate(['/admin']);
        break;
      case 1:
        debugger
        this.router.navigate(['/admin/category']);
        break;
      case 2:
        debugger
        this.router.navigate(['/admin/product']);
        break;
      case 3:
        debugger
        this.router.navigate(['/admin/order']);
        break;
      default:
        console.warn('Unhandled index:', index);
    }
    this.isPopoverOpen = false; // Close the popover after clicking an item
  }
}
