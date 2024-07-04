package com.fabioacandrade.Gcars.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


}
