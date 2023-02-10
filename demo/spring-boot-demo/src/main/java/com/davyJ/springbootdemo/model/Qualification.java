package com.davyJ.springbootdemo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigInteger;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class
Qualification {

    private String id;
    @NotBlank(message = "Please Add education")
    private String education;

    @NotBlank(message = "Please Add salary")
    private BigInteger salary;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @NotNull(message = "Please Add dateOfJoin")
    private Date dateOfJoin;

    @NotBlank(message = "Please Add skills")
    private List<String> skills;

    @NotBlank(message = "Please Add skills")
    private String role;


}
