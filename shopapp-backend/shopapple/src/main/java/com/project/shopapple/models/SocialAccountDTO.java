package com.project.shopapple.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class SocialAccountDTO {

    @JsonProperty("facebook_account_id")
    protected String facebookAccountId;

    @JsonProperty("google_account_id")
    protected String googleAccountId;

    public Boolean isFacebookAccountIdValid() {
        return facebookAccountId != null && !facebookAccountId.isEmpty();
    }

    public Boolean isGoogleAccountIdValid() {
        return googleAccountId != null && !googleAccountId.isEmpty();
    }

    // Phương thức kiểm tra xem người dùng có phải là người dùng đăng nhập xã hội hay không
    public Boolean isSocialLogin() {
        return (facebookAccountId != null && !facebookAccountId.isEmpty()) ||
                (googleAccountId != null && !googleAccountId.isEmpty());
    }
}

