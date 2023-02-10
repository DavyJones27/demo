package com.davyJ.springbootdemo.service;

import com.davyJ.springbootdemo.entity.UserEntity;
import com.davyJ.springbootdemo.model.User;

public interface UserService {

    UserEntity save(User user);


    UserEntity getUserByEmail(String email);


}
