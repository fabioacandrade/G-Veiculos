package com.fabioacandrade.Gcars.dto.veiculo.request;

import lombok.Data;

@Data
public class VeiculoRequest {

    private String placa;
    private String modelo;
    private String cor;
    private String tipo;
    private int ano;
    private Long proprietario;
    private Long admin;


}
