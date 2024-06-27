package com.fabioacandrade.Gcars.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.jackson.Jacksonized;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
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

    @Column(name = "ano_fabricacao")
    private int ano;

    @Column(name = "hora_entrada")
    private LocalDateTime horaEntrada;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @ManyToOne
    @JoinColumn(name = "proprietario_id")
    private Proprietario proprietario;

}
