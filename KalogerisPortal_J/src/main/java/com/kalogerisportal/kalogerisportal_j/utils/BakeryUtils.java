package com.kalogerisportal.kalogerisportal_j.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BakeryUtils {

    private BakeryUtils() {

    }

    public static ResponseEntity<String> getResponseEntity(String responseMessage, HttpStatus httpStatus) {
        return new ResponseEntity<String>("{\"message\":\""+ responseMessage +"\"}", httpStatus);
    }

}
