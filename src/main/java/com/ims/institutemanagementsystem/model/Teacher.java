package com.ims.institutemanagementsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    @Column
    public String name;
    @Column
    @Pattern(regexp = "^[a-z|A-Z|.]+@[a-z|A-Z]+\\.[a-z|A-Z]{2,}$")
    public String email;
    @Column
    public String imageName;
}