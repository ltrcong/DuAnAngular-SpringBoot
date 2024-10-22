import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuardFn } from './guards/auth.guard';
import { OrderDetailComponent } from './components/detail-order/detail-order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order.admin/order.admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },  
    { path: 'register', component: RegisterComponent },
    { path: 'products/:id', component: DetailProductComponent },  
    { path: 'orders', component: OrderComponent},
    { path: 'carts', component:ShoppingCartComponent, canActivate:[AuthGuardFn]},
    { path: 'user-profile', component: UserProfileComponent, canActivate:[AuthGuardFn]},
    { path: 'orders/:id', component: OrderDetailComponent },
  // Admin   
    { path: 'admin', component: AdminComponent, canActivate:[AuthGuardFn]},
    { path: 'admin/orders',component: OrderAdminComponent, canActivate:[AuthGuardFn]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }