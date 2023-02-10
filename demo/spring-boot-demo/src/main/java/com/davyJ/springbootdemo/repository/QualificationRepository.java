package com.davyJ.springbootdemo.repository;

import com.davyJ.springbootdemo.entity.QualificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificationRepository extends JpaRepository<QualificationEntity, String> {

}

