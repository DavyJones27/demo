package com.davyJ.springbootdemo.repository;

import com.davyJ.springbootdemo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);

    @Query(value="select * from users u1 where u1.id= :id ;", nativeQuery=true)
    Optional<UserEntity> findUserAndQualificationById(String id);
}
