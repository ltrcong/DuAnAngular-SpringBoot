package com.project.shopapple.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    @JsonProperty("product_id")
    private Long productId;

    @JsonProperty("customer_id")
    private Long customerId;

    private String content;
}
