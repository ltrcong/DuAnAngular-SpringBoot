package com.project.shopapple.repositories;

import com.project.shopapple.entities.Order;
import com.project.shopapple.entities.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrderId(Order orderID);

}
