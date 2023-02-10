package com.davyJ.springbootdemo.service;

import com.davyJ.springbootdemo.entity.QualificationEntity;
import com.davyJ.springbootdemo.entity.UserEntity;
import com.davyJ.springbootdemo.error.UserNotFoundException;
import com.davyJ.springbootdemo.model.User;
import com.davyJ.springbootdemo.repository.UserRepository;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional()
    public UserEntity save(User user) {
            userRepository.findByEmail(user.getEmail()).stream()
                    .filter(a -> user.getEmail().equals(a.getEmail()))
                    .findAny()
                    .ifPresent(a ->  {throw new UserNotFoundException(" user already exist");});

            UserEntity userEntity = new ObjectMapper().convertValue(user, UserEntity.class);
            userEntity.setId(UUID.randomUUID().toString());

            QualificationEntity qualificationEntity = userEntity.getQualification();
            qualificationEntity.setId(UUID.randomUUID().toString());
            log.info(userEntity.toString());
            userRepository.save(userEntity);

            return userEntity;
    }


    @Override
    public UserEntity getUserByEmail(String email) {
        return   userRepository.findByEmail(email).stream()
                .filter(a -> email.equals(a.getEmail()))
                .findFirst().orElseThrow(() -> new UserNotFoundException("No user with "+ email));
    }


}
