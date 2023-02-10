package com.davyJ.springbootdemo.model;

import com.davyJ.springbootdemo.entity.QualificationEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    private String id;
    @NotBlank(message = "Please Add First Name")
    private String firstName;

    @NotBlank(message = "Please Add last Name")
    private String lastName;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Please Add gender")
    private GenderTypes gender;

    @NotBlank(message = "Please Add email")
    @Email(message = "Invalid email")
    private String email;

    @NotNull(message = "Please Add dateOfBirth")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date dateOfBirth;

    private Date updatedAt;

    private Qualification qualification;
}
