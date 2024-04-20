package com.kalogerisportal.kalogerisportal_j.servicelmpl;

import com.kalogerisportal.kalogerisportal_j.Model.User;
import com.kalogerisportal.kalogerisportal_j.Service.UserService;
import com.kalogerisportal.kalogerisportal_j.constents.BakeryConstants;
import com.kalogerisportal.kalogerisportal_j.dao.UserDao;
import com.kalogerisportal.kalogerisportal_j.utils.BakeryUtils;
import jdk.jfr.Frequency;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {

        log.info("Inside signUp {}", requestMap);

    try {
        if (validateSignUpMap(requestMap)) {
            User user = userDao.findByEmailId(requestMap.get("email"));
            if (Objects.isNull(user)) {
                userDao.save(getUserFromMap(requestMap));
                return BakeryUtils.getResponseEntity("Sign Up Successful", HttpStatus.OK);
            } else {
                return BakeryUtils.getResponseEntity("Email already exists.", HttpStatus.BAD_REQUEST);
            }
        } else {
            return BakeryUtils.getResponseEntity(BakeryConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
        }
    }
    catch (Exception e) {
        e.printStackTrace();
    }
    return BakeryUtils.getResponseEntity(BakeryConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    private boolean validateSignUpMap(Map<String, String> requestMap){
        return requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
                && requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    private User getUserFromMap(Map<String, String> requestMap){
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setStatus("false");
        user.setRole("user");
        return user;
    }

}
