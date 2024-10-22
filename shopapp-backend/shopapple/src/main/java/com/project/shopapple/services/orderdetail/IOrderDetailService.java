package com.project.shopapple.services.orderdetail;

import com.project.shopapple.entities.Order;
import com.project.shopapple.entities.OrderDetail;
import com.project.shopapple.exceptions.DataNotFoundException;
import com.project.shopapple.models.OrderDetailDTO;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) throws Exception;

    OrderDetail getOrderDetail(Long id) throws DataNotFoundException;

    OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException;

    void deleteById(Long id);

    List<OrderDetail> findByOrderId(Order orderID);
}
