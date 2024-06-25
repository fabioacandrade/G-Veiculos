package com.fabioacandrade.Gcars.model;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name="USERS")
@NoArgsConstructor
public class User {

    @Id
    @Column(name="id")
    @GeneratedValue
    private int id;

    @Column(name="primeiroNome")
    private String primeiroNome;

    @Column(name="ultimoNome")
    private String ultimoNome;

    @Column(name="email")
    private String email;

    @Column(name="senha")
    private String senha;

    @Column(name="dataNascimento")
    private String dataDeNascimento;

    @Column(name="genero")
    private String genero;

}
