import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FeaturePolicyComponent } from "../feature-policy/feature-policy.component";
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ProductImage } from '../../models/product.image';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { NgFor } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-detail-product',
    standalone: true,
    templateUrl: './detail-product.component.html',
    styleUrl: './detail-product.component.css',
    imports: [
        NavigationBarComponent,
        HeaderComponent,
        FooterComponent,
        FeaturePolicyComponent,
        FormsModule,
        NgClass,
        NgFor
    ]
})
// khi bật màn hình onInit lên thì sẽ gọi ProductService để lấy ra chi tiết sản phẩm
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  productName: string = '';
  isPressedAddToCart:boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    ) {
      
    }
    ngOnInit() {
      // this.cartService.clearCart();
      // Lấy productId từ URL 
      const idParam = this.activatedRoute.snapshot.paramMap.get('id');
      if (idParam !== null) {
        this.productId = +idParam;
      }
      if (!isNaN(this.productId)) {
        this.productService.getDetailProduct(this.productId).subscribe({
          next: (response: any) => { 

            // Lấy danh sách ảnh sản phẩm và thay đổi URL
            // debugger
            if (response.product_images && response.product_images.length > 0) {
              response.product_images.forEach((product_image:ProductImage) => {
                // debugger
                product_image.image_url = product_image?.image_url?.includes('http') ? product_image.image_url
                    :`${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
                console.log(product_image.image_url)
              });
            }            
            // debugger
            this.product = response 
            this.productName = this.product?.name || ''; 
            // Bắt đầu với ảnh đầu tiên
            this.showImage(0);
          },
          complete: () => {           
          },
          error: (error: any) => {
            console.error('Error fetching detail:', error);
          }
        });
      } else {
        console.error('Invalid productId:', idParam);
      }      
    }
    
    showImage(index: number): void {
      // debugger
      if (this.product && this.product.product_images && 
          this.product.product_images.length > 0) {
        // Đảm bảo index nằm trong khoảng hợp lệ        
        if (index < 0) {
          index = 0;
        } else if (index >= this.product.product_images.length) {
          index = this.product.product_images.length - 1;
        }        
        // Gán index hiện tại và cập nhật ảnh hiển thị
        this.currentImageIndex = index;
      }
    }
    
    thumbnailClick(index: number) {
      // debugger
      // Gọi khi một thumbnail được bấm
      this.currentImageIndex = index; // Cập nhật currentImageIndex
    }  
    nextImage(): void {
      // debugger
      this.showImage(this.currentImageIndex + 1);
    }
  
    previousImage(): void {
      // debugger
      this.showImage(this.currentImageIndex - 1);
    }

    addToCart(): void {
      // debugger
      if (this.product) {
        this.cartService.addToCart(this.product.id, this.quantity);
        this.isPressedAddToCart = true;
        this.router.navigate(['/carts']);
        alert("Bạn mua sản phẩm này thành công")
      } else {
        // Xử lý khi product là null
        console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
      }
    }    

    buyNow(): void {      
      if(this.isPressedAddToCart == false) {
        this.addToCart();
      }
      this.router.navigate(['/orders']);
    }    
}