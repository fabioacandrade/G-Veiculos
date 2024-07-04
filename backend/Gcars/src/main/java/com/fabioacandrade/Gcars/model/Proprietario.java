package com.fabioacandrade.Gcars.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "proprietario")
public class Proprietario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min = 2, max = 50)
    @Column(name = "nome", nullable = false)
    private String nome;

    @Email
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "endereco", nullable = false)
    private String endereco;

    @Column(name = "cidade",nullable = false)
    private String cidade;

    @Column(name = "estado", nullable = false)
    private String estado;

    @Column(name = "CEP", nullable = false)
    private String cep;

    @Column(name = "numero", nullable = false)
    private String numero;

    @CPF
    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @Size(min = 9, max = 14)
    @Column(name = "telefone", nullable = false, unique = true)
    private String telefone;

    @OneToMany(mappedBy = "proprietario", cascade = CascadeType.ALL)
    private List<Veiculo> veiculos = new ArrayList<>();

}
