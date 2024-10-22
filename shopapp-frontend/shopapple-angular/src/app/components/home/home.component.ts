import { Component, Inject, OnInit } from '@angular/core';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { HeaderComponent } from '../header/header.component';
import { ListProductsComponent } from '../list-products/list-products.component';
import { FeaturePolicyComponent } from '../feature-policy/feature-policy.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { environment } from '../../environments/environment';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
      NavigationBarComponent, 
      HeaderComponent, 
      ListProductsComponent, 
      FeaturePolicyComponent, 
      FooterComponent
    ]
})
export class HomeComponent{
  
}
