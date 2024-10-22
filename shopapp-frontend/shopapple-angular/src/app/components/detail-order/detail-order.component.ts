import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../responses/api.response';
import { OrderDetail } from '../../models/order.detail';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderResponse } from '../../responses/order/order.response';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
  ],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.css'
})
export class OrderDetailComponent implements OnInit {
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 0,
    full_name: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: []
  };

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    const orderId = 7; // Thay bằng ID của đơn hàng bạn muốn lấy.
    this.orderService.getOrderById(orderId).subscribe({
      next: (response: any) => {
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.full_name = response.full_name;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.order_date = new Date(
          response.order_date[0],
          response.order_date[1] - 1,
          response.order_date[2]
        );
        
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.shipping_date = new Date(
          response.shipping_date[0],
          response.shipping_date[1] - 1,
          response.shipping_date[2]
        );
        debugger
        this.orderResponse.shipping_method = response.shipping_method;

        this.orderResponse.status = response.status;
        this.orderResponse.total_money = response.total_money;

        debugger
        this.orderResponse.order_details = response.order_details
          .map((order_detail: OrderDetail) => {
            debugger
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/images/${order_detail.product.thumbnail}`;
            return order_detail;
          });
      },
      complete: () => {
        debugger
        console.log('Order details fetched successfully');
      },
      error: (error: any) => {
        console.error('Error fetching detail:', error);
      }
    });
  }
}
