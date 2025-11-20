package com.example.onlinefood;

import java.util.regex.Pattern;

class VerityPhone {
    
    private static final String PHONE_REGEX = "^\\+(?:[0-9] ?){6,14}[0-9]$";

   
    private static final Pattern pattern = Pattern.compile(PHONE_REGEX);

    /**
     *
     *
     * @param phoneNumber
     * @return
     */
    public static boolean isValidPhoneNumber(String phoneNumber) {
        return pattern.matcher(phoneNumber).matches();
    }
}
