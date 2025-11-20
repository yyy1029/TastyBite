package com.example.onlinefood.Utils;

import java.util.regex.Pattern;

public class VerityPhone {
    //Regular expression rule for validating mobile phone numbers
    private static final String PHONE_REGEX = "^\\+(?:[0-9] ?){6,14}[0-9]$";

    //Compiling Regular Expressions with Patterns
    private static final Pattern pattern = Pattern.compile(PHONE_REGEX);

    /**
     * Verify that the mobile phone number matches the predefined format
     *
     * @param phoneNumber Mobile phone number to be verified
     * @return Returns true if the mobile phone number is in the correct format; otherwise returns false
     */
    public static boolean isValidPhoneNumber(String phoneNumber) {

        return pattern.matcher(phoneNumber).matches();

    }
    
}
