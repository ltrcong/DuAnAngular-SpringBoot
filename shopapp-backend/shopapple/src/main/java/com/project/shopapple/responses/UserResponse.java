package com.project.shopapple.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.shopapple.entities.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("address")
    private String address;

    @JsonProperty("profile_image")
    private String profileImage;

    @JsonProperty("is_active")
    private Boolean active;

    @JsonProperty("date_of_birth")
    private Date dateOfBirth;

    @JsonProperty("facebook_account_id")
    private Long facebookAccountId;

    @JsonProperty("google_account_id")
    private Long googleAccountId;

    @JsonProperty("role")
    private com.project.shopapple.entities.Role role;
    public static UserResponse fromUser(com.project.shopapple.entities.User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .address(user.getAddress())
                .active(user.isActive())
                .dateOfBirth(user.getDateOfBirth())
                .facebookAccountId(user.getFacebookAccountID())
                .googleAccountId(user.getGoogleAccountID())
                .role(user.getRole())
                .build();
    }
}
