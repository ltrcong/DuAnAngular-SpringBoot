//package com.project.apple.entities;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Data
//@Getter
//@Setter
//@Entity
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Table(name = "comments")
//public class Comment extends BaseEntity {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @ManyToOne
//    @JoinColumn(name = "product_id")
//    private Product productID;
//
//    @ManyToOne
//    @JoinColumn(name = "customer_id")
//    private User userID;
//
//    private String content;
//}
