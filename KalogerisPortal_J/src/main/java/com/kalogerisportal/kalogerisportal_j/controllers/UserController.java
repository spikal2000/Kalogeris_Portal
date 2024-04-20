package com.kalogerisportal.kalogerisportal_j.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public String user() {
        return "Welcome user";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Welcome admin";
    }


}
