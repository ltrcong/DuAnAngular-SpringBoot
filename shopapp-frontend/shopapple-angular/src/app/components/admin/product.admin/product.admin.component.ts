import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product.admin',
  standalone: true,
  imports: [],
  templateUrl: './product.admin.component.html',
  styleUrl: './product.admin.component.css'
})
export class ProductAdminComponent {
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
