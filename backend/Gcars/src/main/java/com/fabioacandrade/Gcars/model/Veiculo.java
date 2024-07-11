package com.fabioacandrade.Gcars.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Jacksonized
@Table(name="veiculo")
public class Veiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="placa", nullable = false)
    private String placa;

    @Column(name = "cor", nullable = false)
    private String cor;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Column(name = "modelo")
    private String modelo;

    @Column(name = "marca")
    private String marca;

    @Column(name = "ano_fabricacao")
    private int ano;

    @Column(name = "hora_entrada")
    private String horaEntrada;

    @Column(name = "estacionado", columnDefinition = "boolean default false", nullable = false)
    private boolean estacionado;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    private Proprietario proprietario;

//    @Override
//    public String toString() {
//        return "Veiculo{" +
//                "id=" + id +
//                ", placa='" + placa + '\'' +
//                ", cor='" + cor + '\'' +
//                ", tipo='" + tipo + '\'' +
//                ", modelo='" + modelo + '\'' +
//                ", marca='" + marca + '\'' +
//                ", ano=" + ano +
//                ", horaEntrada='" + horaEntrada + '\'' +
//                ", estacionado=" + estacionado +
//                '}';
//    }
}
