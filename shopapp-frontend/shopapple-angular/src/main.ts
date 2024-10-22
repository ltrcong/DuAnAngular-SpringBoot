import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// import { HomeComponent } from './app/components/home/home.component'; 
// import { OrderComponent } from './app/components/order/order.component';
// import { ShoppingCartComponent } from './app/components/shopping-cart/shopping-cart.component';
// import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
// import { LoginComponent } from './app/components/login/login.component';
// import { RegisterComponent } from './app/components/register/register.component';
// import { OrderDetailComponent } from './app/components/detail-order/detail-order.component';
import { AppComponent } from './app/app/app.component';
// import { UserProfileComponent } from './app/components/user-profile/user-profile.component';
// import { AdminComponent } from './app/admin/admin.component';
import { OrderAdminComponent } from './app/components/admin/order.admin/order.admin.component';

bootstrapApplication(OrderAdminComponent, appConfig)
  .catch((err) => console.error(err));
