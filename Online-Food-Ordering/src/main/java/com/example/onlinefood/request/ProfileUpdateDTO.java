package com.example.onlinefood.request;

import lombok.Data;

@Data
public class ProfileUpdateDTO {

    private String newUsername;

    private String newPassword;

    private String genderSetting;

    private String newPhoneNumber;

    private String newAvatarUrl;

}
