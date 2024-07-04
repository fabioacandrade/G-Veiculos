package com.fabioacandrade.Gcars.dto.veiculo.request;

import lombok.Data;

@Data
public class RegisterDto {
    private String nome;
    private String senha;
    private String email;
}
