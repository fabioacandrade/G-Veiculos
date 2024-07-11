package com.fabioacandrade.Gcars.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.*;

@Getter
@Setter
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
    @Column(name = "email", nullable = false)//
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
    @Column(name = "cpf", nullable = false)//
    private String cpf;

    @Size(min = 9, max = 14)
    @Column(name = "telefone", nullable = false)//
    private String telefone;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @OneToMany(mappedBy = "proprietario", cascade = CascadeType.ALL, fetch = FetchType.LAZY ,orphanRemoval = true)
    private List<Veiculo> veiculos = new ArrayList<>();

//    @Override
//    public String toString() {
//        return "Proprietario{" +
//                "id=" + id +
//                ", nome='" + nome + '\'' +
//                ", email='" + email + '\'' +
//                ", endereco='" + endereco + '\'' +
//                ", cidade='" + cidade + '\'' +
//                ", estado='" + estado + '\'' +
//                ", cep='" + cep + '\'' +
//                ", numero='" + numero + '\'' +
//                ", cpf='" + cpf + '\'' +
//                ", telefone='" + telefone + '\'' +
//                ", admin=" + admin +
//                ", veiculos=" + veiculos +
//                '}';
//    }
}
