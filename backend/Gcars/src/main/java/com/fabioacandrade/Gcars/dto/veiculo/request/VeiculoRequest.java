package com.fabioacandrade.Gcars.dto.veiculo.request;

import lombok.Data;

@Data
public class VeiculoRequest {

    private String placa;
    private String modelo;
    private String marca;
    private String cor;
    private String tipo;
    private String proprietarioCPF;
    private int ano;
    private Long admin;
    private boolean estacionado;

}
