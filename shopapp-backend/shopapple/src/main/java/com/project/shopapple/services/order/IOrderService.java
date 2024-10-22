package com.project.shopapple.services.order;

import com.project.shopapple.entities.User;
import com.project.shopapple.entities.Order;
import com.project.shopapple.exceptions.DataNotFoundException;
import com.project.shopapple.models.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;

    Order getOrder(Long id);

    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;

    void deleteOrder(Long id);

    List<Order> findByCustomerId(Long userID);

    Page<Order> getOrdersByKeyword(String keyword, Pageable pageable);
}
