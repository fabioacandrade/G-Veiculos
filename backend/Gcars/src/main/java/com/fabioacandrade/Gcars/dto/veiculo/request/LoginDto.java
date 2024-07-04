package com.fabioacandrade.Gcars.dto.veiculo.request;

import lombok.Data;

@Data
public class LoginDto {
    private String nome;
    private String senha;
    private String email;
}
