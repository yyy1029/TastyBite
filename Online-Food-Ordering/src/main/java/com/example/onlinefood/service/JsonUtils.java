package com.example.onlinefood.service;

public class JsonUtils {
    public static String removeNewLines(String jsonString) {

        return jsonString.replace("\r", "").replace("\n", "");

    }
    
}

