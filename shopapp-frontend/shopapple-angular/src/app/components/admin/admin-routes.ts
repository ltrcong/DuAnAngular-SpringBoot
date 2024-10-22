import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { OrderAdminComponent } from "./order.admin/order.admin.component";
import { ProductAdminComponent } from "./product.admin/product.admin.component";
import { CategoryAdminComponent } from "./category.admin/category.admin.component";
import { DetailOrderAdminComponent } from "./detail-order.admin/detail-order.admin.component";
// import { UserAdminComponent } from "./user.admin/user.admin.compone";

export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'orders',
                component: OrderAdminComponent
            },            
            {
                path: 'products',
                component: ProductAdminComponent
            },
            {
                path: 'categories',
                component: CategoryAdminComponent
            },
            //sub path
            {
                path: 'orders/:id',
                component: DetailOrderAdminComponent
            },
            // {
            //     path: 'products/update/:id',
            //     component: UpdateProductAdminComponent
            // },
            // {
            //     path: 'products/insert',
            //     component: InsertProductAdminComponent
            // },
            //categories            
            // {
            //     path: 'categories/update/:id',
            //     component: UpdateCategoryAdminComponent
            // },
            // {
            //     path: 'categories/insert',
            //     component: InsertCategoryAdminComponent
            // },
            // {
            //     path: 'users',
            //     component: UserAdminComponent
            // },  
        ]
    }
];