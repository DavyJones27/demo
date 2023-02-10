package com.davyJ.springbootdemo.controller;

import com.davyJ.springbootdemo.entity.UserEntity;
import com.davyJ.springbootdemo.model.User;
import com.davyJ.springbootdemo.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping
    public UserEntity save(@Valid @RequestBody User user){
        return userService.save(user);
    }

    @CrossOrigin
    @GetMapping("/{email}")
    public UserEntity getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }


}
