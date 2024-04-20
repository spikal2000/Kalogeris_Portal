package com.kalogerisportal.kalogerisportal_j.restlmpl;

import com.kalogerisportal.kalogerisportal_j.Service.UserService;
import com.kalogerisportal.kalogerisportal_j.constents.BakeryConstants;
import com.kalogerisportal.kalogerisportal_j.rest.UserRest;
import com.kalogerisportal.kalogerisportal_j.utils.BakeryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserRestImpl implements UserRest {

    @Autowired
    UserService userService;


    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try {
            return userService.signUp(requestMap);
        }catch (Exception e) {
            e.printStackTrace();
        }
        return BakeryUtils.getResponseEntity(BakeryConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
