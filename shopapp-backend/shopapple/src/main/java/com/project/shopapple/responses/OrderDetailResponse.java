package com.project.shopapple.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.shopapple.entities.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailResponse {
    private Long id;

    @JsonProperty("order_id")
    private Long orderID;

    @JsonProperty("product_id")
    private Long productID;

    private Float price;

    @JsonProperty("number_of_products")
    private Long numberOfProducts;

    @JsonProperty("total_money")
    private Float totalMoney;

    public static OrderDetailResponse fromOrderDetail(OrderDetail orderDetail){
        OrderDetailResponse orderDetailResponse = OrderDetailResponse.builder()
                .id(orderDetail.getId())
                .orderID(orderDetail.getOrder().getId())
                .productID(orderDetail.getProduct().getId())
                .price(orderDetail.getPrice())
                .numberOfProducts(orderDetail.getNumberOfProducts())
                .totalMoney(orderDetail.getTotalMoney())
                .build();
        return orderDetailResponse;
    }
}
